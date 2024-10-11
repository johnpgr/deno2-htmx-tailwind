import { serveDir } from "@std/http";

export async function staticHandler(req: Request): Promise<Response> {
    return await serveDir(req, { fsRoot: "./public/" });
}
