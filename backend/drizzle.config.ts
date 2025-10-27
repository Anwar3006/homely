import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { DATABASE_URL } from "./src/config/env.ts";

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/index.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
});
