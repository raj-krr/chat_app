import NotificationsPanel from "../components/notifications/NotificationsPanel";
import AppNavbar from "../components/layout/AppNavbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../components/layout/MobileBottomNav";


export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen relative overflow-hidden

        /* 📱 MOBILE – light gradient */
        bg-gradient-to-b
        from-indigo-400 via-purple-400 to-pink-400

        /* 💻 DESKTOP – richer gradient */
        md:bg-gradient-to-br
        md:from-indigo-500 md:via-purple-500 md:to-pink-500
      "
    >
       {/* Background grid */}
      <div
        className="
          absolute inset-0 bg-grid pointer-events-none
          opacity-[0.03] md:opacity-25
        "
      ></div>
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        <AppNavbar active="notifications" />
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-white">Notifications</h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 px-4 md:px-0 md:mt-24">
        <div className="max-w-4xl mx-auto px-4">
  <NotificationsPanel />
</div>

      </div>
      {/* MOBILE BOTTOM NAV */}
<div className="md:hidden">
  <MobileBottomNav
    active="notifications"
  />
</div>

    </div>
  );
}
