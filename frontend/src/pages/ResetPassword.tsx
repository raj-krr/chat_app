import { useSearchParams, useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";
import { forgotPasswordApi, resetPasswordApi } from "../apis/auth.api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const identifier = searchParams.get("identifier") ?? "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [timer, setTimer] = useState(0);

useEffect(() => {
  if (timer === 0) return;

  const interval = setInterval(() => {
    setTimer((t) => t - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

const handleResend = async () => {
  try {
    await forgotPasswordApi(identifier);  
    alert("OTP resent!");
    setTimer(30);
  } catch (error: any) {
    alert("Failed to resend OTP");
  }
};


  const handleReset = async () => {
    if (!otp || !newPassword) {
      alert("All fields are required");
      return;
    }

    try {
      await resetPasswordApi({ identifier, otp, newPassword });
      alert("Password reset successful!");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div>
      <p>Resetting password for: {identifier}</p>

      <input 
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
{timer > 0 ? (
  <button disabled>Resend OTP in {timer}s</button>
) : (
  <button onClick={handleResend}>Resend OTP</button>
)}


      <input 
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
