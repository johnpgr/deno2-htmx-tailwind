import type { Handler, Route } from "@std/http";
import { METHOD } from "@std/http/unstable-method"

export class Router {
    routes: Route[] = [];

    get(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Get,
        });
        return this;
    }

    delete(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Delete,
        });
        return this;
    }

    post(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Post,
        });
        return this;
    }

    put(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Put,
        });
        return this;
    }

    patch(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Patch,
        });
        return this;
    }

    options(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: METHOD.Options,
        });
        return this;
    }

    all(path: string, handler: Handler): this {
        this.routes.push({
            handler,
            pattern: new URLPattern({ pathname: path }),
            method: Object.values(METHOD),
        });
        return this;
    }
}
