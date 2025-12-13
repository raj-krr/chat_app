import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import {
  getMyFriendsApi,
  getAllUsersApi,
} from "../../apis/friend.api";

import ChatListItem from "./ChatListItem";
import SearchResults from "./SearchResults";
import FriendRequests from "./FriendRequests";
import FriendsBubble from "./FriendsBubble";
import FriendsPicker from "./FriendsPicker";

export default function Sidebar({ onSelectChat }: any) {
  const [friends, setFriends] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"chats" | "requests">("chats");
  const [showFriendsPicker, setShowFriendsPicker] = useState(false);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    loadFriends();
    loadAllUsers();
  }, []);

  const loadFriends = async () => {
    try {
      const res = await getMyFriendsApi();
      setFriends(Array.isArray(res.data?.users) ? res.data.users : []);
    } catch {
      setFriends([]);
    }
  };

  const loadAllUsers = async () => {
    try {
      const res = await getAllUsersApi();
      setAllUsers(Array.isArray(res.data?.users) ? res.data.users : []);
    } catch {
      setAllUsers([]);
    }
  };

  /* ---------------- SEARCH ---------------- */
  const filteredUsers = query
    ? allUsers.filter(
        (u) =>
          u.username?.toLowerCase().includes(query.toLowerCase()) ||
          u.email?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="
        relative
        pointer-events-auto
        p-4
        border-r border-white/20
        text-white
        h-full
        overflow-y-auto
        scroll-smooth
        z-30
      "
    >
      {/* SEARCH */}
      <TextInput
        placeholder="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* MODE SWITCH */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            setMode("chats");
            setQuery("");
          }}
          className={`text-xs px-3 py-1 rounded-lg ${
            mode === "chats" ? "bg-indigo-500" : "bg-white/10"
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
            mode === "requests" ? "bg-indigo-500" : "bg-white/10"
          }`}
        >
          Requests
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-2">
        {mode === "requests" && (
          <FriendRequests onAccepted={loadFriends} />
        )}

        {mode === "chats" && query && (
          <SearchResults users={filteredUsers} />
        )}

        {mode === "chats" &&
          !query &&
          friends.map((f) => (
            <ChatListItem
              key={f._id}
              user={f}
              onClick={() => onSelectChat(f)}
            />
          ))}
      </div>

      {/* DESKTOP NEW CHAT (BOTTOM RIGHT INSIDE SIDEBAR) */}
      <div className="hidden md:block absolute bottom-4 right-4">
        <FriendsBubble onOpen={() => setShowFriendsPicker(true)} />
      </div>

      {/* MOBILE NEW CHAT (FLOATING FIXED) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <FriendsBubble onOpen={() => setShowFriendsPicker(true)} />
      </div>

      {/* FRIENDS PICKER MODAL */}
      {showFriendsPicker && (
        <FriendsPicker
          friends={friends}
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
