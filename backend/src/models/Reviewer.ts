import mongoose, { Schema } from "mongoose";
import { IReviewer } from "../types/index";

const reviewerSchema = new Schema<IReviewer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    affiliation: {
      type: String,
      required: true,
      trim: true,
    },
    expertise: [String],
    experience: {
      type: Number,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    cv: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedDate: Date,
    rejectedReason: String,
    paperAssignments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Paper",
      },
    ],
  },
  { timestamps: true },
);

export const Reviewer = mongoose.model<IReviewer>("Reviewer", reviewerSchema);
