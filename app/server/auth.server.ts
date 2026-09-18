import type { User } from "~/interfaces/User";

interface LoginResponse {
    token: string;
    user: User;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {

    const url = `${process.env.API_URL}/api/login`;

    console.log("Accessing login endpoint...", url);

    const response = await fetch(
        url,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },

            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Falha na autenticação.");
    }

    return response.json();
}

export async function getUser(
    token: string
): Promise<User | null> {

    const response = await fetch(
        `${process.env.API_URL}/api/user`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            "Erro ao consultar usuário autenticado."
        );
    }

    return response.json();
}