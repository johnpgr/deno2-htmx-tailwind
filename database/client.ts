import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

export const db = drizzle(
    postgres(Deno.env.get("DATABASE_URL")!, { max: 12 }),
    {
        schema,
        logger: true,
    },
);
