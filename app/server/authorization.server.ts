// app/auth.server.ts

import { redirect } from "react-router";

import {
    getSession,
    destroySession,
} from "./sessions.server";

import {
    getUser,
} from "./auth.server";

export async function requireUser(
    request: Request
) {

    const session = await getSession(
        request.headers.get("Cookie")
    );

    const token = session.get("token");

    if (!token) {
        throw redirect("/login");
    }

    const user = await getUser(token);

    if (!user) {

        throw redirect("/login", {
            headers: {
                "Set-Cookie":
                    await destroySession(session),
            },
        });
    }

    return {
        user,
        token,
    };
}