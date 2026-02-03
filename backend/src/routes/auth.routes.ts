import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { registerValidator, loginValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";

const router = Router();

router.post(
  "/register",
  registerValidator(),
  handleValidationErrors,
  authController.register,
);

router.post(
  "/login",
  loginValidator(),
  handleValidationErrors,
  authController.login,
);

router.get("/profile", authController.getProfile);

export default router;
