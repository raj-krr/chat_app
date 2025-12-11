import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../apis/auth.api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleRegister = async () => {
  if (!username || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await registerApi({ username, email, password });
    console.log("Register success:", res.data);

    alert("Registration successful! Please log in.");
navigate("/verify-email?email=" + encodeURIComponent(email));
  } catch (error: any) {
    console.error("Register error:", error);
    alert(error.response?.data?.message || "Registration failed");
  }
};


  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
