import { usePresence } from "../../context/PresenceContext";

export default function ChatListItem({ user, unreadCount = 0, onClick }: any) {
  const { onlineUsers } = usePresence();
  const isOnline = onlineUsers.has(user._id);

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
    >
      <div className="relative">
        <img src={user.avatar} className="w-10 h-10 rounded-full" />

        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black
            ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
        />
      </div>
       {unreadCount > 0 && (
    <span
    className="
      ml-auto
      min-w-[20px] h-5
      px-1.5
      flex items-center justify-center
      text-xs font-semibold
      rounded-full
      bg-indigo-500 text-white
    "
  >
    {unreadCount}
  </span>
)}

      <p className="text-white">{user.username}</p>
    </div>
  );
}
