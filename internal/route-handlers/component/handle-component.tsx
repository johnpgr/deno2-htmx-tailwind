import { handlePage } from "internal/route-handlers/component/handle-page.ts"; 
import type { ComponentType, RouteProps } from "./types.ts"

export function handleComponent(
    Component: ComponentType<RouteProps>,
    // I don't see use for this parameter
    _module?: string | URL,
) {

    return handlePage((props: RouteProps) => 
        <Component {...props} />
    );
}
