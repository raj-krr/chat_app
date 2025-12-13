import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import EmptyState from "../components/dashboard/EmptyState";
import AppNavbar from "../components/layout/AppNavbar";

export default function DashboardPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
<AppNavbar active="home" />
      {/* MAIN WRAPPER */}
      <div className="pt-24 px-4">
        {/* GLASS CONTAINER */}
        <div
          className="
            pointer-events-none
            max-w-7xl mx-auto
            rounded-3xl
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            h-[calc(100vh-7rem)]
            overflow-hidden
          "
        >
          {/* REAL LAYOUT WRAPPER (RE-ENABLE CLICKS) */}
          <div
            className="
              pointer-events-auto
              h-full w-full
              grid grid-cols-1 md:grid-cols-[320px_1fr]
            "
          >
            {/* SIDEBAR */}
            <Sidebar onSelectChat={setSelectedChat} />

            {/* RIGHT PANEL (DESKTOP ONLY) */}
            <div className="hidden md:block">
              {selectedChat ? (
                <ChatWindow
                  chat={selectedChat}
                  onBack={() => setSelectedChat(null)}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN CHAT */}
      {selectedChat && (
        <div className="
          md:hidden fixed inset-0 z-[60]
          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        ">
          <ChatWindow
            chat={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        </div>
      )}
    </div>
  );
}
