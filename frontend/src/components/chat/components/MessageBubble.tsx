import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import {
  deleteMessageForEveryoneApi,
  deleteMessageForMeApi,
} from "../../../apis/chat.api";

const getFileType = (urlOrName: string) => {
  const ext = urlOrName.split(".").pop()?.toLowerCase();

  if (!ext) return "file";

  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx"].includes(ext)) return "doc";
  if (["xls", "xlsx"].includes(ext)) return "excel";

  return "file";
};

//  export default function MessageBubble({ msg, chatUser }: any) {
 export default function MessageBubble({ msg }: any) {
  const { user } = useAuth();
  const [showActions, setShowActions] = useState(false);

  const myId = user?._id?.toString();
  const senderId =
    typeof msg.senderId === "object"
      ? msg.senderId._id?.toString()
      : msg.senderId?.toString();

 
   
   const getPreviewUrl = () => {
  if (msg.file) return msg.file;

  if (msg.attachment && msg.attachment instanceof File) {
    return URL.createObjectURL(msg.attachment);
  }

  return null;
};
  
   const fileType = msg.file
  ? getFileType(msg.file)
  : msg.attachment
  ? getFileType(msg.attachment.name)
  : null;

const previewUrl = getPreviewUrl();


  const isMe = senderId === myId;

  // const senderName = isMe ? "You" : chatUser?.username;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowActions(true);
  };

  return (
    <div
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
      onClick={() => setShowActions(false)}
    >
      <div
        onContextMenu={handleContextMenu}
        className={`
          max-w-[75%] px-4 py-2 rounded-2xl text-sm
          leading-relaxed whitespace-pre-wrap break-words
          backdrop-blur-md
          ${
            isMe
              ? "bg-indigo-600 text-white rounded-br-sm"
              : "bg-white/20 text-white rounded-bl-sm"
          }
         
        `}
      >
        {/* ACTIONS */}
        {showActions && (
          <div className="flex gap-3 mb-2 text-xs opacity-70">
            <button
              disabled={!msg._id}
              onClick={() => {
                if (!msg._id) return;
                deleteMessageForMeApi(msg._id);
                setShowActions(false);
              }}
            >
              Delete for me
            </button>

            {isMe && (
              <button
                disabled={!msg._id}
                onClick={() => {
                  if (!msg._id) return;
                  deleteMessageForEveryoneApi(msg._id);
                  setShowActions(false);
                }}
                className="text-red-400"
              >
                Delete for everyone
              </button>
            )}
          </div>
        )}

        {/* USERNAME */}
        {/* <div className="text-[11px] font-semibold opacity-80 mb-1">
          {senderName}
        </div> */}

        {/* MESSAGE CONTENT */}
        {msg.isDeleted ? (
          <span className="italic opacity-60">This message was deleted</span>
        ) : (
          <>
            {/* TEXT (only if meaningful) */}
            {msg.text?.trim() && <div>{msg.text}</div>}

            {fileType === "image" && previewUrl && (
  <img
    src={previewUrl}
    alt="attachment"
    className="mt-2 max-w-[160px] max-h-[160px] rounded-lg object-cover cursor-pointer"
    onClick={() =>
      window.open(msg.file || previewUrl, "_blank")
    }
  />
)}


            {/* VIDEO FILE (icon-based, not inline video) */}
            {msg.file && fileType === "video" && (
              <div
                onClick={() => window.open(msg.file, "_blank")}
                className="mt-2 flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer"
              >
                🎥
                <span className="text-sm truncate max-w-[160px]">
                  {msg.file.split("/").pop()}
                </span>
              </div>
            )}

            {/* DOCUMENT / OTHER FILE */}
            {msg.file &&
              ["pdf", "doc", "excel", "file"].includes(fileType!) && (
                <div
                  onClick={() => window.open(msg.file, "_blank")}
                  className="mt-2 flex items-center gap-3 p-3 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                >
                  <span className="text-2xl">
                    {fileType === "pdf" && "📄"}
                    {fileType === "doc" && "📝"}
                    {fileType === "excel" && "📊"}
                    {fileType === "file" && "📎"}
                  </span>

                  <div className="flex flex-col text-sm">
                    <span className="truncate max-w-[160px]">
                      {msg.file.split("/").pop()}
                    </span>
                    <span className="text-xs opacity-60">Tap to open</span>
                  </div>
                </div>
              )}

            {/* TEMP FILE (before upload finishes) */}
            {msg.attachment && !msg.file && (
              <div className="mt-2 flex items-center gap-2 text-sm opacity-80">
                📎 {msg.attachment.name}
              </div>
            )}
          </>
        )}

        {msg.status === "sending" && (
          <span className="text-xs opacity-60">Sending…</span>
        )}

        {msg.status === "failed" && (
          <button onClick={msg.onRetry} className="text-red-400 text-xs">
            Retry
          </button>
        )}

        {/* META */}
        <div className="flex justify-end gap-1 text-[10px] opacity-60 mt-1">
          {msg.createdAt &&
            !isNaN(new Date(msg.createdAt).getTime()) &&
            new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          {isMe && <span>{msg.isRead ? "✔✔" : "✔"}</span>}
        </div>
      </div>
    </div>
  );
}
