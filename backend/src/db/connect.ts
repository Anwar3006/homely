import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./index.schema.js";

const db = drizzle(process.env.DATABASE_URL!, { schema: schema });

export default db;
