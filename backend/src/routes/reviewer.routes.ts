import { Router } from "express";
import { reviewerController } from "../controllers/reviewer.controller";
import { createReviewerValidator, idValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  createReviewerValidator(),
  handleValidationErrors,
  reviewerController.submitReviewerRequest,
);

router.get("/", reviewerController.getAllReviewers);

router.get(
  "/:id",
  idValidator(),
  handleValidationErrors,
  reviewerController.getReviewerById,
);

router.put(
  "/:id",
  idValidator(),
  handleValidationErrors,
  reviewerController.updateReviewer,
);

router.post(
  "/:id/approve",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  reviewerController.approveReviewer,
);

router.post(
  "/:id/reject",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  reviewerController.rejectReviewer,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  reviewerController.deleteReviewer,
);

export default router;
