import { useEffect, useState } from "react";
import { getMessagesApi } from "../../apis/chat.api";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  chat,
  onBack,
}: {
  chat: any;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  const loadMessages = async () => {
    const res = await getMessagesApi(chat._id);
    setMessages(res.data.messages || []);
  };

  useEffect(() => {
    loadMessages();
  }, [chat]);

  return (
    <div className="flex flex-col h-full p-4">
      {/* HEADER */}
      <ChatHeader user={chat} onBack={onBack} />

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-3 scroll-smooth">
        {messages.map((m) => (
          <MessageBubble key={m._id} msg={m} />
        ))}
      </div>

      {/* INPUT */}
      <MessageInput chatId={chat._id} onSend={loadMessages} />
    </div>
  );
}
