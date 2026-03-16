// backend/config.js
import dotenv from "dotenv";
dotenv.config();

export const env = {
  // Server
  PORT: parseInt(process.env.PORT || "5000"),
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI",

  // JWT
  JWT_SECRET:
    process.env.JWT_SECRET || "CISRAI_2026_Strong_Secret_Key_32chars_minimum",
  JWT_ADMIN_SECRET:
    process.env.JWT_ADMIN_SECRET ||
    "CISRAI_ADMIN_Strong_Secret_Key_32chars_minimum",
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || "7d",
  JWT_ADMIN_EXPIRE_IN: process.env.JWT_ADMIN_EXPIRE_IN || "24h",

  // Admin Account
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@aau.edu.jo",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "ChangeThisPassword123!",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",

  // Email (اختياري)
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "587"),
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "CISRAI2026@aau.edu.jo",

  // Upload
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "5242880"),
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  RATE_LIMIT_MAX_REQUESTS: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS ||
      (process.env.NODE_ENV === "development" ? "500" : "100"),
  ),

  // Flags
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};
