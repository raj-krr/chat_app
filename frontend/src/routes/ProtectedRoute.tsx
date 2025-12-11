import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthApi } from "../apis/auth.api";

function ProtectedRoute({ children }: { children:React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        await checkAuthApi();
        setIsAuth(true);
      } catch (e) {
        setIsAuth(false);
      }
    };

    check();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (isAuth === false) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
