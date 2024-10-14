// Source: https://github.com/jollytoad/home/blob/main/scripts/route_mapper/browser.ts
import type { DiscoveredPath, DiscoveredRoute, StopRouteMapping } from "@http/discovery/types"

export default function browserRouteMapper({
    parentPath,
    pattern,
    ext,
}: DiscoveredPath): (DiscoveredRoute | StopRouteMapping)[] {
    // Treat any route under a `browser` dir as scripts deliverable to the browser
    // which should be transpiled to js with broad compatibility and any necessary shims
    return ext === ".ts" && /[/\\]browser/.test(parentPath)
        ? [
            {
                pattern: `${
                    pattern.replace(
                        /^(.*\/)browser\/(.+)$/,
                        ":pre($1):path+",
                    )
                }.js`,
                module: import.meta.resolve(
                    "../route-handlers/browser.ts",
                ),
            },
            {
                stop: true,
            },
        ]
        : []
}

export function browserAssetMapper({
    parentPath,
    pattern,
    ext,
    module,
}: DiscoveredPath): (DiscoveredRoute & { cache: boolean })[] {
    return ext === ".ts" && /[/\\]browser/.test(parentPath)
        ? [
            {
                pattern: `${pattern.replace(/browser\//, "")}.js`,
                module,
                cache: true,
            },
        ]
        : []
}
