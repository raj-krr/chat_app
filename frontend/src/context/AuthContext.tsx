import { createContext, useContext, useEffect, useState } from "react";
import { refreshApi } from "../apis/auth.api";
import { socket } from "../apis/socket";

type AuthContextType = {
  isAuth: boolean | null;
  user: any | null;
   setIsAuth: (v: boolean) => void;
  setUser: (u: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  user: null,
    setIsAuth: () => {},
  setUser: () => {},
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

        socket.connect(); 
      } catch {
        setIsAuth(false);
        setUser(null);
      }
    };
    
    bootstrap();

  }, []);

  return (
   <AuthContext.Provider
  value={{ isAuth, user, setIsAuth, setUser }}
>
  {children}
</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
