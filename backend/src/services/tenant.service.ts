import db from "../db/connect.ts";
import { tenant } from "../db/users.schema.ts";
import { insertTenantSchema } from "../db/types.ts";

const TenantService = {
  get: async (cognitoId: string) => {
    try {
      const tenant = db.query.tenant.findFirst({
        where: (tenant, { eq }) => eq(tenant.cognitoId, cognitoId),
        with: {
          leasedProperties: true,
        },
      });
      return tenant;
    } catch (error: unknown) {
      console.error("Error getting tenant: ", (error as Error).message);
      return null;
    }
  },

  create: async (data: any) => {
    try {
      const insertData = insertTenantSchema.omit({ id: true }).parse(data);

      const existingTenant = await db.query.tenant.findFirst({
        where: (tenant, { eq }) => eq(tenant.cognitoId, insertData.cognitoId),
      });

      if (existingTenant) {
        console.log("Tenant already exists, returning existing tenant");
        return existingTenant;
      }

      const [newTenant] = await db
        .insert(tenant)
        .values(insertData)
        .returning();

      return newTenant;
    } catch (error) {
      console.error("Error creating tenant: ", error as Error);
      return null;
    }
  },
};

export default TenantService;
