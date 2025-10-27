
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../index.schema.js";
import { sql } from "drizzle-orm";

// Import seed data
import applicationsData from "./seedData/application.json" with { type: "json" };
import leasesData from "./seedData/lease.json" with { type: "json" };
import locationsData from "./seedData/location.json" with { type: "json" };
import managersData from "./seedData/manager.json" with { type: "json" };
import paymentsData from "./seedData/payment.json" with { type: "json" };
import propertiesData from "./seedData/property.json" with { type: "json" };
import tenantsData from "./seedData/tenant.json" with { type: "json" };

async function seedDatabase() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
  });
  await client.connect();
  const db = drizzle(client, { schema });

  try {
    // Truncate tables in reverse order of dependencies
    console.log("Truncating tables...");
    await db.delete(schema.likedProperty);
    await db.delete(schema.leasedProperty);
    await db.delete(schema.payment);
    await db.delete(schema.application);
    await db.delete(schema.lease);
    await db.delete(schema.property);
    await db.delete(schema.tenant);
    await db.delete(schema.manager);
    await db.delete(schema.location);
    console.log("Tables truncated.");

    // Insert data in order of dependencies
    console.log("Inserting locations...");
    const locationValues = locationsData.map(l => {
        const match = l.coordinates.match(/POINT\((.*)\)/);
      if (!match) throw new Error(`Invalid coordinates format: ${l.coordinates}`);
        const [longitude, latitude] = match.map(Number);
        return { ...l, coordinates: sql`ST_SetSRID(ST_Point(${longitude}, ${latitude}), 4326)` };
    });
    await db.insert(schema.location).values(locationValues);

    console.log("Inserting managers...");
    await db.insert(schema.manager).values(managersData);

    console.log("Inserting tenants...");
    const tenantsToInsert = tenantsData.map(({ likedProperty, leasedProperties, ...tenant }) => tenant);
    await db.insert(schema.tenant).values(tenantsToInsert);

    console.log("Inserting properties...");
    const propertiesToInsert = propertiesData.map(p => ({
      ...p,
      imageUrls: JSON.stringify(p.imageUrls),
      postedDate: new Date(p.postedDate),
      averageRating: Math.round(p.averageRating),
    }));
    await db.insert(schema.property).values(propertiesToInsert);

    console.log("Inserting leases...");
    const leasesToInsert = leasesData.map(l => ({
        ...l,
        startDate: new Date(l.startDate),
        endDate: new Date(l.endDate),
    }));
    await db.insert(schema.lease).values(leasesToInsert);

    console.log("Inserting applications...");
    const applicationsToInsert = applicationsData.map(a => ({
        ...a,
        applicationDate: new Date(a.applicationDate),
    }));
    await db.insert(schema.application).values(applicationsToInsert);

    console.log("Inserting payments...");
    const paymentsToInsert = paymentsData.map(p => ({
        ...p,
        leaseId: p.lease,
        dueDate: new Date(p.dueDate),
        paymentDate: new Date(p.paymentDate),
    }));
    // remove the lease property from the object
    paymentsToInsert.forEach(p => delete p.lease);
    await db.insert(schema.payment).values(paymentsToInsert);

    console.log("Inserting liked properties...");
    const likedProperties = [];
    for (const tenantData of tenantsData) {
      if (tenantData.likedProperty) {
        for (const propertyId of tenantData.likedProperty) {
          likedProperties.push({
            tenantCognitoId: tenantData.cognitoId,
            propertyId: propertyId,
          });
        }
      }
    }
    if (likedProperties.length > 0) {
        await db.insert(schema.likedProperty).values(likedProperties);
    }


    console.log("Inserting leased properties...");
    const leasedProperties = [];
    for (const tenantData of tenantsData) {
      if (tenantData.leasedProperties) {
        for (const propertyId of tenantData.leasedProperties) {
          leasedProperties.push({
            tenantCognitoId: tenantData.cognitoId,
            propertyId: propertyId,
          });
        }
      }
    }
    if(leasedProperties.length > 0) {
        await db.insert(schema.leasedProperty).values(leasedProperties);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
     await client.end();
     console.log("Database connection closed.");
  }
}

seedDatabase();




