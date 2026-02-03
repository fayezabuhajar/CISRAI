import { Router } from "express";
import { announcementController } from "../controllers/announcement.controller";
import { adminAuthMiddleware } from "../middleware/auth";
import { idValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";

const router = Router();

router.post(
  "/",
  adminAuthMiddleware,
  announcementController.createAnnouncement,
);

router.get("/", announcementController.getAllAnnouncements);

router.get("/latest", announcementController.getLatestAnnouncements);

router.get(
  "/:id",
  idValidator(),
  handleValidationErrors,
  announcementController.getAnnouncementById,
);

router.put(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  announcementController.updateAnnouncement,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  idValidator(),
  handleValidationErrors,
  announcementController.deleteAnnouncement,
);

export default router;
