export default function MessageBubble({ msg }: { msg: any }) {
  const isMe = msg.isSender;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-white
          ${isMe ? "bg-indigo-500" : "bg-white/20"}`}
      >
        {msg.text}
      </div>
    </div>
  );
}
