import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  active?: "home" | "profile" | "notifications";
  unreadCount?: number;
};

export default function AppNavbar({
  active = "home",
  unreadCount = 0,
}: Props) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const tabClass = (key: string) =>
    `relative transition ${
      active === key
        ? "text-white font-semibold"
        : "text-white/70 hover:text-white"
    }`;

  return (
    <>
      {/* NAVBAR */}
      <div
        className="
          fixed top-3 left-1/2 -translate-x-1/2
          w-[93%] max-w-6xl
          backdrop-blur-xl bg-white/25
          border border-white/30
          shadow-lg rounded-2xl
          px-6 py-3
          flex justify-between items-center
          z-[100]
          pointer-events-auto
        "
      >
        <h1
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => go("/dashboard")}
        >
          ChitChat
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex gap-6 items-center text-white font-medium">
          <button onClick={() => go("/dashboard")} className={tabClass("home")}>
            Home
          </button>

          <button onClick={() => go("/profile")} className={tabClass("profile")}>
            Profile
          </button>

          <button
            onClick={() => go("/notifications")}
            className={tabClass("notifications")}
          >
            Notifications
            {unreadCount > 0 && (
              <span
                className="
                  absolute -top-1 -right-2
                  text-[10px] px-1.5 py-0.5
                  rounded-full bg-red-500 text-white
                "
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button onClick={logout} className="text-red-300">
            Logout
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="sm:hidden text-white text-3xl"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            fixed top-20 left-1/2 -translate-x-1/2
            w-[93%]
            bg-white/30 backdrop-blur-2xl
            border border-white/30
            rounded-xl p-4
            text-white sm:hidden
            z-[1000]
            pointer-events-auto
          "
        >
          <button onClick={() => go("/dashboard")} className="block py-2">
            Home
          </button>

          <button onClick={() => go("/profile")} className="block py-2">
            Profile
          </button>

          <button onClick={() => go("/notifications")} className="block py-2">
            Notifications
          </button>

          <button onClick={logout} className="block py-2 text-red-300">
            Logout
          </button>
        </div>
      )}
    </>
  );
}
