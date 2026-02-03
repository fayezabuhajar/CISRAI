import mongoose, { Schema } from "mongoose";
import { ICommittee } from "../types/index";

const committeeSchema = new Schema<ICommittee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: String,
      },
    ],
  },
  { timestamps: true },
);

export const Committee = mongoose.model<ICommittee>(
  "Committee",
  committeeSchema,
);
