import { Request, Response } from "express";
import UserMOdel from "../../models/user.model";
import MessageModal from "../../models/message.model";
import fs from "fs";
import path from "path";
import { s3 } from "../../libs/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Types } from "mongoose";
import { io,onlineUsers } from "../..";

export const getMyFriends = async (req: Request, res: Response) => {
  try {
    const myId = req.user?.userId;

    const me = await UserMOdel.findById(myId).select("friends");
    if (!me) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const friends = await UserMOdel.find({
      _id: { $in: me.friends }
    }).select("-password -refreshToken");

    return res.status(200).json({
      success: true,
      msg: "Fetched friends",
      users: friends
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const getChatList = async (req: Request, res: Response) => {
  try {
    const myId = new Types.ObjectId(req.user!.userId);

    const chats = await MessageModal.aggregate([
      // 1️⃣ Only messages involving me
      {
        $match: {
          $or: [
            { senderId: myId },
            { receiverId: myId },
          ],
        },
      },

      // 2️⃣ Determine the other user
      {
        $addFields: {
          otherUser: {
            $cond: [
              { $eq: ["$senderId", myId] },
              "$receiverId",
              "$senderId",
            ],
          },
        },
      },

      // 3️⃣ Sort latest messages first
      { $sort: { createdAt: -1 } },

      // 4️⃣ Group by other user
      {
        $group: {
          _id: "$otherUser",

          // latest message
          lastMessage: { $first: "$$ROOT" },

          // 🔥 unread count
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiverId", myId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      // 5️⃣ Sort chats by last message time
      {
        $sort: {
          "lastMessage.createdAt": -1,
        },
      },
    ]);

    // 6️⃣ Fetch user details
    const userIds = chats.map((c) => c._id);

    const users = await UserMOdel.find({
      _id: { $in: userIds },
    }).select("username avatar");

    const userMap = new Map(
      users.map((u) => [u._id.toString(), u])
    );

    // 7️⃣ Build final response
    const chatList = chats.map((chat) => {
      const user = userMap.get(chat._id.toString());

      return {
        user,
        lastMessage: {
          text: chat.lastMessage.text,
          file: chat.lastMessage.file,
          senderId: chat.lastMessage.senderId,
          createdAt: chat.lastMessage.createdAt,
        },
        unreadCount: chat.unreadCount,
        lastMessageAt: chat.lastMessage.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      chats: chatList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.chatUsers!;

    const messages = await MessageModal.find({
      $or: [
        { senderId: sender._id, receiverId: receiver._id },
        { senderId: receiver._id, receiverId: sender._id },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      msg: "Messages fetched",
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const sendMessages = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const { sender, receiver } = req.chatUsers!;

    const allowedMimesTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-matroska",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    let fileUrl: string | undefined;

    if (req.file) {
      if (!allowedMimesTypes.includes(req.file.mimetype)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          msg: "File type not allowed",
        });
      }

      const fileExt = path.extname(req.file.originalname);
      const fileKey = `user-messages/${sender}/${receiver}-${Date.now()}${fileExt}`;
      const fileContent = fs.readFileSync(req.file.path);

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileKey,
          Body: fileContent,
          ContentType: req.file.mimetype,
        })
      );

      fs.unlinkSync(req.file.path);

      fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }


    if (!text && !fileUrl) {
      return res.status(400).json({
        success: false,
        msg: "Message must contain text or file",
      });
    }

    const message = await MessageModal.create({
      senderId: sender._id,
      receiverId: receiver._id,
      text,
      file: fileUrl,
    });
      const receiverSocketId = onlineUsers.get(receiver._id.toString());

if (receiverSocketId) {
  io.to(receiverSocketId).emit("new-message", {
    message,
  });

  io.to(receiverSocketId).emit("unread-update", {
    from: sender._id,
  });
}

    return res.status(200).json({
      success: true,
      msg: "Message sent successfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const markMessagesAsRead = async (req: Request, res: Response) => {
  const myId = req.user!.userId;
  const friendId = req.params.id;

  await MessageModal.updateMany(
    {
      senderId: friendId,
      receiverId: myId,
      isRead: false,
    },
    { $set: { isRead: true } }
  );

  return res.json({
    success: true,
    msg: "Messages marked as read",
  });
};

export const clearChat = async (req: Request, res: Response) => {
  const myId = req.user!.userId;
  const friendId = req.params.id;

  await MessageModal.deleteMany({
    $or: [
      { senderId: myId, receiverId: friendId },
      { senderId: friendId, receiverId: myId },
    ],
  });

  return res.json({
    success: true,
    msg: "Chat cleared",
  });
};


