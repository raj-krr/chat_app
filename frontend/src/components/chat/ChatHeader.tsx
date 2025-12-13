export default function ChatHeader({
  user,
  onBack,
}: {
  user: any;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">

      {/* BACK ARROW (MOBILE ONLY) */}
      <button
        onClick={onBack}
        className="md:hidden text-white text-xl"
      >
        ←
      </button>

      <img
        src={user.avatar}
        className="w-10 h-10 rounded-full"
      />

      <div className="text-white">
        <p className="font-semibold">{user.username}</p>
        <p className="text-xs text-white/60">Online</p>
      </div>
    </div>
  );
}
