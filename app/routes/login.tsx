import type { Route } from "./+types/login";

import {Login} from "../pages/login/Login";
import { loginAction } from "~/actions/auth.action.server";

export function meta() {
    return [
        { title: "Login" },
    ];
}

export function action(args: Route.ActionArgs) {
    console.log("Login args: ", args);
    return loginAction(args);
}

export default function LoginRoute() {
    return <Login />;
}