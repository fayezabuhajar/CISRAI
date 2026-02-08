import mongoose, { Schema } from "mongoose";
import { ICommittee } from "../types/index";

const committeeSchema = new Schema<ICommittee>(
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
    committee: {
      type: String,
      required: true,
      enum: ["scientific", "preparatory", "media", "technical"],
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
    affiliation: {
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
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

committeeSchema.index({ committee: 1, order: 1 });

export const Committee = mongoose.model<ICommittee>(
  "Committee",
  committeeSchema,
);
