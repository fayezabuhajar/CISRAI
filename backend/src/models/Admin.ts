import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import { IAdmin } from "../types/index";

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
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
    role: {
      type: String,
      enum: ["super-admin", "admin", "moderator"],
      default: "admin",
    },
    permissions: [String],
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
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
adminSchema.methods.comparePassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
