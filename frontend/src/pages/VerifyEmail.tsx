import {  useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";
import { verifyEmailApi ,resendVerificationOtpApi} from "../apis/auth.api";
import { useSearchParams } from "react-router-dom";

function VerifyEmail() {
const [searchParams] = useSearchParams();
  const navigate = useNavigate();

const email = searchParams.get("email") ?? "";
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      await verifyEmailApi({ email, otp });
      alert("Email verified successfully!");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Verification failed");
    }
    };
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
    await resendVerificationOtpApi(email);
    alert("OTP resent!");
    setTimer(30);
  } catch (error: any) {
    alert(error.response?.data?.message || "Failed to resend OTP");
  }
};

  return (
    <div>
      <h2>Email Verification</h2>
      <p>OTP sent to: {email}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

          <button onClick={handleVerify}>Verify</button>
       {timer > 0 ? (
  <button disabled>Resend OTP in {timer}s</button>
) : (
  <button onClick={handleResend}>Resend OTP</button>
)};

    </div>
  );
}

export default VerifyEmail;
