
import {  Routes, Route } from "react-router-dom";
import Login from "../src/pages/LoginPage";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "../src/pages/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
       
        {/* Dashboard should be protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
  
  );
}

export default App;

