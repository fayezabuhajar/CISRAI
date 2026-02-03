import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/index";

const messageSchema = new Schema<IMessage>(
  {
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    senderEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    attachments: [String],
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    response: String,
    respondedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    respondedAt: Date,
  },
  { timestamps: true },
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
