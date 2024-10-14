import { createIcons, Loader2, LockKeyhole, Mail, User } from "../../../node_modules/lucide/dist/esm/lucide.js" // for some reason @deno/emit bundler can't resolve jsr packages

if (typeof window !== "undefined") {
    createIcons({
        icons: {
            User,
            Mail,
            LockKeyhole,
            Loader2,
        },
    })
}
