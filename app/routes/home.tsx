import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Login } from "~/pages/login/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Conta Alerta" },
    { name: "description", content: "Autenticação Requerida" },
  ];
}

export default function Home() {
  return <Login />;
}
