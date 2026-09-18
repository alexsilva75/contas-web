import { redirect, type ActionFunctionArgs } from "react-router";

import {
    getSession,
    commitSession,
} from "../server/sessions.server";

import { login } from "../server/auth.server";

export async function loginAction({
    request,
}: ActionFunctionArgs) {

    console.log("Logging in...");
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            error: "Informe e-mail e senha.",
        };
    }

    try {

        const data = await login(
            email,
            password
        );

        const session = await getSession(
            request.headers.get("Cookie")
        );

        session.set("token", data.token);

        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });

    } catch {
        return {
            error: "Credenciais inválidas.",
        };
    }
}



