import { handleComponent } from "internal/route-handlers/component/handle-component.ts";

const _404Component = await import("../app/routes/_404.tsx");

export const fallbackRoute = _404Component.default
    ? handleComponent(
          _404Component.default,
          import.meta.resolve("../app/routes/signup.tsx"),
      )
    : (_req: Request) =>
          new Response("Not Found", { status: 404, statusText: "Not Found" });
