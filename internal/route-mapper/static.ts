// Source: https://github.com/jollytoad/home/blob/main/scripts/route_mapper/static.ts
import type { DiscoveredPath, DiscoveredRoute, StopRouteMapping } from "@http/discovery/types"

export default function staticRouteMapper({
    parentPath,
    pattern,
}: DiscoveredPath): (DiscoveredRoute | StopRouteMapping)[] {
    // Treat any route under a `_static` dir as static content
    return /[/\\]_static/.test(parentPath)
        ? [
            {
                pattern: pattern.replace(/_static\/.*/, ":path+"),
                module: import.meta.resolve(
                    "../route-handlers/static.ts"
                ),
            },
            {
                stop: true,
            },
        ]
        : []
}

export function staticAssetMapper({
    parentPath,
    pattern,
    module,
    ext,
}: DiscoveredPath): (DiscoveredRoute | StopRouteMapping)[] {
    // Treat any route under a `_static` dir as static content
    return /[/\\]_static/.test(parentPath)
        ? [
            {
                pattern: pattern.replace(/_static\//, "") + ext,
                module,
            },
            {
                stop: true,
            },
        ]
        : []
}
