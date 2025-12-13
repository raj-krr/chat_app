import { sendFriendRequestApi } from "../../apis/friend.api";

export default function SearchResults({ users }: { users: any[] }) {
  return (
    <div className="mt-4 space-y-2">
      {users.map((u) => (
        <div
          key={u._id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
        >
          <img
            src={u.avatar}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex-1 text-white">
            <p>{u.firstName} {u.lastName}</p>
            <p className="text-xs text-white/60">@{u.username}</p>
          </div>

          <button
  onClick={() => sendFriendRequestApi(u.username)}
  className="text-xs px-3 py-1 rounded-lg bg-indigo-500"
>
  Add
</button>

        </div>
      ))}
    </div>
  );
}
