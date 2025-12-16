import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ChatWindow from "../components/chat/components/ChatWindow";
import EmptyState from "../components/dashboard/EmptyState";
import AppNavbar from "../components/layout/AppNavbar";

export default function DashboardPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const isMobileChatOpen = Boolean(selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="hidden md:block">
  <AppNavbar />
</div>


      <div className="pt-24 px-4">
        <div
          className="
            max-w-7xl mx-auto
            h-[calc(100vh-7rem)]
            rounded-3xl
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            overflow-hidden
          "
        >
          {/* MAIN GRID */}
          <div className="h-full grid grid-cols-1 md:grid-cols-[320px_1fr]">

            {/* SIDEBAR */}
            <div className={`${isMobileChatOpen ? "hidden md:block" : ""}`}>
              <Sidebar onSelectChat={setSelectedChat} />
            </div>

            {/* CHAT AREA */}
            <div className="hidden md:flex flex-col h-full">
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

      {/* MOBILE CHAT FULLSCREEN */}
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
