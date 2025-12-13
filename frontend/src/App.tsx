
import {  Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/DashboardPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
       
        {/* Dashboard should be protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
  
  );
}

export default App;

