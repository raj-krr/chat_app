import { useState } from "react";
import { Button, TextInput, PasswordInput, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth.api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await loginApi({identifier, password});
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">

      {/* Background animated grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      {/* GLASS LOGIN CARD */}
      <div
        className="
          w-full max-w-lg rounded-3xl p-8
          backdrop-blur-2xl bg-white/30 border border-white/40 shadow-xl 
          fade-in glow-hover tilt-hover
          relative z-10
        "
      >
        {/* Title */}
        <h1
          className="
            mb-6 text-4xl sm:text-5xl font-extrabold text-indigo-900 text-center
            drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]
          "
        >
          Login 🔐
        </h1>

        {/* Input fields */}
        <div className="space-y-4">
          <TextInput
            label="Email or Username"
            placeholder="Enter email or username"
            radius="md"
            size="md"
            value={identifier}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="backdrop-blur-md"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            radius="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="backdrop-blur-md"
          />
        </div>

        {/* Buttons */}
        <Group grow className="mt-6">
          <Button
            size="lg"
            radius="lg"
            color="indigo"
            className="
              transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1 transform-gpu
            "
            onClick={handleLogin}
          >
            Login
          </Button>
        </Group>

        {/* Links */}
        <div className="mt-5 text-center text-sm text-gray-800">
          <button
            className="underline hover:text-indigo-900 transition"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>

          <div className="mt-2">
            <Text>
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-indigo-900 font-semibold underline hover:opacity-80"
              >
                Create one
              </button>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
