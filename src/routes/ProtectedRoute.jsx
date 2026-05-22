import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const ProtectedRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;