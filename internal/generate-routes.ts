import { generateRoutesModule } from "@http/generate/generate-routes-module"
import { dprintFormatModule } from "@http/generate/dprint-format-module"
import { discoverRoutes } from "@http/discovery/discover-routes"
import freshPathMapper from "internal/path-mapper.ts"

async function generateRoutes() {
    await generateRoutesModule({
        pattern: "/",
        fileRootUrl: import.meta.resolve("../app/routes"),
        moduleOutUrl: import.meta.resolve("../config/routes.ts"),
        pathMapper: import.meta.resolve("./path-mapper.ts"),
        routeMapper: [
            import.meta.resolve("./route-mapper/ignore.ts"),
            import.meta.resolve("./route-mapper/static.ts"),
            "@http/discovery/ts-route-mapper",
        ],
        handlerGenerator: [
            import("@http/generate/methods-handler-generator"),
            import(
                "internal/handler-generator/default-fn-handler-generator.ts"
            ),
        ],
        formatModule: dprintFormatModule(),
        verbose: true,
    })
}

async function generateRouteTypes() {
    type DiscoveredRoute = { href: string; methods: string[] }

    const routes = await discoverRoutes({
        pathMapper: freshPathMapper,
        fileRootUrl: import.meta.resolve("../app/routes"),
        pattern: "/",
    })

    const routesForMethod = (routes: DiscoveredRoute[], method: string) => {
        const parsed = routes
            .filter(
                (route) =>
                    route.methods.includes(method) ||
                    route.methods.includes("ALL"),
            )
            .map((route) => `"${route.href}"`)
            .join(" | ")

        if (parsed.trim() === "") {
            return "never"
        }

        return parsed
    }

    const template = (routes: DiscoveredRoute[]) =>
        `
type PostRoutes = ${routesForMethod(routes, "POST")}
type GetRoutes = ${routesForMethod(routes, "GET")}
type PutRoutes = ${routesForMethod(routes, "PUT")}
type DeleteRoutes = ${routesForMethod(routes, "DELETE")}
type PatchRoutes = ${routesForMethod(routes, "PATCH")}

declare namespace JSX {
    interface HtmlTag extends Htmx.Attributes {
        ["hx-get"]?: GetRoutes;
        ["hx-post"]?: PostRoutes;
        ["hx-put"]?: PutRoutes;
        ["hx-delete"]?: DeleteRoutes;
        ["hx-patch"]?: PatchRoutes;
    }
    
    interface HtmlAnchorTag extends HtmlTag {
        href?: GetRoutes | (string & {});
    }
}
`.trim()

    const discoredRoutes: DiscoveredRoute[] = []

    for (const route of routes) {
        if ((route.pattern as URLPattern).pathname.startsWith("/_")) continue
        if ((route.pattern as URLPattern).pathname.startsWith("/:")) continue

        //@ts-ignore: dynamic import
        const routeModule = await import(route.module)
        const href = (route.pattern as URLPattern).pathname
        const methods: string[] = Object.keys(routeModule).map((method) => {
            if (method === "default") {
                const isJsx = routeModule.default.toString().includes("_jsx")
                if (isJsx) {
                    return "GET"
                }
                return "ALL"
            }
            return method
        })
        if (methods.length < 1) {
            continue
        }
        discoredRoutes.push({ href, methods })
    }

    const path = import.meta.resolve("../internal/types/generated-routes.d.ts")
    await Deno.writeTextFile(new URL(path), template(discoredRoutes))
}

if (import.meta.main) {
    await generateRoutes()
    await generateRouteTypes()
}
