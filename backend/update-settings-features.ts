import mongoose from "mongoose";
import Settings from "./src/models/Settings";
import dotenv from "dotenv";

dotenv.config();

const updateSettingsFeatures = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/cisrai",
    );
    console.log("✅ Connected to MongoDB");

    // Get settings
    const settings = await Settings.findOne();

    if (!settings) {
      console.log("❌ No settings found");
      process.exit(1);
    }

    // Check if features already exist
    if (settings.venue.features && settings.venue.features.length > 0) {
      console.log("ℹ️  Features already exist. Current features:");
      settings.venue.features.forEach((f: any, i: number) => {
        console.log(`  ${i + 1}. ${f.en} / ${f.ar}`);
      });
    } else {
      // Add default features
      settings.venue.features = [
        { en: "Main Conference Auditoriums", ar: "قاعات المؤتمرات الرئيسية" },
        { en: "Modern Research Labs", ar: "مختبرات بحثية حديثة" },
        { en: "High-speed Academic Network", ar: "شبكة أكاديمية عالية السرعة" },
        {
          en: "A Mosque within the University Campus",
          ar: "مسجد داخل الحرم الجامعي",
        },
        { en: "Scientific Exhibition Areas", ar: "مساحات للمعارض العلمية" },
        { en: "Catering & Dining Facilities", ar: "مرافق الإطعام والضيافة" },
      ];

      await settings.save();
      console.log("✅ Features added successfully!");
      console.log("📋 Added features:");
      settings.venue.features.forEach((f: any, i: number) => {
        console.log(`  ${i + 1}. ${f.en} / ${f.ar}`);
      });
    }

    // Disconnect
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

updateSettingsFeatures();
