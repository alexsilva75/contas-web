import {
    Outlet,
    useLoaderData,
} from "react-router";

import type { Route } from "./+types/protected";

import { requireUser } from "../server/authorization.server";

export async function loader({
    request,
}: Route.LoaderArgs) {
    return await requireUser(request);
}

export default function ProtectedLayout() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <>
            <header>
                Olá, {user.nome}
            </header>

            <Outlet />
        </>
    );
}