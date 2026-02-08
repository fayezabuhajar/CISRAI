import { Router } from "express";
import { speakerController } from "../controllers/speaker.controller";
import {
  createSpeakerValidator,
  updateSpeakerValidator,
  idValidator,
} from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  adminAuthMiddleware,
  createSpeakerValidator(),
  handleValidationErrors,
  speakerController.createSpeaker,
);

router.get("/", speakerController.getAllSpeakers);

router.get(
  "/:id",
  idValidator(),
  handleValidationErrors,
  speakerController.getSpeakerById,
);

router.put(
  "/:id",
  adminAuthMiddleware,
  updateSpeakerValidator(),
  idValidator(),
  handleValidationErrors,
  speakerController.updateSpeaker,
);

router.post(
  "/:id/confirm",
  idValidator(),
  handleValidationErrors,
  speakerController.confirmSpeaker,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  speakerController.deleteSpeaker,
);

export default router;
