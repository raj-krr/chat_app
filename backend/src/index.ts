import http from "http";
import app from "./app";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const port = parseInt(process.env.PORT || "5000", 10);
const host =
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

export const onlineUsers = new Map<string, string>(); 


io.use((socket, next) => {
  try {
    const auth = socket.handshake.auth;
    console.log("SOCKET AUTH PAYLOAD:", auth);

    const token = auth?.token;
    if (!token) {
      console.log("❌ No token provided");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string };

    socket.data.userId = decoded.userId;
    console.log("✅ Socket authenticated:", decoded.userId);

    next();
  } catch (err) {
    console.log("❌ Socket auth error:", err);
    next(new Error("Unauthorized"));
  }
});


io.on("connection", (socket) => {
  const userId = socket.data.userId as string;

  onlineUsers.set(userId, socket.id);
  io.emit("user-online", userId);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("user-offline", userId);
  });
});


server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
