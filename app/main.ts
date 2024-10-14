import { withFallback } from "@http/route/with-fallback"
import routes from "config/routes.ts"

if (import.meta.main) {
    await Deno.serve(withFallback(routes)).finished
}
