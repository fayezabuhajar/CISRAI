import mongoose, { Schema } from "mongoose";
import { ISpeaker } from "../types/index";

const speakerSchema = new Schema<ISpeaker>(
  {
    name: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    role: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    title: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    keynote: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    affiliation: {
      en: {
        type: String,
        required: false,
        trim: true,
      },
      ar: {
        type: String,
        required: false,
        trim: true,
      },
    },
    bio: {
      en: {
        type: String,
        trim: true,
      },
      ar: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    photo: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

speakerSchema.index({ order: 1 });

export const Speaker = mongoose.model<ISpeaker>("Speaker", speakerSchema);
