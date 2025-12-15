import { useState } from "react";
import { sendMessageApi } from "../../apis/chat.api";
import { socket } from "../../apis/socket";
import { useAuth } from "../../context/AuthContext";

export default function MessageInput({ chatId, onLocalSend }: any) {
  const [text, setText] = useState("");
  const { user } = useAuth();
const send = async () => {
  if (!text.trim()) return;

  const tempMsg = {
    _id: crypto.randomUUID(),
    text,
    senderId: user._id,
    receiverId: chatId,
    createdAt: new Date().toISOString(),
    isTemp: true,
  };

  onLocalSend(tempMsg);
  setText("");

  const form = new FormData();
  form.append("text", text);

  await sendMessageApi(chatId, form);
};


  return (
    <div className="flex gap-3 mt-3">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          socket.emit("typing", { to: chatId });
        }}
        placeholder="Type a message..."
        className="flex-1 rounded-xl px-4 py-2 bg-white/20 text-white outline-none"
      />
      <button
        onClick={send}
        className="px-5 rounded-xl bg-indigo-500 text-white"
      >
        Send
      </button>
    </div>
  );
}
