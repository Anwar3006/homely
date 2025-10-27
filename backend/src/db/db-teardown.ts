import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { Client } from "pg";
import { DATABASE_URL } from "../config/env.ts";

async function teardownDatabase() {
  console.log("Tearing down database...");
  const client = new Client({
    connectionString: DATABASE_URL!,
  });

  try {
    await client.connect();

    // Drop all tables
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public';
    `);
    const tables = tablesResult.rows.map((row) => row.tablename);
    for (const table of tables) {
      if (table !== "spatial_ref_sys") {
        await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        console.log(`Dropped table ${table}.`);
      }
    }

    // Drop all enums
    const enumsResult = await client.query(`
      SELECT t.typname FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      GROUP BY t.typname;
    `);
    const enums = enumsResult.rows.map((row) => row.typname);
    for (const anEnum of enums) {
      await client.query(`DROP TYPE IF EXISTS "${anEnum}";`);
      console.log(`Dropped enum ${anEnum}.`);
    }

    // Drop postgis extension
    await client.query("DROP EXTENSION IF EXISTS postgis;");
    console.log("PostGIS extension dropped.");

    console.log("Database teardown complete.");
  } catch (error) {
    console.error("Error tearing down database:", error);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

teardownDatabase();
