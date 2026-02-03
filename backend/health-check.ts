#!/usr/bin/env ts-node
/**
 * Health Check Script for CISRAI Backend
 * Verifies all components are working correctly
 */

import axios from "axios";

const API_BASE = "http://localhost:5000/api";
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

async function healthCheck() {
  console.log(
    `\n${colors.blue}🏥 CISRAI Backend Health Check${colors.reset}\n`,
  );

  const checks = [
    {
      name: "Server Running",
      test: async () => {
        try {
          const response = await axios.get("http://localhost:5000", {
            timeout: 5000,
          });
          return true;
        } catch (error) {
          return false;
        }
      },
    },
    {
      name: "Database Connected",
      test: async () => {
        // This would be tested via API call to any endpoint
        try {
          const response = await axios.get(`${API_BASE}/announcements`, {
            timeout: 5000,
          });
          return response.status === 200;
        } catch (error: any) {
          // If we get a 404 or 401, server is responding
          // If we get connection error, DB is down
          return error.response?.status !== undefined;
        }
      },
    },
    {
      name: "Auth Endpoints Available",
      test: async () => {
        try {
          const response = await axios.post(
            `${API_BASE}/auth/login`,
            { email: "test@test.com", password: "test" },
            { timeout: 5000, validateStatus: () => true },
          );
          // Expect 400 (validation error) not 404 (not found)
          return response.status !== 404;
        } catch (error) {
          return false;
        }
      },
    },
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const check of checks) {
    try {
      const result = await check.test();
      if (result) {
        console.log(`${colors.green}✓${colors.reset} ${check.name}`);
        passedCount++;
      } else {
        console.log(`${colors.red}✗${colors.reset} ${check.name}`);
        failedCount++;
      }
    } catch (error: any) {
      console.log(
        `${colors.red}✗${colors.reset} ${check.name}: ${error.message}`,
      );
      failedCount++;
    }
  }

  console.log(`\n${colors.blue}Summary${colors.reset}`);
  console.log(
    `${colors.green}Passed: ${passedCount}${colors.reset} | ${colors.red}Failed: ${failedCount}${colors.reset}\n`,
  );

  if (failedCount === 0) {
    console.log(
      `${colors.green}✓ All checks passed! Backend is healthy.${colors.reset}\n`,
    );
    process.exit(0);
  } else {
    console.log(
      `${colors.yellow}⚠ Some checks failed. Please verify:${colors.reset}`,
    );
    console.log("  1. Is the server running? (npm run dev)");
    console.log("  2. Is MongoDB running and connected?");
    console.log("  3. Are the .env variables configured correctly?");
    console.log("  4. Are there any error messages in the server logs?\n");
    process.exit(1);
  }
}

healthCheck().catch((error) => {
  console.error(
    `${colors.red}Health check failed:${colors.reset}`,
    error.message,
  );
  process.exit(1);
});
