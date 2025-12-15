import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export const onlineUsers = new Map<string, string>();

export function initSocket(io: Server) {
  io.use((socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie || "";
      const cookies = cookie.parse(rawCookie);

      const token = cookies.accessToken;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { userId: string };

      socket.data.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId as string;
    console.log("🔥 SOCKET CONNECTED:", userId);

    socket.emit("online-users", Array.from(onlineUsers.keys()));

    onlineUsers.set(userId, socket.id);

    socket.broadcast.emit("user-online", userId);

    socket.on("typing", ({ to }) => {
      const socketId = onlineUsers.get(to);
      if (socketId) {
        io.to(socketId).emit("typing", {
          from: userId,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ SOCKET DISCONNECTED:", userId);

      onlineUsers.delete(userId);

      socket.broadcast.emit("user-offline", {
        userId,
        lastSeen: new Date(),
      });
    });
  });
}
