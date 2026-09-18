import { createCookieSessionStorage } from "react-router";

interface SessionData {
    token: string;
}

interface SessionFlashData {
    error: string;
}

const sessionStorage = createCookieSessionStorage<
    SessionData,
    SessionFlashData
>({
    cookie: {
        name: "__session",

        httpOnly: true,

        secure:
            process.env.NODE_ENV === "production",

        sameSite: "lax",

        path: "/",

        secrets: [
            process.env.SESSION_SECRET!,
        ],

        maxAge: 60 * 60,
    },
});

export const {
    getSession,
    commitSession,
    destroySession,
} = sessionStorage;