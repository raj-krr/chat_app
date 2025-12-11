import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth.api"; 

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await loginApi({identifier, password});
      console.log("Login success:", res.data);

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email or Username"
      />;
    

      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
