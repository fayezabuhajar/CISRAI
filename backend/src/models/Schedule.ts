import mongoose, { Schema } from "mongoose";
import { ISchedule } from "../types/index";

const scheduleSchema = new Schema<ISchedule>(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    speaker: {
      type: Schema.Types.ObjectId,
      ref: "Speaker",
    },
    room: String,
    eventType: {
      type: String,
      enum: ["keynote", "session", "break", "social", "workshop"],
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true },
);

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
