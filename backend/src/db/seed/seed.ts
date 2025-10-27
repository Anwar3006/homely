import fs from "fs";
import path from "path";
import db from "../connect.ts";
import { sql, type InferInsertModel } from "drizzle-orm";
// Assuming the schema import contains all necessary Drizzle table definitions
import * as schema from "../index.schema.ts";

// --- Utility Functions (Small helpers, not insertion logic) ---

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// --- Main Seeding Function ---

async function main() {
  console.log("--- Starting Drizzle Seeder ---");
  const dataDirectory = path.join(
    process.cwd(),
    "src",
    "db",
    "seed",
    "seedData"
  );

  // Order of seeding matters due to foreign key constraints and data dependencies
  const orderedFileNames = [
    "location.json", // No dependencies
    "manager.json", // No dependencies
    "property.json", // Depends on location and manager
    "tenant.json", // Handles tenant and tenantFavorites
    "lease.json", // Depends on property and tenant
    "application.json", // Depends on property and tenant
    "payment.json", // Depends on lease
  ];

  // 1. DATA DELETION (Reverse Order)
  const tablesToDelete = orderedFileNames
    .map((fileName) =>
      toPascalCase(path.basename(fileName, path.extname(fileName)))
    )
    .reverse();

  console.log("\n[1] Starting data deletion...");
  for (const modelName of tablesToDelete) {
    const quotedModelName = `"${modelName}"`;
    try {
      // NOTE: Junction tables like TenantFavorites must be deleted before their parent tables
      await db.execute(sql`DELETE FROM ${sql.raw(quotedModelName)}`);
      console.log(`\t✅ Deleted all data from table: ${quotedModelName}`);
    } catch (error) {
      console.error(`\t❌ Error deleting data from ${quotedModelName}:`, error);
    }
  }

  // 2. DATA INSERTION AND TRANSFORMATION
  console.log("\n[2] Starting data insertion and transformation...");
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    let jsonData: any[] = [];

    try {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) {
      console.error(
        `\n❌ Failed to read or parse file ${fileName}. Skipping.`,
        e
      );
      continue;
    }

    const modelName = toPascalCase(
      path.basename(fileName, path.extname(fileName))
    );
    const modelNameCamel = toCamelCase(modelName);

    console.log(`\nProcessing ${modelName} (${jsonData.length} records)...`);

    // --- Complex Insertion Logic ---

    if (modelName === "Location") {
      // Special handling for PostGIS: use raw SQL for ST_GeomFromText
      for (const location of jsonData) {
        const { id, country, city, state, address, postalCode, coordinates } =
          location;
        try {
          await db.execute(sql`
            INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates") 
            VALUES (${id}, ${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326));
          `);
        } catch (error) {
          console.error(`\t❌ Error inserting location for ${city}:`, error);
        }
      }
      console.log(`\t✅ Successfully seeded Location.`);
    } else if (modelName === "Tenant") {
      const tenantTable = schema.tenant;
      const favoritesTable = schema.likedProperty;
      const tenantInserts: InferInsertModel<typeof tenantTable>[] = [];
      const favoriteInserts: InferInsertModel<typeof favoritesTable>[] = [];

      for (const tenant of jsonData) {
        // 1. Prepare data for the main Tenant table
        const { properties, favorites, ...tenantData } = tenant;
        tenantInserts.push(tenantData);

        // 2. Prepare data for the TenantFavorites junction table
        const tenantId = tenant.id;
        const favoriteProperties = favorites?.connect || [];

        for (const { id: propertyId } of favoriteProperties) {
          favoriteInserts.push({
            tenantCognitoId: tenantId,
            propertyId: propertyId,
          });
        }
      }

      // Insert Tenants
      if (tenantInserts.length > 0) {
        await db.insert(tenantTable).values(tenantInserts);
        console.log(`\t✅ Seeded Tenant with ${tenantInserts.length} records.`);
      }

      // Insert Tenant Favorites (Junction Table)
      if (favoriteInserts.length > 0) {
        await db.insert(favoritesTable).values(favoriteInserts);
        console.log(
          `\t✅ Seeded TenantFavorites junction table with ${favoriteInserts.length} records.`
        );
      }
    } else if (modelName === "Payment") {
      const table = schema.payment;

      // Transform Prisma 'connect' to simple 'leaseId' foreign key
      const transformedPayments = jsonData.map((p) => ({
        ...p,
        leaseId: p.lease.connect.id,
      }));

      // Strip the old 'lease' object before inserting
      const cleanPayments: InferInsertModel<typeof table>[] =
        transformedPayments.map(({ lease, ...rest }) => rest);

      if (cleanPayments.length > 0) {
        await db.insert(table).values(cleanPayments);
        console.log(
          `\t✅ Seeded Payment with ${cleanPayments.length} records.`
        );
      }
    } else {
      // --- Simple Insertion Logic (Manager, Property, Lease, Application) ---
      const table = (schema as any)[modelNameCamel];

      if (!table) {
        console.error(`\t❌ Table ${modelName} not found in schema. Skipping.`);
        continue;
      }

      if (jsonData.length > 0) {
        // Batch insert for simple models
        await db.insert(table).values(jsonData);
        console.log(
          `\t✅ Seeded ${modelName} with ${jsonData.length} records.`
        );
      }
    }

    // 3. SEQUENCE RESET
    const quotedModelName = `"${modelName}"`;
    try {
      // Find the max ID inserted
      const maxIdResult = await db.execute(sql`
        SELECT MAX(id) as max_id FROM ${sql.raw(quotedModelName)};
      `);

      const maxId = maxIdResult.rows?.[0]?.max_id || 0;

      // Set the sequence to the maximum inserted ID + 1 (false means it will return the next value)
      await db.execute(sql`
        SELECT setval(pg_get_serial_sequence(${quotedModelName}, 'id'), ${maxId} + 1, false);
      `);
    } catch (error) {
      // Sequence reset is optional; log and continue if it fails (e.g., if the table doesn't have an 'id' sequence)
      console.error(
        `\t⚠️ Error resetting sequence for ${quotedModelName}:`,
        error
      );
    }

    await sleep(200); // Small pause for stability
  }

  console.log("\n--- Drizzle Seeding Complete! ---");
}

main().catch((e) => {
  console.error("\nFATAL ERROR DURING SEEDING:", e);
  process.exit(1);
});
