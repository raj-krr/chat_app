import { useEffect, useState } from "react";
import { getNotificationsApi } from "../../apis/notification.api";
import NotificationItem from "./NotificationItem";

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      setNotifications(
        Array.isArray(res.data?.notifications)
          ? res.data.notifications
          : []
      );
    } catch (err) {
      console.error("NOTIFICATIONS ERROR:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        z-40
        pointer-events-auto
        max-h-[calc(100vh-8rem)]
        overflow-y-auto
        px-2
      "
    >
      {/* LOADING */}
      {loading && (
        <div className="text-white/70 text-sm text-center mt-10">
          Loading notifications…
        </div>
      )}

      {/* EMPTY */}
      {!loading && notifications.length === 0 && (
        <div className="text-white/60 text-sm text-center mt-10">
          No notifications yet
        </div>
      )}

      {/* LIST */}
      {!loading && notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              onRead={loadNotifications}
            />
          ))}
        </div>
      )}
    </div>
  );
}
