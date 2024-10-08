import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);

export * from "./schema";
export * from "drizzle-orm";
