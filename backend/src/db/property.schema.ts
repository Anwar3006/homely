import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  amenitiesEnum,
  highlightEnum,
  propertyTypesEnum,
} from "./enums.schema.js";
import {
  application,
  lease,
  likedProperty,
  location,
} from "./dependents.schema.js";
import { manager, tenant } from "./users.schema.js";
import { relations } from "drizzle-orm";

export const property = pgTable("property", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  imageUrls: text("image_urls"),

  beds: integer("beds").notNull(),
  baths: integer("baths").notNull(),
  squareFeet: integer("square_feet").notNull(),
  pricePerMonth: integer("price_per_month").notNull(),
  securityDeposit: integer("security_deposit").notNull(),
  applicationFee: integer("application_fee").notNull(),

  isPetsAllowed: boolean("is_pets_allowed").default(false),
  isParkingIncluded: boolean("is_parking_included").default(false),

  highlights: highlightEnum("highlights").array().notNull(),
  amenities: amenitiesEnum("amenities").array().notNull(),
  propertyType: propertyTypesEnum("property_type").notNull(),

  averageRating: integer("average_rating").default(0),
  numberOfReviews: integer("number_of_reviews").default(0),

  postedDate: timestamp("posted_date").defaultNow(),
  updatedDate: timestamp("updated_date").defaultNow(),

  locationId: integer("location_id").references(() => location.id),
  managerCognitoId: varchar("manager_cognito_id").references(
    () => manager.cognitoId
  ),
  tenantCognitoId: varchar("tenant_cognito_id").references(
    () => tenant.cognitoId
  ),
});

export const propertyRelation = relations(property, ({ one, many }) => ({
  manager: one(manager, {
    fields: [property.managerCognitoId],
    references: [manager.id],
  }),
  location: one(location, {
    fields: [property.locationId],
    references: [location.id],
  }),
  application: many(application),
  tenant: one(tenant, {
    fields: [property.tenantCognitoId],
    references: [tenant.cognitoId],
  }),
  lease: one(lease, {
    fields: [property.id],
    references: [lease.propertyId],
  }),
  favoritedBy: many(likedProperty),
}));
