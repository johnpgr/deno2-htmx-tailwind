// IMPORTANT: This file has been automatically generated, DO NOT edit by hand.

import { byMethod } from "@http/route/by-method";
import { byPattern } from "@http/route/by-pattern";
import { cascade } from "@http/route/cascade";
import { lazy } from "@http/route/lazy";
import { handleComponent } from "internal/route-handlers/component/handle-component.ts";

export default cascade(
  byPattern(
    "/signup",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/signup.tsx")).default,
        import.meta.resolve("../app/routes/signup.tsx"),
      )
    ),
  ),
  byPattern(
    "/signin",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/signin.tsx")).default,
        import.meta.resolve("../app/routes/signin.tsx"),
      )
    ),
  ),
  byPattern(
    "/posts/:id",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/posts/[id].tsx")).default,
        import.meta.resolve("../app/routes/posts/[id].tsx"),
      )
    ),
  ),
  byPattern(
    "/hello",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/hello.tsx")).default,
        import.meta.resolve("../app/routes/hello.tsx"),
      )
    ),
  ),
  byPattern(
    "/auto-refresh/feed",
    lazy(async () =>
      byMethod(await import("../app/routes/auto-refresh/feed.ts"))
    ),
  ),
  byPattern(
    "/api/auth/signup",
    lazy(async () =>
      byMethod(await import("../app/routes/api/auth/signup.ts"))
    ),
  ),
  byPattern(
    "/api/auth/signout",
    lazy(async () =>
      byMethod(await import("../app/routes/api/auth/signout.ts"))
    ),
  ),
  byPattern(
    "/api/auth/signin",
    lazy(async () =>
      byMethod(await import("../app/routes/api/auth/signin.ts"))
    ),
  ),
  byPattern(
    "/:path+",
    lazy(async () =>
      (await import("../internal/route-handlers/static.ts")).default
    ),
  ),
  byPattern(
    "/:_404*",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/_404.tsx")).default,
        import.meta.resolve("../app/routes/_404.tsx"),
      )
    ),
  ),
  byPattern(
    "/",
    lazy(async () =>
      handleComponent(
        (await import("../app/routes/index.tsx")).default,
        import.meta.resolve("../app/routes/index.tsx"),
      )
    ),
  ),
);
