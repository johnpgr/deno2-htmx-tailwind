// Source: https://github.com/jollytoad/home/blob/main/app/lib/handle_route_static_dir.ts
import { byMethod } from "@http/route/by-method";
import { serveDir } from "@std/http";
import { fromFileUrl } from "@std/path/from-file-url";

export default byMethod({
    GET(req, match: URLPatternResult) {
        const path = match.pathname.groups.path ?? "";
        const urlRoot = match.pathname.input.slice(1, -path.length);
        const fsRoot = fromFileUrl(
            import.meta.resolve(`../../app/routes/${urlRoot}static`),
        );

        return serveDir(req, { fsRoot, urlRoot });
    },
});
