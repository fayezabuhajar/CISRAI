import { Request, Response } from "express";
import { registrationService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";
import { Participant } from "../models/Participant";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const registrationController = {
  async registerParticipant(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body;
      const participant = await registrationService.registerParticipant(
        req.user!.id,
        data,
      );

      res
        .status(201)
        .json(
          successResponse(
            "Participant registered successfully",
            participant,
            201,
          ),
        );
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Registration failed", error.message, 400));
    }
  },

  async getParticipantProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const participant = await registrationService.getParticipantByUserId(
        req.user!.id,
      );

      if (!participant) {
        return res
          .status(404)
          .json(errorResponse("Participant not found", "", 404));
      }

      res
        .status(200)
        .json(successResponse("Participant profile retrieved", participant));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving profile", error.message, 500));
    }
  },

  async updateParticipant(req: AuthenticatedRequest, res: Response) {
    try {
      const participantId = req.params.id;
      const updatedParticipant = await registrationService.updateParticipant(
        participantId,
        req.body,
      );

      res
        .status(200)
        .json(
          successResponse(
            "Participant updated successfully",
            updatedParticipant,
          ),
        );
    } catch (error: any) {
      res.status(400).json(errorResponse("Update failed", error.message, 400));
    }
  },

  async getAllParticipants(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { skip } = getPaginationParams(page, limit);

      const [participants, total] = await Promise.all([
        Participant.find().skip(skip).limit(limit),
        Participant.countDocuments(),
      ]);

      res.status(200).json(
        successResponse("Participants retrieved", {
          data: participants,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: any) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving participants", error.message, 500),
        );
    }
  },

  async getParticipantStats(req: Request, res: Response) {
    try {
      const stats = {
        totalParticipants: await Participant.countDocuments(),
        onsiteWithPaper: await Participant.countDocuments({
          registrationType: "onsite-paper",
        }),
        onlineWithPaper: await Participant.countDocuments({
          registrationType: "online-paper",
        }),
        attendanceOnly: await Participant.countDocuments({
          registrationType: "attendance",
        }),
        paymentCompleted: await Participant.countDocuments({
          paymentStatus: "completed",
        }),
      };

      res.status(200).json(successResponse("Stats retrieved", stats));
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving stats", error.message, 500));
    }
  },
};
