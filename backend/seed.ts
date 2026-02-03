import mongoose from "mongoose";
import { Admin } from "./src/models/Admin.js";
import { Announcement } from "./src/models/Announcement.js";
import connectDB from "./src/config/database.js";
import { env } from "./src/config/env.js";

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting database seeding...");

    // Clear existing data (optional)
    // await Admin.deleteMany({});
    // await Announcement.deleteMany({});

    // Create default admin user
    const adminExists = await Admin.findOne({ email: env.ADMIN_EMAIL });

    if (!adminExists) {
      const adminUser = new Admin({
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
        firstName: "System",
        lastName: "Administrator",
        role: "super-admin",
        permissions: ["all"],
        isActive: true,
      });

      await adminUser.save();
      console.log("✓ Default admin user created");
      console.log(`  Email: ${env.ADMIN_EMAIL}`);
      console.log(`  Password: ${env.ADMIN_PASSWORD}`);
    } else {
      console.log("✓ Admin user already exists");
    }

    // Create sample announcements
    const sampleAnnouncements = [
      {
        title: "Welcome to CISRAI 2026",
        content:
          "Conference registration is now open. Early bird registration discount available!",
        type: "news",
        priority: "high",
        targetAudience: "all",
        createdBy:
          adminExists?._id ||
          (await Admin.findOne({ email: env.ADMIN_EMAIL }))?._id,
      },
      {
        title: "Paper Submission Deadline Extended",
        content:
          "The paper submission deadline has been extended to April 30, 2026.",
        type: "update",
        priority: "high",
        targetAudience: "participants",
        createdBy:
          adminExists?._id ||
          (await Admin.findOne({ email: env.ADMIN_EMAIL }))?._id,
      },
      {
        title: "Reviewer Recruitment",
        content:
          "We are looking for experienced reviewers. Please submit your application now.",
        type: "reminder",
        priority: "medium",
        targetAudience: "all",
        createdBy:
          adminExists?._id ||
          (await Admin.findOne({ email: env.ADMIN_EMAIL }))?._id,
      },
    ];

    for (const announcement of sampleAnnouncements) {
      const exists = await Announcement.findOne({ title: announcement.title });
      if (!exists) {
        await new Announcement(announcement).save();
        console.log(`✓ Sample announcement created: ${announcement.title}`);
      }
    }

    console.log("\n✨ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("✗ Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
