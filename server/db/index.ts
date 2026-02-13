
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

// Disable prefetch/prepare for Transaction Pooler
// SSL rejection disabled to avoid self-signed cert errors
const client = postgres(connectionString, {
    prepare: false,
    ssl: { rejectUnauthorized: false }
});

export const db = drizzle(client, { schema });
export const poolConnection = client;
