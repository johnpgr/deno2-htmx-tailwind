import { byMediaType } from "@http/route/by-media-type";

export const GET = byMediaType({
    "text/event-stream": (_req: Request) => {
        if(Deno.env.get("DENO_ENV") !== "development") {
            return new Response("Not Found", { status: 404, statusText: "Not Found" });
        }

        const body = ReadableStream.from(streamEvents()).pipeThrough(
            new TextEncoderStream(),
        );

        return new Response(body, {
            headers: {
                "Content-Type": "text/event-stream",
            },
        });
    },
});

const delay = (ms: number, { persistent = true } = {}) =>
    new Promise((resolve) => setTimeout(resolve, ms, persistent));

async function* streamEvents() {
    yield "event: refresh\n";
    yield "data: refresh\n";
    yield "\n\n";

    while (true) {
        await delay(30000, { persistent: false });
        yield "event: ping\n";
        yield "data: ping\n";
        yield "\n\n";
    }
}
