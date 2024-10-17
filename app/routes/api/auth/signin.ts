import { hash, verify } from "@felix/argon2";
import { ulid } from "@std/ulid/ulid";
import { Session } from "entities/Session.ts";
import {
    DEFAULT_REFRESHTOKEN_DURATION,
    DEFAULT_SESSION_DURATION,
    SESSION_COOKIE_NAME,
} from "config/consts.ts";
import { type Cookie, setCookie } from "@std/http/cookie";
import { hxRedirect } from "utils/response.tsx";
import type { APIRoute } from "internal/route-handlers/component/types.ts";
import { User } from "entities/User.ts";

export const POST: APIRoute = async (req: Request) => {
    const formData = await req.formData();
    const userAlias = formData.get("userAlias")?.toString();
    const password = formData.get("password")?.toString();
    if (!userAlias || !password) {
        return new Response("Missing required fields", { status: 400 });
    }

    const [foundUser] = await User.findBy({ alias: userAlias });

    if (!foundUser) {
        return new Response("Invalid credentials", { status: 401 });
    }

    if (!(await verify(foundUser.hashedPassword, password))) {
        return new Response("Invalid credentials", { status: 401 });
    }

    const session = new Session();
    session.token = ulid()
    session.user = foundUser;
    session.expiresAt = new Date(Date.now() + DEFAULT_SESSION_DURATION);
    await session.save();

    const sessionTokenCookie: Cookie = {
        name: SESSION_COOKIE_NAME,
        value: session.token,
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: DEFAULT_REFRESHTOKEN_DURATION,
    };

    const headers = new Headers();
    setCookie(headers, sessionTokenCookie);

    return hxRedirect("/", { headers });
};
