import mongoose, { Schema } from "mongoose";
import { IAnnouncementDocument } from "../types/index";

const announcementSchema = new Schema<IAnnouncementDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["news", "update", "warning", "reminder"],
      default: "news",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    targetAudience: {
      type: String,
      enum: ["all", "participants", "reviewers", "speakers"],
      default: "all",
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: Date,
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true },
);

export const Announcement = mongoose.model<IAnnouncementDocument>(
  "Announcement",
  announcementSchema,
);
