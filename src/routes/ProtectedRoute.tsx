import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: string;
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
