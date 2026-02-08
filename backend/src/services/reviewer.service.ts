import { Reviewer } from "../models/Reviewer";
import { sendReviewerInvitationEmail } from "../utils/email";
import { IReviewer } from "../types/index";

export const reviewerService = {
  async createReviewerRequest(data: Partial<IReviewer>) {
    const existingReviewer = await Reviewer.findOne({ email: data.email });
    if (existingReviewer) {
      throw new Error("Reviewer already exists");
    }

    const reviewer = new Reviewer({
      ...data,
      status: "pending",
    });

    await reviewer.save();
    return reviewer;
  },

  async approveReviewer(id: string) {
    const reviewer = await Reviewer.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedDate: new Date(),
      },
      { new: true },
    );

    if (!reviewer) {
      throw new Error("Reviewer not found");
    }
    // Send email but don't fail the approval if email sending fails
    try {
      await sendReviewerInvitationEmail(reviewer.email, reviewer.fullName);
    } catch (error) {
      console.error("Failed to send reviewer invitation email", error);
    }
    return reviewer;
  },

  async rejectReviewer(id: string, reason: string) {
    const reviewer = await Reviewer.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectedReason: reason,
      },
      { new: true },
    );

    if (!reviewer) {
      throw new Error("Reviewer not found");
    }

    return reviewer;
  },

  async getAllReviewers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [reviewers, total] = await Promise.all([
      Reviewer.find().skip(skip).limit(limit),
      Reviewer.countDocuments(),
    ]);

    return { reviewers, total, page, limit };
  },

  async getReviewerById(id: string) {
    const reviewer = await Reviewer.findById(id);
    if (!reviewer) {
      throw new Error("Reviewer not found");
    }
    return reviewer;
  },

  async updateReviewer(id: string, data: Partial<IReviewer>) {
    const reviewer = await Reviewer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!reviewer) {
      throw new Error("Reviewer not found");
    }

    return reviewer;
  },

  async deleteReviewer(id: string) {
    const reviewer = await Reviewer.findByIdAndDelete(id);
    if (!reviewer) {
      throw new Error("Reviewer not found");
    }
    return reviewer;
  },
};
