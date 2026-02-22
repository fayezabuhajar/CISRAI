import mongoose from "mongoose";
import { Committee } from "./src/models/Committee";
import { DEFAULT_COMMITTEES } from "./src/constants/defaultCommittees";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/islamic-conference";

async function seedCommittees() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // حذف جميع اللجان الموجودة
    console.log("🗑️  Clearing existing committees...");
    await Committee.deleteMany({});
    console.log("✅ Cleared all committees");

    // إضافة اللجان الافتراضية
    console.log("📝 Inserting default committees...");

    const committeesToInsert = DEFAULT_COMMITTEES.map((committee) => ({
      name: committee.name,
      committee: committee.committee,
      title: committee.title,
      affiliation: committee.affiliation,
      email: committee.email,
      order: committee.order,
    }));

    await Committee.insertMany(committeesToInsert);
    console.log(
      `✅ Successfully inserted ${committeesToInsert.length} committees`,
    );

    // عرض إحصائيات
    const counts = await Promise.all([
      Committee.countDocuments({ committee: "scientific" }),
      Committee.countDocuments({ committee: "preparatory" }),
      Committee.countDocuments({ committee: "media" }),
      Committee.countDocuments({ committee: "technical" }),
    ]);

    console.log("\n📊 Committee Statistics:");
    console.log(`   - Scientific Committee: ${counts[0]} members`);
    console.log(`   - Preparatory Committee: ${counts[1]} members`);
    console.log(`   - Media Committee: ${counts[2]} members`);
    console.log(`   - Technical Committee: ${counts[3]} members`);
    console.log(`   - Total: ${counts.reduce((a, b) => a + b, 0)} members`);

    console.log("\n✨ Committees seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding committees:", error);
    process.exit(1);
  }
}

seedCommittees();
