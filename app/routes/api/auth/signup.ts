import { hash } from "@felix/argon2";
import { STATUS_CODE } from "@std/http";
import { hxRedirect } from "utils/response.tsx";
import { User } from "entities/User.ts";

export async function POST(req: Request) {
    const formData = await req.formData();
    const userAlias = formData.get("userAlias")?.toString();
    const password = formData.get("password")?.toString();
    if (!userAlias || !password) {
        return new Response("Missing required fields", { status: 400 });
    }

    const exists = await User.findOneBy({ alias: userAlias });
    if (exists) {
        return new Response("Username was already taken", {
            status: STATUS_CODE.Conflict,
        });
    }

    const user = new User();
    user.alias = userAlias;
    user.hashedPassword = await hash(password);
    await user.save();

    return hxRedirect("/signin");
}
