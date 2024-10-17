import { renderBody } from "@http/jsx-stream/serialize";

export function errorHandler(): (err: unknown) => Promise<Response> {
    const defaultError = new Response("Internal Server Error", { status: 500 });

    return async (err) => {
        try {
            return new Response(
                renderBody(
                    (await import("../app/routes/_500.tsx")).default(err),
                ),
                {
                    status: 500,
                },
            );
        } catch (_error) {
            return defaultError;
        }
    };
}
