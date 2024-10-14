import { withFallback } from "@http/route/with-fallback"
import routes from "config/routes.ts"
import { generateRoutes } from "internal/generate-routes.ts"

if (import.meta.main) {
    await generateRoutes()
    await Deno.serve(withFallback(routes)).finished
}
