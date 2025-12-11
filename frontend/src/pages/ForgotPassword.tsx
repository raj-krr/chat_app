import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../apis/auth.api";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    if (!identifier) {
      alert("Please enter email or username");
      return;
    }

    try {
      await forgotPasswordApi(identifier);
      alert("OTP sent to your email");
     navigate("/reset-password?identifier=" + encodeURIComponent(identifier));

    } catch (error: any) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={identifier}
        placeholder="Email or Username"
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <button onClick={handleForgot}>Send OTP</button>
    </div>
  );
}

export default ForgotPassword;
