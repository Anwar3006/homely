import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  geometry,
} from "drizzle-orm/pg-core";
import { applicationStatusEnum, paymentStatusEnum } from "./enums.schema.js";
import { tenant } from "./users.schema.js";
import { relations } from "drizzle-orm";
import { property } from "./property.schema.js";

export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  postalCode: varchar("postal_code").notNull(),

  coordinates: geometry("coordinates", {
    type: "point",
    mode: "xy",
    srid: 4326,
  }).notNull(),
});
export const locationRelation = relations(location, ({ one }) => ({
  property: one(property, {
    fields: [location.id],
    references: [property.locationId],
  }),
}));
////////////////////////////// Application Table /////////
export const application = pgTable("application", {
  id: serial("id").primaryKey(),
  status: applicationStatusEnum("status").default("Pending"),
  applicationDate: timestamp("applicationDate").defaultNow(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  message: text("message"),
  reviewedAt: timestamp("reviewed_at"),

  leaseId: integer("lease_id")
    .references(() => lease.id)
    .unique(),
  tenantCognitoId: varchar("tenant_cognito_id")
    .references(() => tenant.cognitoId)
    .notNull(),
  propertyId: integer("property_id")
    .references(() => property.id)
    .notNull(),
});
export const applicationRelation = relations(application, ({ one }) => ({
  tenant: one(tenant, {
    fields: [application.tenantCognitoId],
    references: [tenant.cognitoId],
  }),

  property: one(property, {
    fields: [application.propertyId],
    references: [property.id],
  }),

  lease: one(lease, {
    fields: [application.leaseId],
    references: [lease.id],
  }),
}));
///////////////////////////////////////////////////

//////////////////////// Lease Table /////////////
export const lease = pgTable("lease", {
  id: serial("id").primaryKey(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  monthlyRent: integer("rent").notNull(),
  securityDeposit: integer("deposit").notNull(),

  tenantCognitoId: varchar("tenant_cognito_id")
    .references(() => tenant.cognitoId)
    .notNull(),
  propertyId: integer("property_id")
    .references(() => property.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const leaseRelation = relations(lease, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [lease.tenantCognitoId],
    references: [tenant.cognitoId],
  }),

  property: one(property, {
    fields: [lease.propertyId],
    references: [property.id],
  }),

  payments: many(payment),
}));
/////////////////////////////////////////////////

/////////////////////////// Payment Table //////////////
export const payment = pgTable("payment", {
  id: serial("id").primaryKey(),
  amountDue: integer("amount_due").notNull(),
  amountPaid: integer("amount_paid").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paymentDate: timestamp("payment_date").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  leaseId: integer("lease_id")
    .references(() => lease.id)
    .notNull(),
});
export const paymentRelation = relations(payment, ({ one }) => ({
  lease: one(lease, {
    fields: [payment.leaseId],
    references: [lease.id],
  }),
}));
//////////////////////////////////////////////////////

/////////////////////////// Property-Tenants Liked Table //////////////
export const likedProperty = pgTable("liked_property", {
  propertyId: integer("property_id")
    .references(() => property.id)
    .notNull(),
  tenantCognitoId: varchar("tenant_cognito_id")
    .references(() => tenant.cognitoId)
    .notNull(),
});
export const likedPropertyRelation = relations(likedProperty, ({ one }) => ({
  property: one(property, {
    fields: [likedProperty.propertyId],
    references: [property.id],
  }),
  tenant: one(tenant, {
    fields: [likedProperty.tenantCognitoId],
    references: [tenant.cognitoId],
  }),
}));
//////////////////////////////////////////////////////

/////////////////////////// Properties leased by Tenants  Table //////////////
export const leasedProperty = pgTable("leased_property", {
  propertyId: integer("property_id")
    .references(() => property.id)
    .notNull(),
  tenantCognitoId: varchar("tenant_cognito_id")
    .references(() => tenant.cognitoId)
    .notNull(),
});
export const leasedPropertyRelation = relations(leasedProperty, ({ one }) => ({
  property: one(property, {
    fields: [leasedProperty.propertyId],
    references: [property.id],
  }),
  tenant: one(tenant, {
    fields: [leasedProperty.tenantCognitoId],
    references: [tenant.cognitoId],
  }),
}));
