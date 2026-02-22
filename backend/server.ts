const requireModule = async (path: string) => {
  const module = await import(path);
  return module.default || module;
};

(async () => {
  try {
    const app = await requireModule("./src/app");
    const connectDB = await requireModule("./src/config/database");
    const { env } = await import("./src/config/env");

    // Try to connect to Database (non-blocking)
    connectDB().catch((error: Error) => {
      console.error("Database connection will retry in background");
    });

    // Start Server immediately
    app.listen(env.PORT, () => {
      console.log(`
╔════════════════════════════════════╗
║  CISRAI Backend Server Started     ║
║  🚀 http://localhost:${env.PORT}       ║
║  Environment: ${env.NODE_ENV.toUpperCase().padEnd(23)}║
╚════════════════════════════════════╝
      `);
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });

    // Handle Uncaught Exceptions
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
