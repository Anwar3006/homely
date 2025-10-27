import { pgEnum } from "drizzle-orm/pg-core";

/* Highlights Enum */
export const Highlights = [
  "HighSpeedInternetAccess",
  "WasherDryer",
  "AirConditioning",
  "Heating",
  "SmokeFree",
  "CableReady",
  "SatelliteTV",
  "DoubleVanities",
  "TubShower",
  "Intercom",
  "SprinklerSystem",
  "RecentlyRenovated",
  "CloseToTransit",
  "GreatView",
  "QuietNeighborhood",
] as const;
export const highlightEnum = pgEnum("highlights", Highlights);

/* Amenity Enum */
export const Amenities = [
  "WasherDryer",
  "AirConditioning",
  "Dishwasher",
  "HighSpeedInternet",
  "HardwoodFloors",
  "WalkInClosets",
  "Microwave",
  "Refrigerator",
  "Pool",
  "Gym",
  "Parking",
  "PetsAllowed",
  "WiFi",
] as const;
export const amenitiesEnum = pgEnum("amenities", Amenities);

/* PropertyTypes Enum*/
export const PropertyTypes = [
  "Apartment",
  "Rooms",
  "Tinyhouse",
  "Townhouse",
  "Villa",
  "Cottage",
] as const;
export const propertyTypesEnum = pgEnum("propertyTypes", PropertyTypes);

/* PropertyStatus Enum*/
export const ApplicationStatus = ["Denied", "Pending", "Approved"] as const;
export const applicationStatusEnum = pgEnum(
  "applicationStatus",
  ApplicationStatus
);

/* PaymentStatus Enum*/
export const PaymentStatus = [
  "Pending",
  "Paid",
  "PartiallyPaid",
  "Overdue",
] as const;
export const paymentStatusEnum = pgEnum("paymentStatus", PaymentStatus);
