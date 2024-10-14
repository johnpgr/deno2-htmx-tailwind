import { eq } from "drizzle-orm/expressions"
import { db } from "database/client.ts"
import { User } from "database/schema.ts"
import { ulid } from "@std/ulid/ulid"
import { hash } from "@felix/argon2"
import { redirect } from "lib/redirect.ts"

export async function POST(req: Request) {
    const formData = await req.formData()
    const username = formData.get("username")?.toString()
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    if (!username || !email || !password) {
        return new Response("Missing required fields", { status: 400 })
    }

    const existingEmail = await db.query.User.findFirst({
        where: (user) => eq(user.email, email),
    })

    if (existingEmail) {
        return new Response("This email address is in use", {
            status: 409,
        })
    }

    const existingUsername = await db.query.User.findFirst({
        where: (user) => eq(user.name, username),
    })

    if (existingUsername) {
        return new Response("This username is in use", { status: 409 })
    }

    const [user] = await db
        .insert(User)
        .values({
            id: ulid(),
            name: username,
            email: email,
            hashedPassword: await hash(password),
        })
        .returning()

    if (!user) {
        return new Response("Failed to create user", { status: 500 })
    }

    return redirect("/signin")
}
