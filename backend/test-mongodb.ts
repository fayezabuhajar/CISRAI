#!/usr/bin/env ts-node
/**
 * MongoDB Connection Tester
 * Tests if MongoDB is accessible and working
 */

import mongoose from "mongoose";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  bold: "\x1b[1m",
};

async function testMongoDB() {
  console.log(
    `\n${colors.blue}${colors.bold}🧪 MongoDB Connection Test${colors.reset}\n`,
  );

  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/cisrai";

  console.log(
    `Testing connection to: ${colors.blue}${mongoUri}${colors.reset}\n`,
  );

  try {
    console.log("Attempting connection...");

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });

    console.log(
      `${colors.green}✓ MongoDB Connected Successfully!${colors.reset}\n`,
    );
    console.log(`${colors.bold}Connection Details:${colors.reset}`);
    console.log(`  Host: ${conn.connection.host}`);
    console.log(`  Port: ${conn.connection.port}`);
    console.log(`  Database: ${conn.connection.name}`);
    console.log(
      `  State: ${conn.connection.readyState === 1 ? "Connected" : "Disconnected"}\n`,
    );

    // Test write
    console.log(`${colors.bold}Testing basic operations...${colors.reset}`);

    const testCollection = conn.connection.collection("test_connection");
    const result = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: "Connection test successful",
    });

    console.log(`${colors.green}✓ Write Test: Success${colors.reset}`);
    console.log(`  Document ID: ${result.insertedId}\n`);

    // Cleanup
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log(`${colors.green}✓ Cleanup: Success${colors.reset}\n`);

    console.log(
      `${colors.green}${colors.bold}✅ All Tests Passed!${colors.reset}`,
    );
    console.log(`${colors.green}MongoDB is ready for use.${colors.reset}\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`${colors.red}✗ MongoDB Connection Failed${colors.reset}\n`);
    console.log(`${colors.bold}Error:${colors.reset} ${errorMessage}\n`);

    if (errorMessage.includes("ECONNREFUSED")) {
      console.log(`${colors.yellow}${colors.bold}💡 Solution:${colors.reset}`);
      console.log(`  MongoDB is not running. Try one of these:\n`);
      console.log(
        `  ${colors.blue}Option 1: Start MongoDB locally${colors.reset}`,
      );
      console.log(
        `    - Windows Services: services.msc → Start "MongoDB Server"`,
      );
      console.log(`    - Command: net start MongoDB`);
      console.log(`    - Or use MongoDB Compass app\n`);

      console.log(
        `  ${colors.blue}Option 2: Use MongoDB Atlas (Cloud)${colors.reset}`,
      );
      console.log(`    - Go to: https://www.mongodb.com/cloud/atlas`);
      console.log(`    - Create free cluster`);
      console.log(`    - Get connection string`);
      console.log(`    - Update MONGODB_URI in .env\n`);

      console.log(
        `  ${colors.blue}Option 3: Check installation${colors.reset}`,
      );
      console.log(
        `    - Download: https://www.mongodb.com/try/download/community`,
      );
      console.log(`    - Install and run installer\n`);
    }

    if (errorMessage.includes("authentication failed")) {
      console.log(`${colors.yellow}${colors.bold}💡 Solution:${colors.reset}`);
      console.log(`  Check your MongoDB credentials in .env file\n`);
    }

    console.log(
      `${colors.yellow}Read MONGODB_SETUP.md for detailed instructions${colors.reset}\n`,
    );

    process.exit(1);
  }
}

testMongoDB();
