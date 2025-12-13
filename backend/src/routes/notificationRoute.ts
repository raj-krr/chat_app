import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getMyNotifications,
  markNotificationRead,
} from "../controllers/messages/notification.controller";

const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);
router.post("/read/:id", authMiddleware, markNotificationRead);

export default router;
