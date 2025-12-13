import express from "express";
import {clearChat, getChatList,getMessages,getMyFriends,markMessagesAsRead,sendMessages} from "../controllers/messages/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../libs/multer";
const router = express.Router();
import { chatPermissionMiddleware } from "../middlewares/chatPermission.middleware";


router.get("/chats", authMiddleware, getChatList);
router.get("/chat/:id", authMiddleware,chatPermissionMiddleware, getMessages);
router.post("/chat/read/:id", authMiddleware,chatPermissionMiddleware, markMessagesAsRead);
router.post("/send/:id", authMiddleware, chatPermissionMiddleware, upload.single("file"), sendMessages);
router.delete("/chat/:id", authMiddleware,chatPermissionMiddleware, clearChat);
export default router;