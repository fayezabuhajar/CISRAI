import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";

// Import Routes
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import registrationRoutes from "./routes/registration.routes";
import reviewerRoutes from "./routes/reviewer.routes";
import speakerRoutes from "./routes/speaker.routes";
import paperRoutes from "./routes/paper.routes";
import messageRoutes from "./routes/message.routes";
import scheduleRoutes from "./routes/schedule.routes";
import committeeRoutes from "./routes/committee.routes";
import announcementRoutes from "./routes/announcement.routes";
import dashboardRoutes from "./routes/dashboard.routes";

// Import Middleware
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth";

const app: Express = express();

// Security Middleware
app.use(helmet());

// CORS
const allowedOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const localOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (env.isDev && localOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Compression
app.use(compression());

// Logging
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
});
app.use("/api/", limiter);

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/reviewers", reviewerRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler (must be last)
app.use(errorHandler);

export default app;
