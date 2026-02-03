import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server
  PORT: parseInt(process.env.PORT || "5000"),
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/cisrai",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET || "your_admin_jwt_secret_key",
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || "7d",
  JWT_ADMIN_EXPIRE_IN: process.env.JWT_ADMIN_EXPIRE_IN || "24h",

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "587"),
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@cisrai.com",

  // Admin
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@cisrai.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin_password",

  // Upload
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "5242880"),
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  RATE_LIMIT_MAX_REQUESTS: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
  ),

  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};
