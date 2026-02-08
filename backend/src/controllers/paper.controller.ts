import { Request, Response } from "express";
import { paperService } from "../services/paper.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const paperController = {
  async submitPaper(req: Request, res: Response) {
    try {
      const paper = await paperService.submitPaper(req.body);

      res
        .status(201)
        .json(successResponse("Paper submitted successfully", paper, 201));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Submission failed", getErrorMessage(error), 400));
    }
  },

  async getAllPapers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string | undefined;

      const { papers, total } = await paperService.getAllPapers(
        page,
        limit,
        status,
      );

      res.status(200).json(
        successResponse("Papers retrieved", {
          data: papers,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving papers", getErrorMessage(error), 500),
        );
    }
  },

  async getPaperById(req: Request, res: Response) {
    try {
      const paper = await paperService.getPaperById(req.params.id);

      res.status(200).json(successResponse("Paper retrieved", paper));
    } catch (error: unknown) {
      res
        .status(404)
        .json(errorResponse("Paper not found", getErrorMessage(error), 404));
    }
  },

  async acceptPaper(req: Request, res: Response) {
    try {
      const paper = await paperService.acceptPaper(req.params.id);

      res
        .status(200)
        .json(successResponse("Paper accepted successfully", paper));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Acceptance failed", getErrorMessage(error), 400));
    }
  },

  async rejectPaper(req: Request, res: Response) {
    try {
      const { reason } = req.body;
      const paper = await paperService.rejectPaper(req.params.id, reason);

      res.status(200).json(successResponse("Paper rejected", paper));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Rejection failed", getErrorMessage(error), 400));
    }
  },

  async deletePaper(req: Request, res: Response) {
    try {
      await paperService.deletePaper(req.params.id);

      res.status(200).json(successResponse("Paper deleted successfully"));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", getErrorMessage(error), 400));
    }
  },
};
