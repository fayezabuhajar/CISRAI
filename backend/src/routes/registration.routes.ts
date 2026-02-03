import { Router } from "express";
import { registrationController } from "../controllers/registration.controller";
import {
  createParticipantValidator,
  updateParticipantValidator,
} from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/register",
  authMiddleware,
  createParticipantValidator(),
  handleValidationErrors,
  registrationController.registerParticipant,
);

router.get(
  "/profile",
  authMiddleware,
  registrationController.getParticipantProfile,
);

router.put(
  "/:id",
  updateParticipantValidator(),
  handleValidationErrors,
  registrationController.updateParticipant,
);

router.get("/", registrationController.getAllParticipants);

router.get("/stats", registrationController.getParticipantStats);

export default router;
