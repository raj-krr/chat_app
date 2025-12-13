import ChatListItem from "./ChatListItem";

type Props = {
  friends: any[];
  onSelect: (user: any) => void;
  onClose: () => void;
};

export default function FriendsPicker({
  friends,
  onSelect,
  onClose,
}: Props) {
  return (
    <div
      className="
        absolute inset-0
        bg-black/40 backdrop-blur-sm
        flex items-end
      "
    >
      <div
        className="
          w-full bg-[#1f1f2e]
          rounded-t-2xl p-4
          max-h-[70%] overflow-y-auto
        "
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-white font-medium">Start a chat</p>
          <button
            onClick={onClose}
            className="text-white/60"
          >
            ✕
          </button>
        </div>

        {friends.length === 0 ? (
          <p className="text-white/60 text-sm">
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
