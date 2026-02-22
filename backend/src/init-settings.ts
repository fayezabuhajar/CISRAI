import mongoose from "mongoose";
import { env } from "./config/env";
import Settings from "./models/Settings";

const initializeSettings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if settings already exist
    const existingSettings = await Settings.findOne();

    if (existingSettings) {
      console.log("ℹ️  Settings already exist. Skipping initialization.");
      return;
    }

    // Create default settings
    const defaultSettings = new Settings({
      venue: {
        nameEn: "Amman Arab University",
        nameAr: "جامعة عمان العربية",
        addressEn: "Jordan Street, Mobis, Amman, Jordan",
        addressAr: "شارع الأردن، موبص، عمان، الأردن",
        aboutEn:
          "Amman Arab University (AAU) is a leading institution in Jordan, committed to academic excellence and scientific research. The campus provides a modern and inspiring environment for scholars to share knowledge and foster innovation in Islamic sciences.",
        aboutAr:
          "تعد جامعة عمان العربية مؤسسة رائدة في الأردن، ملتزمة بالتميز الأكاديمي والبحث العلمي. يوفر الحرم الجامعي بيئة حديثة وملهمة للعلماء لتبادل المعرفة وتعزيز الابتكار في العلوم الشرعية.",
        phone: "+962 6 4790222",
        email: "info@aau.edu.jo",
        mapUrl: "https://maps.app.goo.gl/EvfuXJJCKszZdu3e9",
      },
    });

    await defaultSettings.save();
    console.log("✅ Default settings created successfully");
  } catch (error) {
    console.error("❌ Error initializing settings:", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
  }
};

// Run the initialization
initializeSettings();
