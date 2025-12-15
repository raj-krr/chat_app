import { useState } from "react";
import { sendFriendRequestApi } from "../../apis/friend.api";

export default function SearchResults({ users }: { users: any[] }) {
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set());

  const sendRequest = async (username: string, id: string) => {
    try {
      setSending(id);
      await sendFriendRequestApi(username);
      setSent(prev => new Set(prev).add(id));
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {users.map(u => {
        const isSent = sent.has(u._id);

        return (
          <div
            key={u._id}
            className="
              flex items-center gap-3
              p-3 rounded-xl
              bg-white/5 hover:bg-white/10
              transition
            "
          >
            {/* Avatar */}
            <img
              src={u.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* User Info */}
            <div className="flex-1 text-white overflow-hidden">
              <p className="font-medium truncate">
                {u.firstName} {u.lastName}
              </p>
              <p className="text-xs text-white/60 truncate">
                @{u.username}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="
                  text-xs px-3 py-1 rounded-lg
                  bg-white/10 hover:bg-white/20
                  transition
                "
                onClick={() => {
                  // later: open profile modal
                }}
              >
                View
              </button>

              <button
                disabled={isSent || sending === u._id}
                onClick={() => sendRequest(u.username, u._id)}
                className={`
                  text-xs px-3 py-1 rounded-lg
                  transition
                  ${
                    isSent
                      ? "bg-green-500/20 text-green-300 cursor-default"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }
                `}
              >
                {isSent ? "Sent" : sending === u._id ? "Sending..." : "Add"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
