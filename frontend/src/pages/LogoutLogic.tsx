import { logoutApi } from "../apis/auth.api";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutApi();
    navigate("/login");  // redirect immediately
  } catch (error: any) {
    console.error("Logout failed:", error);
    alert("Something went wrong");
  }
};
<button onClick={handleLogout}>Logout</button>
