import { generateRoutesModule } from "@http/generate/generate-routes-module"
import { dprintFormatModule } from "@http/generate/dprint-format-module"

export async function generateRoutes() {
    await generateRoutesModule({
        pattern: "/",
        fileRootUrl: import.meta.resolve("../app/routes"),
        moduleOutUrl: import.meta.resolve("../config/routes.ts"),
        pathMapper: "@http/discovery/fresh-path-mapper",
        routeMapper: [
            "@http/discovery/ts-route-mapper",
            import.meta.resolve("./route-mapper/static.ts"),
        ],
        formatModule: dprintFormatModule(),
        verbose: true,
    })
}

if (import.meta.main) {
    await generateRoutes()
}
