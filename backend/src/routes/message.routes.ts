import { Router } from "express";
import { messageController } from "../controllers/message.controller";
import { submitMessageValidator, idValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  submitMessageValidator(),
  handleValidationErrors,
  messageController.submitMessage,
);

router.get("/", adminAuthMiddleware, messageController.getAllMessages);

router.get(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  messageController.getMessageById,
);

router.post(
  "/:id/reply",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  messageController.replyToMessage,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  messageController.deleteMessage,
);

export default router;
