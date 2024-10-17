import routes from "config/routes.ts";
import { errorHandler } from "config/error.ts";

if (import.meta.main) {
    await Deno.serve(
        { onError: errorHandler() },
        routes as (req: Request) => Promise<Response>,
    ).finished;
}
