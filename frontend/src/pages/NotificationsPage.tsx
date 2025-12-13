import NotificationsPanel from "../components/notifications/NotificationsPanel";
import AppNavbar from "../components/layout/AppNavbar";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <AppNavbar active="notifications" />

      <div className="pt-24 px-4">
        <div
          className="
            max-w-4xl mx-auto
            rounded-3xl
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            p-6
          "
        >
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
}
