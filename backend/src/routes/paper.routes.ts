import { Router } from "express";
import { paperController } from "../controllers/paper.controller";
import { submitPaperValidator, idValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  submitPaperValidator(),
  handleValidationErrors,
  paperController.submitPaper,
);

router.get("/", paperController.getAllPapers);

router.get(
  "/:id",
  idValidator(),
  handleValidationErrors,
  paperController.getPaperById,
);

router.post(
  "/:id/accept",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  paperController.acceptPaper,
);

router.post(
  "/:id/reject",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  paperController.rejectPaper,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  paperController.deletePaper,
);

export default router;
