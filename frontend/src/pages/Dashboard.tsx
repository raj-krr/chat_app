import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthApi } from "../apis/auth.api";

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkAuthApi();
        setUser(res.data.user);
      } catch (e) {
        navigate("/login"); 
      }
    };

    check();
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
