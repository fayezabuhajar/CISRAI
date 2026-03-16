// Simple MongoDB connection test
require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI";

console.log("\n🧪 Testing MongoDB Connection...\n");
console.log("URI:", MONGODB_URI.replace(/:[^:@]+@/, ":****@")); // Hide password
console.log("\nConnecting...\n");

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
  })
  .then((conn) => {
    console.log("✅ SUCCESS! MongoDB Connected!\n");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);
    console.log(
      "State:",
      conn.connection.readyState === 1 ? "Connected" : "Disconnected",
    );
    console.log("\n✅ الاتصال يعمل بشكل صحيح!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ FAILED! Connection Error:\n");
    console.error(error.message);
    console.log("\n❌ فشل الاتصال - تحتاج تحديث username و password!\n");
    console.log("راجع ملف MONGODB_FIX.md للتعليمات\n");
    process.exit(1);
  });

// Timeout after 15 seconds
setTimeout(() => {
  console.log("⏱️  Timeout - الاتصال استغرق وقت طويل");
  process.exit(1);
}, 15000);
