import mongoose, { Schema } from "mongoose";
import { ISpeaker } from "../types/index";

const speakerSchema = new Schema<ISpeaker>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    photo: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String,
    },
    presentationTopic: {
      type: String,
      required: true,
    },
    presentationDuration: {
      type: Number,
      required: true,
    },
    presentationFile: String,
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    status: {
      type: String,
      enum: ["invited", "confirmed", "declined"],
      default: "invited",
    },
  },
  { timestamps: true },
);

export const Speaker = mongoose.model<ISpeaker>("Speaker", speakerSchema);
