import { Router } from "express";
import { body } from "express-validator";
import { registrationController } from "../controllers/registration.controller";
import {
  createParticipantValidator,
  updateParticipantValidator,
} from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { authMiddleware, adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/register",
  createParticipantValidator(),
  handleValidationErrors,
  registrationController.registerParticipant,
);

router.post(
  "/",
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

// Admin: update payment status after manual verification
router.patch(
  "/:id/payment",
  adminAuthMiddleware,
  [
    body("paymentStatus")
      .isIn(["pending", "completed", "cancelled"])
      .withMessage("Invalid payment status"),
    body("paymentMethod")
      .optional()
      .isIn(["bank-transfer", "credit-card", null]),
    body("transactionId").optional().isString(),
  ],
  handleValidationErrors,
  registrationController.updatePaymentStatus,
);

router.get("/", registrationController.getAllParticipants);

router.get("/stats", registrationController.getParticipantStats);

// Admin: delete unpaid participant
router.delete(
  "/:id",
  adminAuthMiddleware,
  registrationController.deleteParticipant,
);

export default router;
