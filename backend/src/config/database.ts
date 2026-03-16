// backend/connectDB.js
import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(
      "✗ MongoDB Connection Error:",
      error instanceof Error ? error.message : error,
    );
    console.log(
      "⚠️  Server will start without database connection. Retrying in background...",
    );

    // Retry connection in background
    setTimeout(() => {
      console.log("🔄 Retrying MongoDB connection...");
      connectDB();
    }, 10000);

    return null;
  }
};

export default connectDB;
