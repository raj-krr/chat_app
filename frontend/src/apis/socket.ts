import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, 
  transports: ["websocket"],
});


socket.on("connect", () => {
  console.log("🟢 socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ socket connect error:", err.message);
});