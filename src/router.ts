import type { Handler, Route } from "@std/http";
import { HTTP_METHOD } from "./utils.ts";

export class Router {
    routes: Route[] = [];

    get(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.GET,
        });
        return this;
    }

    delete(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.DELETE,
        });
        return this;
    }

    post(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.POST,
        });
        return this;
    }

    put(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.PUT,
        });
        return this;
    }

    patch(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.PATCH,
        });
        return this;
    }

    all(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: Object.values(HTTP_METHOD),
        });
        return this;
    }

    options(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.OPTIONS,
        });
        return this;
    }

    head(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.HEAD,
        });
        return this;
    }

    connect(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.CONNECT,
        });
        return this;
    }

    trace(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: HTTP_METHOD.TRACE,
        });
        return this;
    }
}
