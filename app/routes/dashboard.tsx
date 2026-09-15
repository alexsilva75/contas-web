import type { Route } from "./+types/home";
import { Dashboard } from "../pages/protected/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Painel do usuário" },
  ];
}

export default function Home() {
  return <Dashboard />;
}