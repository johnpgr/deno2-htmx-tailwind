import routes from "config/routes.ts";

if (import.meta.main) {
    //@ts-ignore: This works fine
    await Deno.serve(routes).finished;
}
