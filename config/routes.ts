// IMPORTANT: This file has been automatically generated, DO NOT edit by hand.

import { byMethod } from "@http/route/by-method";
import { byPattern } from "@http/route/by-pattern";
import { cascade } from "@http/route/cascade";
import { lazy } from "@http/route/lazy";

export default cascade(
  byPattern(
    "/signup",
    lazy(async () => (await import("../app/routes/signup.tsx")).default),
  ),
  byPattern(
    "/signin",
    lazy(async () => (await import("../app/routes/signin.tsx")).default),
  ),
  byPattern(
    "/hello",
    lazy(async () => (await import("../app/routes/hello.tsx")).default),
  ),
  byPattern(
    "/api/auth/signup",
    lazy(async () =>
      byMethod(await import("../app/routes/api/auth/signup.ts"))
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
      (await import("../internal/route-handlers/handle-static-dir.ts")).default
    ),
  ),
  byPattern(
    "/:not-found*",
    lazy(async () =>
      (await import("../app/routes/[...not-found].tsx")).default
    ),
  ),
  byPattern(
    "/",
    lazy(async () => (await import("../app/routes/index.tsx")).default),
  ),
);
