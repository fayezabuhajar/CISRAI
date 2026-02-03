import mongoose, { Schema } from "mongoose";
import { IParticipant } from "../types/index";

const participantSchema = new Schema<IParticipant>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: "User",
      required: true,
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
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    affiliation: {
      type: String,
      trim: true,
    },
    registrationType: {
      type: String,
      enum: ["onsite-paper", "online-paper", "attendance"],
      required: true,
    },
    paperTitle: String,
    paperFile: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["bank-transfer", "credit-card", null],
    },
    transactionId: String,
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    arrivalDate: Date,
    departureDate: Date,
    dietaryRequirements: String,
    specialNeeds: String,
    certificateGenerated: {
      type: Boolean,
      default: false,
    },
    notes: String,
  },
  { timestamps: true },
);

export const Participant = mongoose.model<IParticipant>(
  "Participant",
  participantSchema,
);
