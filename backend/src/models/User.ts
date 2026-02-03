import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";
import { IUser } from "../types/index";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
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
    phone: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    affiliation: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["participant", "reviewer", "speaker", "committee", "admin"],
      default: "participant",
    },
    registrationPlan: {
      type: String,
      enum: ["onsite-paper", "online-paper", "attendance", null],
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
