import { Request, Response } from "express";
import { messageService } from "../services/message.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const messageController = {
  async submitMessage(req: Request, res: Response) {
    try {
      const message = await messageService.submitMessage(req.body);

      res
        .status(201)
        .json(successResponse("Message submitted successfully", message, 201));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Submission failed", error.message, 400));
    }
  },

  async getAllMessages(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string | undefined;

      const { messages, total } = await messageService.getAllMessages(
        page,
        limit,
        status,
      );

      res.status(200).json(
        successResponse("Messages retrieved", {
          data: messages,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: any) {
      res
        .status(500)
        .json(errorResponse("Error retrieving messages", error.message, 500));
    }
  },

  async getMessageById(req: Request, res: Response) {
    try {
      const message = await messageService.getMessageById(req.params.id);
      // Mark as read when retrieved
      await messageService.markAsRead(req.params.id);

      res.status(200).json(successResponse("Message retrieved", message));
    } catch (error: any) {
      res
        .status(404)
        .json(errorResponse("Message not found", error.message, 404));
    }
  },

  async replyToMessage(req: AuthenticatedRequest, res: Response) {
    try {
      const { response } = req.body;
      const message = await messageService.replyToMessage(
        req.params.id,
        response,
        req.user!.id,
      );

      res.status(200).json(successResponse("Reply sent successfully", message));
    } catch (error: any) {
      res.status(400).json(errorResponse("Reply failed", error.message, 400));
    }
  },

  async deleteMessage(req: Request, res: Response) {
    try {
      await messageService.deleteMessage(req.params.id);

      res.status(200).json(successResponse("Message deleted successfully"));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", error.message, 400));
    }
  },
};
