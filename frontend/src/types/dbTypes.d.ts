// Auto-generated from backend Drizzle schema
// Generated: 2025-10-27T20:32:48.649Z
// Do not edit manually - changes will be overwritten

import { z } from 'zod';

// ============ Enum Schemas ============
export const highlightSchema = z.enum(["HighSpeedInternetAccess","WasherDryer","AirConditioning","Heating","SmokeFree","CableReady","SatelliteTV","DoubleVanities","TubShower","Intercom","SprinklerSystem","RecentlyRenovated","CloseToTransit","GreatView","QuietNeighborhood"]);
export const amenitySchema = z.enum(["WasherDryer","AirConditioning","Dishwasher","HighSpeedInternet","HardwoodFloors","WalkInClosets","Microwave","Refrigerator","Pool","Gym","Parking","PetsAllowed","WiFi"]);
export const propertyTypeSchema = z.enum(["Apartment","Rooms","Tinyhouse","Townhouse","Villa","Cottage"]);
export const paymentStatusSchema = z.enum(["Pending","Paid","PartiallyPaid","Overdue"]);
export const applicationStatusSchema = z.enum(["Denied","Pending","Approved"]);

// ============ Enum Types ============
export type Highlight = z.infer<typeof highlightSchema>;
export type Amenity = z.infer<typeof amenitySchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

// ============ Entity Schemas ============

// Tenant
export const selectTenantSchema = z.object({
  id: z.number(),
  cognitoId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const insertTenantSchema = selectTenantSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Manager
export const selectManagerSchema = z.object({
  id: z.number(),
  cognitoId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const insertManagerSchema = selectManagerSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Location
export const selectLocationSchema = z.object({
  id: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  coordinates: z.string(),
});

export const insertLocationSchema = selectLocationSchema.omit({ id: true });

// Application
export const selectApplicationSchema = z.object({
  id: z.number(),
  status: applicationStatusSchema,
  applicationDate: z.date(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  message: z.string().nullable(),
  reviewedAt: z.date().nullable(),

  leaseId: z.number().nullable(),
  tenantCognitoId: z.string(),
  propertyId: z.number(), 
});

export const insertApplicationSchema = selectApplicationSchema.omit({ 
  id: true, 
  reviewedAt: true 
});

// Lease
export const selectLeaseSchema = z.object({
    id: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    propertyId: z.number(),
    monthlyRent: z.number(),
    securityDeposit: z.number(),
    
    tenantCognitoId: z.string(),
    propertyId: z.number(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const insertLeaseSchema = selectLeaseSchema.omit({ 
  id: true, 
  createdAt: true,
  updatedAt: true,
});

// Payment
export const selectPaymentSchema = z.object({
  id: z.number(),
  amountDue: z.number(),
  amountPaid: z.number(),
  dueDate: z.date().nullable(),
  paymentDate: z.date().nullable(),
  paymentStatus: paymentStatusSchema,
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),

  leaseId: z.number(),
});

export const insertPaymentSchema = selectPaymentSchema.omit({ 
  id: true, 
  createdAt: true, 
  paidAt: true 
});

// Property
export const selectPropertySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrls: z.array(z.string()),

  beds: z.number(),
  baths: z.number(),
  squareFeet: z.number(),
  pricePerMonth: z.number(),
  securityDeposit: z.number(),
  applicationFee: z.number(),

  isPetAllowed: z.boolean(),
  isParkingIncluded: z.boolean(),
  
  highlights: z.array(highlightSchema),
  amenities: z.array(amenitySchema),
  propertyType: propertyTypeSchema,

  averageRating: z.number(),
  numberOfReviews: z.number(),

  postedDate: z.date().nullable(),
  updatedDate: z.date().nullable(),
  
  locationId: z.number(),
  managerCognitoId: z.string(),
  tenantCognitoId: z.string().nullable(),
});

export const insertPropertySchema = selectPropertySchema.omit({ 
  id: true, 
  postedDate: true, 
  updatedDate: true 
});

// ============ TypeScript Types ============
export type Tenant = z.infer<typeof selectTenantSchema>;
export type TenantInsert = z.infer<typeof insertTenantSchema>;

export type Manager = z.infer<typeof selectManagerSchema>;
export type ManagerInsert = z.infer<typeof insertManagerSchema>;

export type Location = z.infer<typeof selectLocationSchema>;
export type LocationInsert = z.infer<typeof insertLocationSchema>;

export type Application = z.infer<typeof selectApplicationSchema>;
export type ApplicationInsert = z.infer<typeof insertApplicationSchema>;

export type Lease = z.infer<typeof selectLeaseSchema>;
export type LeaseInsert = z.infer<typeof insertLeaseSchema>;

export type Payment = z.infer<typeof selectPaymentSchema>;
export type PaymentInsert = z.infer<typeof insertPaymentSchema>;

export type Property = z.infer<typeof selectPropertySchema>;
export type PropertyInsert = z.infer<typeof insertPropertySchema>;
