type Props = {
  request: any;
  onAccept: () => void;
  onReject: () => void;
};

export default function FriendRequestItem({
  request,
  onAccept,
  onReject,
}: Props) {
  const user = request.from;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
      <img
        src={user.avatar}
        className="w-10 h-10 rounded-full"
      />

      <div className="flex-1 text-white">
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-white/60">@{user.username}</p>
      </div>

      <button
        onClick={onAccept}
        className="px-3 py-1 text-xs rounded-lg bg-green-500"
      >
        Accept
      </button>

      <button
        onClick={onReject}
        className="px-3 py-1 text-xs rounded-lg bg-red-500/70"
      >
        Reject
      </button>
    </div>
  );
}
