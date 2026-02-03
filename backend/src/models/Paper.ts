import mongoose, { Schema } from "mongoose";
import { IPaper } from "../types/index";

const paperSchema = new Schema<IPaper>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    keywords: [String],
    authors: [
      {
        name: String,
        email: String,
        affiliation: String,
      },
    ],
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    file: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["submitted", "under-review", "accepted", "rejected"],
      default: "submitted",
    },
    reviewScore: Number,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    acceptanceDate: Date,
    rejectionReason: String,
  },
  { timestamps: true },
);

export const Paper = mongoose.model<IPaper>("Paper", paperSchema);
