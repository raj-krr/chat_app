
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTM3MDQ2MjcxMmU0M2I2NTMwM2Q3ZjkiLCJlbWFpbCI6Im1yLnJhamt1bWFyMjQ2OEBnbWFpbC5jb20iLCJpYXQiOjE3NjU2Mjk2MzAsImV4cCI6MTc2NTYzMTQzMH0.7ggIWQkuMFZSMWjONN4ylrsnB8Wd9tNGRw1qRNQ9-wA",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

// socket.on("new-message", (data ) => {
//   console.log("📩 New message:", data);
// });
