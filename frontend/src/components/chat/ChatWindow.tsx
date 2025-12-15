import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useAuth } from "../../context/AuthContext";

import { useChatMessages } from "./useChatMessages";
import { useChatSocket } from "./useChatSocket";

const formatDateLabel = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString();
};



export default function ChatWindow({ chat, onBack }: any) {
  const { user } = useAuth();

  const {
    messages,
    setMessages,
    hasMore,
    loadingMore,
    loadMessages,
    containerRef,
    endRef,
    shouldAutoScrollRef,
  } = useChatMessages(chat._id);

  const {
    showNewMsgBtn,
    setShowNewMsgBtn,
    isTyping,
    markRead,
  } = useChatSocket({
    chatId: chat._id,
    userId: user?._id,
    setMessages,
    shouldAutoScrollRef,
    endRef,
  });

  const handleScroll = async () => {
    const el = containerRef.current;
    if (!el) return;

    const atBottom =
      el.scrollHeight - el.scrollTop <= el.clientHeight + 20;

    shouldAutoScrollRef.current = atBottom;
    

const hasUnreadFromChatUser =
  messages.length > 0 &&
  messages[messages.length - 1].senderId !== user?._id;

if (atBottom) {
  setShowNewMsgBtn(false);

  if (hasUnreadFromChatUser) {
    await markRead();
  }
}


    if (el.scrollTop < 50 && hasMore && !loadingMore) {
      await loadMessages();
    }
  };
      const visibleMessages = messages.filter(
  m => !m.deletedFor?.includes(user._id)
);

  return (
    <div className="flex flex-col h-full p-4 relative">
      <ChatHeader user={chat} onBack={onBack} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto mt-4 px-1"
      >
        {visibleMessages.map((m, i) => {
          const prev = messages[i - 1];
          const showDate =
            !prev ||
            new Date(prev.createdAt).toDateString() !==
              new Date(m.createdAt).toDateString();

          return (
            <div key={m._id}>
              {showDate && (
                <div className="text-center my-3 text-xs text-white/60">
                  {formatDateLabel(m.createdAt)}
                </div>
              )}
              <MessageBubble msg={m} chatUser={chat} />
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {isTyping && (
        <p className="text-xs opacity-60 mt-1">typing...</p>
      )}

      {showNewMsgBtn && (
        <button
          onClick={() => {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
            setShowNewMsgBtn(false);
            shouldAutoScrollRef.current = true;
          }}
          className="
            absolute bottom-24 left-1/2 -translate-x-1/2
            px-4 py-2 rounded-full
            bg-indigo-600 text-white shadow-lg
          "
        >
          New messages ↓
        </button>
      )}

      <MessageInput
        chatId={chat._id}
        onLocalSend={(msg: any) =>
          setMessages(prev => [...prev, msg])
        }
      />
    </div>
  );
}
