import { Request, Response } from "express";
import { registrationService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";
import { Participant } from "../models/Participant";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const registrationController = {
  async registerParticipant(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body;
      const participant = await registrationService.registerParticipant(
        req.user?.id,
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
    } catch (error: unknown) {
      res
        .status(400)
        .json(
          errorResponse("Registration failed", getErrorMessage(error), 400),
        );
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
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse(
            "Error retrieving profile",
            getErrorMessage(error),
            500,
          ),
        );
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
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Update failed", getErrorMessage(error), 400));
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
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse(
            "Error retrieving participants",
            getErrorMessage(error),
            500,
          ),
        );
    }
  },

  async updatePaymentStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const participantId = req.params.id;
      const { paymentStatus, paymentMethod, transactionId } = req.body;

      const updatedParticipant = await registrationService.updateParticipant(
        participantId,
        {
          paymentStatus,
          paymentMethod,
          transactionId,
        },
      );

      res
        .status(200)
        .json(
          successResponse(
            "Payment status updated successfully",
            updatedParticipant,
          ),
        );
    } catch (error: unknown) {
      res
        .status(400)
        .json(
          errorResponse("Payment update failed", getErrorMessage(error), 400),
        );
    }
  },

  async deleteParticipant(req: AuthenticatedRequest, res: Response) {
    try {
      const participantId = req.params.id;
      const participant = await Participant.findById(participantId);

      if (!participant) {
        return res
          .status(404)
          .json(errorResponse("Participant not found", "", 404));
      }

      if (participant.paymentStatus === "completed") {
        return res
          .status(400)
          .json(
            errorResponse(
              "Cannot delete paid participant",
              "Payment has been completed",
              400,
            ),
          );
      }

      await Participant.findByIdAndDelete(participantId);

      res
        .status(200)
        .json(successResponse("Participant deleted successfully", null));
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse(
            "Error deleting participant",
            getErrorMessage(error),
            500,
          ),
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
    } catch (error: unknown) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving stats", getErrorMessage(error), 500),
        );
    }
  },
};
