import { Pool, PoolClient } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import * as schema from "./schemas";

export const InitializeDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  });

  let client: PoolClient | undefined;

  try {
    client = await pool.connect();
    const db = drizzle(pool, { schema });

    await migrate(db, { migrationsFolder: "./data/migrations" });

    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  } finally {
    if (client) client.release();
  }
};
