import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { property } from "./property.schema.js";
import {
  application,
  lease,
  leasedProperty,
  likedProperty,
} from "./dependents.schema.js";

/* TENANT */
export const tenant = pgTable("tenant", {
  id: serial("id").primaryKey(),
  cognitoId: varchar("cognitoId").unique().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phoneNumber").notNull(),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("createdAt").defaultNow(),
});
export const tenantRelation = relations(tenant, ({ one, many }) => ({
  leasedProperties: many(leasedProperty),

  applications: many(application),

  lease: many(lease),

  likedProperty: many(likedProperty),
}));

/* MANAGER */
export const manager = pgTable("manager", {
  id: serial("id").primaryKey(),
  cognitoId: varchar("cognitoId").unique().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phoneNumber").notNull(),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("createdAt").defaultNow(),
});
export const managerRelation = relations(manager, ({ many }) => ({
  property: many(property),
}));
