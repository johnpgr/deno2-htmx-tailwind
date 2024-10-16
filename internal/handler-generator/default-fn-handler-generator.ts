import {
    asFn,
    importDefault,
    importNamed,
    importResolve,
    staticImport,
} from "@http/generate/code-builder";
import type { RouteModule } from "@http/discovery/types";
import type { Code, GeneratorOptions } from "@http/generate/types";

export const handlerMapper = "@http/discovery/default-handler-mapper";

function hasDefaultFn(
    loaded: Record<string, unknown>,
): loaded is { default: Function } {
    return "default" in loaded && typeof loaded.default === "function";
}

/**
 * Generate the code to for route modules that provide a request handler
 * as the default export.
 */
export function generate(
    { module, loaded }: RouteModule,
    {}: GeneratorOptions,
    i: number,
): Code | undefined {
    if (hasDefaultFn(loaded)) {
        // This is a ugly way to check if the function is a JSX function
        // but for now, it works, maybe we can find a better way to do this
        const isJsx = loaded.default.toString().includes("_jsx");
        if (isJsx) {
            const handleComponent = asFn(
                staticImport(
                    importNamed(
                        "internal/route-handlers/component/handle-component.tsx",
                        "handleComponent",
                    ),
                ),
            );

            const modulePath = importResolve(module);
            const componentModule = importNamed(
                module,
                "default",
                `route_component_${i}`,
            );

            return handleComponent(componentModule, modulePath);
        } else {
            return importDefault(module, `route_${i}`);
        }
    }
}
