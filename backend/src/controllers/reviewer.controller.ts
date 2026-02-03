import { Request, Response } from "express";
import { reviewerService } from "../services/reviewer.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";

export const reviewerController = {
  async submitReviewerRequest(req: Request, res: Response) {
    try {
      const reviewer = await reviewerService.createReviewerRequest(req.body);

      res
        .status(201)
        .json(
          successResponse(
            "Reviewer request submitted successfully",
            reviewer,
            201,
          ),
        );
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Submission failed", error.message, 400));
    }
  },

  async getAllReviewers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { reviewers, total } = await reviewerService.getAllReviewers(
        page,
        limit,
      );

      res.status(200).json(
        successResponse("Reviewers retrieved", {
          data: reviewers,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving reviewers", error.message, 500));
    }
  },

  async getReviewerById(req: Request, res: Response) {
    try {
      const reviewer = await reviewerService.getReviewerById(req.params.id);

      res.status(200).json(successResponse("Reviewer retrieved", reviewer));
    } catch (error: any) {
      res
        .status(404)
        .json(errorResponse("Reviewer not found", error.message, 404));
    }
  },

  async approveReviewer(req: Request, res: Response) {
    try {
      const reviewer = await reviewerService.approveReviewer(req.params.id);

      res
        .status(200)
        .json(successResponse("Reviewer approved successfully", reviewer));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Approval failed", error.message, 400));
    }
  },

  async rejectReviewer(req: Request, res: Response) {
    try {
      const { reason } = req.body;
      const reviewer = await reviewerService.rejectReviewer(
        req.params.id,
        reason,
      );

      res.status(200).json(successResponse("Reviewer rejected", reviewer));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Rejection failed", error.message, 400));
    }
  },

  async updateReviewer(req: Request, res: Response) {
    try {
      const reviewer = await reviewerService.updateReviewer(
        req.params.id,
        req.body,
      );

      res
        .status(200)
        .json(successResponse("Reviewer updated successfully", reviewer));
    } catch (error: any) {
      res.status(400).json(errorResponse("Update failed", error.message, 400));
    }
  },

  async deleteReviewer(req: Request, res: Response) {
    try {
      await reviewerService.deleteReviewer(req.params.id);

      res.status(200).json(successResponse("Reviewer deleted successfully"));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", error.message, 400));
    }
  },
};
