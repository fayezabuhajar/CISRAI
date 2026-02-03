import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";
import { adminAuthMiddleware } from "../middleware/auth";

const router = Router();

router.use(adminAuthMiddleware);

router.get("/stats/overview", dashboardController.getOverviewStats);
router.get("/stats/payment", dashboardController.getPaymentStats);
router.get("/stats/papers", dashboardController.getPaperStats);
router.get("/stats/reviewers", dashboardController.getReviewerStats);
router.get("/activity/recent", dashboardController.getRecentActivity);
router.get(
  "/analytics/countries",
  dashboardController.getCountriesDistribution,
);

export default router;
