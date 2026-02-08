import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get("/", adminController.getAllAdmins);

// Protected routes
router.get("/profile", authMiddleware, adminController.getProfile);
router.post("/logout", authMiddleware, adminController.logout);

export default router;
