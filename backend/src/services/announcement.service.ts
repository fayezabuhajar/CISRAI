import { FilterQuery } from "mongoose";
import { Announcement } from "../models/Announcement";
import { IAnnouncementDocument } from "../types/index";

export const announcementService = {
  async createAnnouncement(data: Partial<IAnnouncementDocument>) {
    const announcement = new Announcement({
      ...data,
      isPublished: true,
    });

    await announcement.save();
    return announcement;
  },

  async getAllAnnouncements(page: number, limit: number, audience?: string) {
    const skip = (page - 1) * limit;
    const query: FilterQuery<IAnnouncementDocument> = { isPublished: true };

    if (audience && audience !== "all") {
      query.targetAudience = { $in: ["all", audience] };
    }

    const [announcements, total] = await Promise.all([
      Announcement.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ publishedDate: -1 })
        .populate("createdBy", "email firstName lastName"),
      Announcement.countDocuments(query),
    ]);

    return { announcements, total, page, limit };
  },

  async getAnnouncementById(id: string) {
    const announcement = await Announcement.findById(id).populate(
      "createdBy",
      "email firstName lastName",
    );
    if (!announcement) {
      throw new Error("Announcement not found");
    }
    return announcement;
  },

  async updateAnnouncement(id: string, data: Partial<IAnnouncementDocument>) {
    const announcement = await Announcement.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!announcement) {
      throw new Error("Announcement not found");
    }

    return announcement;
  },

  async deleteAnnouncement(id: string) {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      throw new Error("Announcement not found");
    }
    return announcement;
  },

  async getLatestAnnouncements(limit: number = 5) {
    const announcements = await Announcement.find({ isPublished: true })
      .limit(limit)
      .sort({ publishedDate: -1 })
      .select("title content type priority publishedDate");

    return announcements;
  },
};
