import { deleteMessageForEveryoneApi, deleteMessageForMeApi } from "../../apis/chat.api";
import { useAuth } from "../../context/AuthContext";

export default function MessageBubble({ msg, chatUser }: any) {
  const { user } = useAuth();
  if (!msg || !msg.senderId) return null;

  const myId = user?._id?.toString();
  const senderId =
    typeof msg.senderId === "string"
      ? msg.senderId
      : msg.senderId?._id?.toString() ?? msg.senderId.toString();

  const isMe = senderId === myId;
  const avatarUrl = isMe ? user?.avatar : chatUser?.avatar;

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatarUrl || "/avatar-placeholder.png"} />
        </div>
      </div>

      <div
        className={`chat-bubble ${
          isMe ? "chat-bubble-primary" : "chat-bubble-neutral"
        }`}
      >
       {msg.isDeleted ? (
  <span className="italic opacity-60">
    This message was deleted
  </span>
) : (
  msg.text
        )}
        
{isMe && !msg.isDeleted && !msg.isTemp && (
  <div className="flex gap-2 mt-1 text-xs opacity-50">
    <button
      onClick={() => deleteMessageForMeApi(msg._id)}
      className="hover:opacity-90"
    >
      DFM
    </button>

    <button
      onClick={() => deleteMessageForEveryoneApi(msg._id)}
      className="hover:opacity-90 text-red-400"
    >
      DFE  
    </button>
  </div>
)}



      </div>
      {isMe && (
  <div className="text-xs opacity-60 mt-1 flex justify-end">
    {msg.isRead ? "✔✔" : "✔"}
  </div>
)}

      <div className="chat-footer text-xs opacity-50 mt-1">
        {new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
