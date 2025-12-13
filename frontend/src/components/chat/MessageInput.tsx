import { useState } from "react";
import { sendMessageApi } from "../../apis/chat.api";

export default function MessageInput({
  chatId,
  onSend,
}: {
  chatId: string;
  onSend: () => void;
}) {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;

    const form = new FormData();
    form.append("text", text);

    await sendMessageApi(chatId, form);
    setText("");
    onSend();
  };

  return (
    <div className="flex gap-3 mt-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
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
