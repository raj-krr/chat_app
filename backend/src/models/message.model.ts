import mongoose from "mongoose";
import { Types, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text?: string;
    file?: string;
    isRead?: boolean;
}


const messageSchema = new mongoose.Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: { type: String },
    file: { type: String },
   isRead: {
  type: Boolean,
  default: false,
}

}, { timestamps: true },

);

const MessageModal = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModal;