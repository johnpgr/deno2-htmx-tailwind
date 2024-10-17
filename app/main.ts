import routes from "config/routes.ts"
import { errorHandler } from "config/error.ts"
import { AppDataSource } from "database/datasource.ts"

if (import.meta.main) {
    await AppDataSource.initialize()
    await Deno.serve(
        { onError: errorHandler() },
        routes as (req: Request) => Promise<Response>,
    ).finished
}
