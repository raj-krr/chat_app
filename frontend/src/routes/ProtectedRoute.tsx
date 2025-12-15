import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();

  if (isAuth === null) {
    return <p>Checking session...</p>;
  }

  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
