CREATE TABLE "leased_property" (
	"property_id" integer NOT NULL,
	"tenant_cognito_id" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leased_property" ADD CONSTRAINT "leased_property_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leased_property" ADD CONSTRAINT "leased_property_tenant_cognito_id_tenant_cognitoId_fk" FOREIGN KEY ("tenant_cognito_id") REFERENCES "public"."tenant"("cognitoId") ON DELETE no action ON UPDATE no action;