import type { DiscoveredPath, StopRouteMapping } from "@http/discovery/types"

function isErrorCodeRoute(name: string): boolean {
    return name === "_404"
}

export default function ignoredRouteMapper({
    parentPath,
    name,
}: DiscoveredPath): StopRouteMapping[] {
    // Skip any route that has a path segment that starts with an underscore
    return (name.startsWith("_") && !isErrorCodeRoute(name)) ||
            /(^|[/\\])_/.test(parentPath)
        ? [{ stop: true }]
        : []
}
