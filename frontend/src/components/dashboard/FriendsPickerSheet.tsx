import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";

type Props = {
  friends: any[];
  onSelect: (user: any) => void;
  onClose: () => void;
};

export default function FriendsPickerSheet({
  friends,
  onSelect,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setOpen(true));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`
          relative w-full
          max-h-[35vh]
          rounded-t-2xl
          bg-[#1f1f2e]/90 backdrop-blur-xl
          border-t border-white/20
          p-4 overflow-y-auto

          transform transition-all duration-250 ease-out
          ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-medium">Your Friends</p>
          <button onClick={onClose} className="text-white/70">
            ✕
          </button>
        </div>

        {friends.length === 0 ? (
          <p className="text-white/60 text-sm text-center mt-6">
            No friends yet
          </p>
        ) : (
          friends.map((f) => (
            <ChatListItem
              key={f._id}
              user={f}
              onClick={() => {
                onSelect(f);
                onClose();
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
