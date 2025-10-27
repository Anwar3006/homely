import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { tenant, manager } from "./users.schema.js";
import { application, lease, location, payment } from "./dependents.schema.js";
import { property } from "./property.schema.js";
import {
  Amenities,
  ApplicationStatus,
  Highlights,
  PaymentStatus,
  PropertyTypes,
} from "./enums.schema.ts";

// Generate Zod schemas
export const selectTenantSchema = createSelectSchema(tenant);
export const insertTenantSchema = createInsertSchema(tenant);

export const selectManagerSchema = createSelectSchema(manager);
export const insertManagerSchema = createInsertSchema(manager);

export const selectLocationSchema = createSelectSchema(location);
export const insertLocationSchema = createInsertSchema(location);

export const selectApplicationSchema = createSelectSchema(application);
export const insertApplicationSchema = createInsertSchema(application);

export const selectLeaseSchema = createSelectSchema(lease);
export const insertLeaseSchema = createInsertSchema(lease);

export const selectPaymentSchema = createSelectSchema(payment);
export const insertPaymentSchema = createInsertSchema(payment);

export const selectPropertySchema = createSelectSchema(property);
export const insertPropertySchema = createInsertSchema(property);

// Enum schemas (define your enums)
export const highlightSchema = z.enum(Highlights);
export const amenitySchema = z.enum(Amenities);
export const propertyTypeSchema = z.enum(PropertyTypes);
export const paymentStatusSchema = z.enum(PaymentStatus);
export const applicationStatusSchema = z.enum(ApplicationStatus);
