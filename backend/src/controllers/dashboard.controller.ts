import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";
import { successResponse, errorResponse } from "../utils/response";

export const dashboardController = {
  async getOverviewStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getOverviewStats();
      res.status(200).json(successResponse("Overview stats retrieved", stats));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving stats", error.message, 500));
    }
  },

  async getRecentActivity(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activity = await dashboardService.getRecentActivity(limit);
      res
        .status(200)
        .json(successResponse("Recent activity retrieved", activity));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving activity", error.message, 500));
    }
  },

  async getPaymentStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getPaymentStats();
      res.status(200).json(successResponse("Payment stats retrieved", stats));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving stats", error.message, 500));
    }
  },

  async getPaperStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getPaperStats();
      res.status(200).json(successResponse("Paper stats retrieved", stats));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving stats", error.message, 500));
    }
  },

  async getReviewerStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getReviewerStats();
      res.status(200).json(successResponse("Reviewer stats retrieved", stats));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving stats", error.message, 500));
    }
  },

  async getCountriesDistribution(req: Request, res: Response) {
    try {
      const distribution = await dashboardService.getCountriesDistribution();
      res
        .status(200)
        .json(
          successResponse("Countries distribution retrieved", distribution),
        );
    } catch (error: any) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving distribution", error.message, 500),
        );
    }
  },
};
