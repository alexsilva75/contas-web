// routes/protected.tsx

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}