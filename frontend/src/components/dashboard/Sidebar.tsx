import { TextInput } from "@mantine/core";
import { useState } from "react";

import ChatListItem from "./ChatListItem";
import SearchResults from "./SearchResults";
import FriendRequests from "./FriendRequests";
import FriendsBubble from "./FriendsBubble";
import FriendsPicker from "./FriendsPicker";

import { useSidebar } from "./useSidebar";

export default function Sidebar({ onSelectChat }: any) {
  const {
    chats,
    setChats,
    allUsers,
    filteredUsers,
    query,
    setQuery,
    mode,
    setMode,
    loadChats,
  } = useSidebar();

  const [showFriendsPicker, setShowFriendsPicker] = useState(false);

  return (
    <div
      className="
        relative h-full flex flex-col
        text-white border-r border-white/20 bg-white/5
      "
    >
      {/* 🔍 SEARCH */}
      <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-xl p-3">
        <TextInput
          placeholder="Search users"
          value={query}
          onChange={e => setQuery(e.target.value)}
          radius="md"
        />

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              setMode("chats");
              setQuery("");
            }}
            className={`text-xs px-3 py-1 rounded-lg ${
              mode === "chats"
                ? "bg-indigo-500"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Chats
          </button>

          <button
            onClick={() => {
              setMode("requests");
              setQuery("");
            }}
            className={`text-xs px-3 py-1 rounded-lg ${
              mode === "requests"
                ? "bg-indigo-500"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Requests
          </button>
        </div>
      </div>

      {/* 📃 LIST */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        {mode === "requests" && (
          <FriendRequests onAccepted={loadChats} />
        )}

        {mode === "chats" && query && (
          <SearchResults users={filteredUsers} />
        )}

        {mode === "chats" &&
          !query &&
          chats.map(chat => (
            <ChatListItem
              key={chat.user?._id}
              user={chat.user}
              unreadCount={chat.unreadCount || 0}
              lastMessage={chat.lastMessage}
              onClick={() => {
                setChats(prev =>
                  prev.map(c =>
                    c.user?._id === chat.user?._id
                      ? { ...c, unreadCount: 0 }
                      : c
                  )
                );
                onSelectChat(chat.user);
              }}
            />
          ))}
      </div>

      {/* ➕ NEW CHAT */}
      <div className="absolute bottom-4 right-4">
        <FriendsBubble onOpen={() => setShowFriendsPicker(true)} />
      </div>

      {showFriendsPicker && (
        <FriendsPicker
          friends={allUsers}
          onSelect={(f: any) => {
            onSelectChat(f);
            setShowFriendsPicker(false);
          }}
          onClose={() => setShowFriendsPicker(false)}
        />
      )}
    </div>
  );
}
