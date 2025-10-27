import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const { VERSION, PORT, NODE_ENV, DATABASE_URL } = process.env;
