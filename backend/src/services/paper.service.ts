import { Paper } from "../models/Paper";
import { IPaper } from "../types/index";

export const paperService = {
  async submitPaper(data: Partial<IPaper>) {
    const paper = new Paper({
      ...data,
      status: "submitted",
    });

    await paper.save();
    return paper;
  },

  async getAllPapers(page: number, limit: number, status?: string) {
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};

    const [papers, total] = await Promise.all([
      Paper.find(query).skip(skip).limit(limit),
      Paper.countDocuments(query),
    ]);

    return { papers, total, page, limit };
  },

  async getPaperById(id: string) {
    const paper = await Paper.findById(id);
    if (!paper) {
      throw new Error("Paper not found");
    }
    return paper;
  },

  async updatePaperStatus(id: string, status: string) {
    const paper = await Paper.findByIdAndUpdate(id, { status }, { new: true });

    if (!paper) {
      throw new Error("Paper not found");
    }

    return paper;
  },

  async acceptPaper(id: string) {
    const paper = await Paper.findByIdAndUpdate(
      id,
      {
        status: "accepted",
        acceptanceDate: new Date(),
      },
      { new: true },
    );

    if (!paper) {
      throw new Error("Paper not found");
    }

    return paper;
  },

  async rejectPaper(id: string, reason: string) {
    const paper = await Paper.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectionReason: reason,
      },
      { new: true },
    );

    if (!paper) {
      throw new Error("Paper not found");
    }

    return paper;
  },

  async deletePaper(id: string) {
    const paper = await Paper.findByIdAndDelete(id);
    if (!paper) {
      throw new Error("Paper not found");
    }
    return paper;
  },
};
