import { bundle } from "@deno/emit"
import { readdir } from "node:fs/promises"

if (import.meta.main) {
    const entrypoint = new URL(import.meta.resolve("../browser/"))
    const outDir = new URL(import.meta.resolve("../app/routes/static/"))
    for (const entry of await readdir(entrypoint)) {
        if (entry.endsWith(".ts")) {
            const { code } = await bundle(new URL(entry, entrypoint))
            await Deno.writeTextFile(new URL(entry.replace(".ts", ".js"), outDir), code)
        }
    }
}
