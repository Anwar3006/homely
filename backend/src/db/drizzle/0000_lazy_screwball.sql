CREATE TYPE "public"."amenities" AS ENUM('WasherDryer', 'AirConditioning', 'Dishwasher', 'HighSpeedInternet', 'HardwoodFloors', 'WalkInClosets', 'Microwave', 'Refrigerator', 'Pool', 'Gym', 'Parking', 'PetsAllowed', 'WiFi');--> statement-breakpoint
CREATE TYPE "public"."applicationStatus" AS ENUM('Denied', 'Pending', 'Approved');--> statement-breakpoint
CREATE TYPE "public"."highlights" AS ENUM('HighSpeedInternetAccess', 'WasherDryer', 'AirConditioning', 'Heating', 'SmokeFree', 'CableReady', 'SatelliteTV', 'DoubleVanities', 'TubShower', 'Intercom', 'SprinklerSystem', 'RecentlyRenovated', 'CloseToTransit', 'GreatView', 'QuietNeighborhood');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('Pending', 'Paid', 'PartiallyPaid', 'Overdue');--> statement-breakpoint
CREATE TYPE "public"."propertyTypes" AS ENUM('Apartment', 'Rooms', 'Tinyhouse', 'Townhouse', 'Villa', 'Cottage');--> statement-breakpoint
CREATE TABLE "application" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "applicationStatus" DEFAULT 'Pending',
	"applicationDate" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"message" text,
	"reviewed_at" timestamp,
	"lease_id" integer,
	"tenant_cognito_id" varchar NOT NULL,
	"property_id" integer NOT NULL,
	CONSTRAINT "application_lease_id_unique" UNIQUE("lease_id")
);
--> statement-breakpoint
CREATE TABLE "lease" (
	"id" serial PRIMARY KEY NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"rent" integer NOT NULL,
	"deposit" integer NOT NULL,
	"tenant_cognito_id" varchar NOT NULL,
	"property_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leased_property" (
	"property_id" integer NOT NULL,
	"tenant_cognito_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "liked_property" (
	"property_id" integer NOT NULL,
	"tenant_cognito_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"postal_code" varchar NOT NULL,
	"coordinates" geometry(point) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "manager" (
	"id" serial PRIMARY KEY NOT NULL,
	"cognitoId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "manager_cognitoId_unique" UNIQUE("cognitoId")
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount_due" integer NOT NULL,
	"amount_paid" integer NOT NULL,
	"due_date" timestamp NOT NULL,
	"payment_date" timestamp NOT NULL,
	"payment_status" "paymentStatus" DEFAULT 'Pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"lease_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text NOT NULL,
	"image_urls" text,
	"beds" integer NOT NULL,
	"baths" integer NOT NULL,
	"square_feet" integer NOT NULL,
	"price_per_month" integer NOT NULL,
	"security_deposit" integer NOT NULL,
	"application_fee" integer NOT NULL,
	"is_pets_allowed" boolean DEFAULT false,
	"is_parking_included" boolean DEFAULT false,
	"highlights" "highlights"[] NOT NULL,
	"amenities" "amenities"[] NOT NULL,
	"property_type" "propertyTypes" NOT NULL,
	"average_rating" integer DEFAULT 0,
	"number_of_reviews" integer DEFAULT 0,
	"posted_date" timestamp DEFAULT now(),
	"updated_date" timestamp DEFAULT now(),
	"location_id" integer,
	"manager_cognito_id" varchar,
	"tenant_cognito_id" varchar
);
--> statement-breakpoint
CREATE TABLE "tenant" (
	"id" serial PRIMARY KEY NOT NULL,
	"cognitoId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "tenant_cognitoId_unique" UNIQUE("cognitoId")
);
--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_lease_id_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."lease"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lease" ADD CONSTRAINT "lease_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lease" ADD CONSTRAINT "lease_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leased_property" ADD CONSTRAINT "leased_property_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leased_property" ADD CONSTRAINT "leased_property_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "liked_property" ADD CONSTRAINT "liked_property_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "liked_property" ADD CONSTRAINT "liked_property_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_lease_id_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."lease"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_manager_cognito_id_manager_cognitoId_fk" FOREIGN KEY ("manager_cognito_id") REFERENCES "public"."manager"("cognitoId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;