import db from "../db/connect.ts";
import { manager } from "../db/users.schema.ts";
import { insertManagerSchema } from "../db/types.ts";

const ManagerService = {
  get: async (cognitoId: string) => {
    try {
      const manager = db.query.manager.findFirst({
        where: (manager, { eq }) => eq(manager.cognitoId, cognitoId),
      });
      return manager;
    } catch (error: unknown) {
      console.error("Error getting manager: ", (error as Error).message);
      return null;
    }
  },

  create: async (data: any) => {
    try {
      const insertData = insertManagerSchema.omit({ id: true }).parse(data);

      const existingManager = await db.query.manager.findFirst({
        where: (manager, { eq }) => eq(manager.cognitoId, insertData.cognitoId),
      });

      if (existingManager) {
        console.log("Manager already exists, returning existing manager");
        return existingManager;
      }

      const [newManager] = await db
        .insert(manager)
        .values(insertData)
        .returning();

      return newManager;
    } catch (error) {
      console.error("Error creating manager: ", error as Error);
      return null;
    }
  },
};

export default ManagerService;
