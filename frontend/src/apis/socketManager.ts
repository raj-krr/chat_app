import { socket } from "./socket";

let isConnected = false;

export const connectSocket = () => {
  if (!isConnected) {
    socket.connect();
    isConnected = true;
  }
};

export const disconnectSocket = () => {
  if (isConnected) {
    socket.disconnect();
    isConnected = false;
  }
};
