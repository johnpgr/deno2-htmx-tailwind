import routes from "config/routes.ts"
import { errorHandler } from "config/error.ts"
import { AppDataSource } from "database/datasource.ts"
import { withFallback } from "@http/route/with-fallback"
import { fallbackHandler } from "config/fallback.ts"

if (import.meta.main) {
    await AppDataSource.initialize()
    await Deno.serve(
        { onError: errorHandler() },
        withFallback(routes, fallbackHandler()),
    ).finished
}
