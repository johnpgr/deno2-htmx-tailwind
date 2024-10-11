import {
    route,
} from "@std/http";
import { ViewsHandler } from "./handlers/views.ts";
import { Router } from "./router.ts";
import { staticHandler } from "./handlers/static.ts";

if (import.meta.main) {
    const viewsHandler = new ViewsHandler();

    const router = new Router()
        .get("/", viewsHandler.index)
        .get("/hello", viewsHandler.hello)
        .get("*", staticHandler);

    Deno.serve(route(router.routes, viewsHandler.notFound));
}
