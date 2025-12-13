type Props = {
  user: any;
  onClick: () => void;
};

export default function ChatListItem({ user, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl
        hover:bg-white/10 cursor-pointer transition"
    >
      <img
        src={user.avatar}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1 text-white">
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-white/60">@{user.username}</p>
      </div>
    </div>
  );
}
