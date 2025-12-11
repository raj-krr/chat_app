import { Button, Text, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">

      {/* Background animated grid */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none"></div>

      {/* CENTER GLASS CONTAINER */}
      <div
        className="
          w-full max-w-lg rounded-3xl p-6 backdrop-blur-2xl bg-white/80 border border-white/40 shadow-xl
          fade-in glow-hover tilt-hover
          relative z-0
        "
      >
        {/* CONTENT */}
        <div className="text-center text-gray-900">

          {/* App Name with soft glow */}
          <h1
            className="
              mb-4 text-5xl sm:text-6xl font-extrabold text-indigo-900
              drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]
            "
          >
            ChitChat 💬
          </h1>

          <Text size="lg" className="mb-3 text-xl font-semibold text-gray-900">
            Say more with <span className="text-indigo-700">ChitChat</span>.
          </Text>

          <Text
            size="md"
            className="mb-10 max-w-md mx-auto text-gray-800 opacity-85 leading-relaxed"
          >
            A fast, modern messaging experience designed for people who want
            to connect instantly, seamlessly, and beautifully.
          </Text>

          <Group grow className="gap-4 flex-col sm:flex-row">
  <Button
    size="lg"
    radius="lg"
    color="indigo"
    className="
      transition-all duration-300 
      hover:shadow-xl hover:-translate-y-1 
      transform-gpu
    "
    onClick={() => navigate("/login")}
  >
    Login
  </Button>

  <Button
    size="lg"
    radius="lg"
    variant="outline"
    color="indigo"
    className="
      border-2 transition-all duration-300 
      hover:shadow-xl hover:-translate-y-1 
      transform-gpu
    "
    onClick={() => navigate("/register")}
  >
    Create Account
  </Button>
</Group>

        </div>
      </div>
    </div>
  );
}
