import { Request, Response } from "express";
import { announcementService } from "../services/announcement.service";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationParams, getPaginationMeta } from "../utils/pagination";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const announcementController = {
  async createAnnouncement(req: AuthenticatedRequest, res: Response) {
    try {
      const announcement = await announcementService.createAnnouncement({
        ...req.body,
        createdBy: req.user!.id,
      });

      res
        .status(201)
        .json(
          successResponse(
            "Announcement created successfully",
            announcement,
            201,
          ),
        );
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Creation failed", error.message, 400));
    }
  },

  async getAllAnnouncements(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const audience = req.query.audience as string | undefined;

      const { announcements, total } =
        await announcementService.getAllAnnouncements(page, limit, audience);

      res.status(200).json(
        successResponse("Announcements retrieved", {
          data: announcements,
          meta: getPaginationMeta(total, page, limit),
        }),
      );
    } catch (error: any) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving announcements", error.message, 500),
        );
    }
  },

  async getAnnouncementById(req: Request, res: Response) {
    try {
      const announcement = await announcementService.getAnnouncementById(
        req.params.id,
      );

      res
        .status(200)
        .json(successResponse("Announcement retrieved", announcement));
    } catch (error: any) {
      res
        .status(404)
        .json(errorResponse("Announcement not found", error.message, 404));
    }
  },

  async updateAnnouncement(req: AuthenticatedRequest, res: Response) {
    try {
      const announcement = await announcementService.updateAnnouncement(
        req.params.id,
        req.body,
      );

      res
        .status(200)
        .json(
          successResponse("Announcement updated successfully", announcement),
        );
    } catch (error: any) {
      res.status(400).json(errorResponse("Update failed", error.message, 400));
    }
  },

  async deleteAnnouncement(req: Request, res: Response) {
    try {
      await announcementService.deleteAnnouncement(req.params.id);

      res
        .status(200)
        .json(successResponse("Announcement deleted successfully"));
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", error.message, 400));
    }
  },

  async getLatestAnnouncements(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const announcements =
        await announcementService.getLatestAnnouncements(limit);

      res
        .status(200)
        .json(successResponse("Latest announcements retrieved", announcements));
    } catch (error: any) {
      res
        .status(500)
        .json(
          errorResponse("Error retrieving announcements", error.message, 500),
        );
    }
  },
};
