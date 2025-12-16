import { createContext, useContext, useEffect, useState } from "react";
import { refreshApi } from "../apis/auth.api";
import { socket } from "../apis/socket";

type AuthContextType = {
  isAuth: boolean | null;
  user: any | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await refreshApi();
        setUser(res.data.user);
        setIsAuth(true);

        socket.connect(); // ✅ CONNECT ONCE
      } catch {
        setIsAuth(false);
        setUser(null);
      }
    };

    bootstrap();

    return () => {
      socket.disconnect(); // ✅ DISCONNECT ON APP CLOSE / LOGOUT
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
