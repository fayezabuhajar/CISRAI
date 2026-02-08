import { Committee } from "../models/Committee";
import { Participant } from "../models/Participant";
import { Reviewer } from "../models/Reviewer";
import { Speaker } from "../models/Speaker";
import { Paper } from "../models/Paper";
import { Message } from "../models/Message";

export const dashboardService = {
  async getOverviewStats() {
    const [
      totalCommitteeMembers,
      activeSpeakers,
      paidParticipants,
      pendingReviewers,
      newMessages,
      totalParticipants,
      totalReviewers,
      totalSpeakers,
      totalPapers,
      pendingMessages,
      acceptedPapers,
      onlineParticipants,
      onsiteParticipants,
    ] = await Promise.all([
      Committee.countDocuments(),
      Speaker.countDocuments({ status: "active" }),
      Participant.countDocuments({ paymentStatus: "completed" }),
      Reviewer.countDocuments({ status: "pending" }),
      Message.countDocuments({ status: "unread" }),
      Participant.countDocuments(),
      Reviewer.countDocuments(),
      Speaker.countDocuments(),
      Paper.countDocuments(),
      Message.countDocuments({ status: "unread" }),
      Paper.countDocuments({ status: "accepted" }),
      Participant.countDocuments({ registrationType: "online-paper" }),
      Participant.countDocuments({ registrationType: "onsite-paper" }),
    ]);

    return {
      totalCommitteeMembers,
      activeSpeakers,
      paidParticipants,
      pendingReviewers,
      newMessages,
      totalParticipants,
      totalReviewers,
      totalSpeakers,
      totalPapers,
      pendingMessages,
      acceptedPapers,
      onlineParticipants,
      onsiteParticipants,
    };
  },

  async getRecentActivity(limit: number = 10) {
    const [recentParticipants, recentReviewers, recentPapers, recentMessages] =
      await Promise.all([
        Participant.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .select("fullName registrationType paymentStatus createdAt"),
        Reviewer.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .select("fullName status createdAt"),
        Paper.find()
          .sort({ submissionDate: -1 })
          .limit(limit)
          .select("title status submissionDate"),
        Message.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .select("senderName subject status createdAt"),
      ]);

    return {
      recentParticipants,
      recentReviewers,
      recentPapers,
      recentMessages,
    };
  },

  async getPaymentStats() {
    const totalParticipants = await Participant.countDocuments();
    const paymentCompleted = await Participant.countDocuments({
      paymentStatus: "completed",
    });
    const paymentPending = await Participant.countDocuments({
      paymentStatus: "pending",
    });
    const paymentCancelled = await Participant.countDocuments({
      paymentStatus: "cancelled",
    });

    return {
      totalParticipants,
      paymentCompleted,
      paymentPending,
      paymentCancelled,
      completionRate: (paymentCompleted / totalParticipants) * 100,
    };
  },

  async getPaperStats() {
    const submitted = await Paper.countDocuments({ status: "submitted" });
    const underReview = await Paper.countDocuments({ status: "under-review" });
    const accepted = await Paper.countDocuments({ status: "accepted" });
    const rejected = await Paper.countDocuments({ status: "rejected" });

    return {
      submitted,
      underReview,
      accepted,
      rejected,
    };
  },

  async getReviewerStats() {
    const pending = await Reviewer.countDocuments({ status: "pending" });
    const approved = await Reviewer.countDocuments({ status: "approved" });
    const rejected = await Reviewer.countDocuments({ status: "rejected" });

    return {
      pending,
      approved,
      rejected,
    };
  },

  async getCountriesDistribution() {
    const distribution = await Participant.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return distribution;
  },
};
