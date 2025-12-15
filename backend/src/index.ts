import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { initSocket } from "./socket";
import { setIO } from "./socketEmitter";

const port = parseInt(process.env.PORT || "5000", 10);
const host =
  process.env.NODE_ENV === "production"
    ? "0.0.0.0"
    : "127.0.0.1";

    
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

setIO(io);       // 🔥 make io globally available
initSocket(io);  // 🔥 init socket logic

server.listen(port, host, () => {
  console.log(`🚀 Server running on http://${host}:${port}`);
});
