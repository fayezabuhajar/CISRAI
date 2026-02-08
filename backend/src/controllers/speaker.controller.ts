import { Request, Response } from "express";
import { speakerService } from "../services/speaker.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const speakerController = {
  async createSpeaker(req: Request, res: Response) {
    try {
      const speaker = await speakerService.createSpeaker(req.body);

      res
        .status(201)
        .json(successResponse("Speaker created successfully", speaker, 201));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Creation failed", getErrorMessage(error), 400));
    }
  },

  async getAllSpeakers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { speakers, total } = await speakerService.getAllSpeakers(
        page,
        limit,
      );

      res.status(200).json(
        successResponse("Speakers retrieved", {
          data: speakers,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse(
            "Error retrieving speakers",
            getErrorMessage(error),
            500,
          ),
        );
    }
  },

  async getSpeakerById(req: Request, res: Response) {
    try {
      const speaker = await speakerService.getSpeakerById(req.params.id);

      res.status(200).json(successResponse("Speaker retrieved", speaker));
    } catch (error: unknown) {
      res
        .status(404)
        .json(errorResponse("Speaker not found", getErrorMessage(error), 404));
    }
  },

  async updateSpeaker(req: Request, res: Response) {
    try {
      const speaker = await speakerService.updateSpeaker(
        req.params.id,
        req.body,
      );

      res
        .status(200)
        .json(successResponse("Speaker updated successfully", speaker));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Update failed", getErrorMessage(error), 400));
    }
  },

  async deleteSpeaker(req: Request, res: Response) {
    try {
      await speakerService.deleteSpeaker(req.params.id);

      res.status(200).json(successResponse("Speaker deleted successfully"));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", getErrorMessage(error), 400));
    }
  },

  async confirmSpeaker(req: Request, res: Response) {
    try {
      const speaker = await speakerService.confirmSpeaker(req.params.id);

      res
        .status(200)
        .json(successResponse("Speaker confirmed successfully", speaker));
    } catch (error: unknown) {
      res
        .status(400)
        .json(
          errorResponse("Confirmation failed", getErrorMessage(error), 400),
        );
    }
  },
};
