import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

// Public route - anyone can get venue settings
router.get("/venue", settingsController.getVenue);

// Public route - anyone can get important dates
router.get("/important-dates", settingsController.getImportantDates);

// Public route - anyone can get patron name
router.get("/patron-name", settingsController.getPatronName);

// Public route - anyone can get sponsors
router.get("/sponsors", settingsController.getSponsors);

// Protected routes - only admins can update
router.get("/", adminAuthMiddleware, settingsController.getSettings);
router.put("/venue", adminAuthMiddleware, settingsController.updateVenue);
router.put(
  "/important-dates",
  adminAuthMiddleware,
  settingsController.updateImportantDates,
);
router.put(
  "/patron-name",
  adminAuthMiddleware,
  settingsController.updatePatronName,
);
router.put("/sponsors", adminAuthMiddleware, settingsController.updateSponsors);

export default router;
