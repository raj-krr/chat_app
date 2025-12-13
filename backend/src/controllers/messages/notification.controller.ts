import { Request, Response } from "express";
import Notification from "../../models/notification.modal";

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const notifications = await Notification.find({ user: userId })
      .populate("actor", "username avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const notificationId = req.params.id;

    await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Notification marked as read",
    });
  } catch (error) {
    console.error("READ NOTIFICATION ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
