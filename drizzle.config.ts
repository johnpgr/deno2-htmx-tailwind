import { defineConfig } from "drizzle-kit"

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: Deno.env.get("DATABASE_URL")!,
    },
    introspect: {
        casing: "camel",
    },
    breakpoints: true,
    strict: true,
    verbose: true,
})
