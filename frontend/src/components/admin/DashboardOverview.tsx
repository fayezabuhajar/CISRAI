import {
  Users,
  Mic2,
  UserCheck,
  FileText,
  Mail,
  TrendingUp,
  Loader,
  Trash,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { committeeAPI, dashboardAPI, messageAPI } from "../../services/api";
import type { ActiveSection } from "../pages/AdminDashboard";

interface DashboardOverviewProps {
  language: "en" | "ar";
  onNavigate?: (section: ActiveSection) => void;
}

interface DashboardStats {
  totalCommitteeMembers: number;
  activeSpeakers: number;
  paidParticipants: number;
  pendingReviewers: number;
  newMessages: number;
}

interface DashboardStatsResponse {
  success: boolean;
  data?: Partial<{
    totalParticipants: number;
    totalReviewers: number;
    totalSpeakers: number;
    pendingMessages: number;
    totalCommitteeMembers: number;
    activeSpeakers: number;
    paidParticipants: number;
    pendingReviewers: number;
    newMessages: number;
  }>;
}

interface RecentMessage {
  _id: string;
  senderName: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface FullMessage extends RecentMessage {
  senderEmail?: string;
  message?: string;
}

export default function DashboardOverview({
  language,
  onNavigate,
}: DashboardOverviewProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalCommitteeMembers: 0,
    activeSpeakers: 0,
    paidParticipants: 0,
    pendingReviewers: 0,
    newMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<FullMessage | null>(
    null,
  );
  const [messageDetailLoading, setMessageDetailLoading] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
    loadRecentMessages();
    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      loadDashboardStats();
      loadRecentMessages();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const response =
        (await dashboardAPI.getStats()) as DashboardStatsResponse;
      if (response.success && response.data) {
        const d = response.data;
        let totalCommitteeMembers = d.totalCommitteeMembers;

        // Fallback: if backend did not send the committee count, fetch from committees list meta
        if (totalCommitteeMembers === undefined) {
          try {
            const committees = (await committeeAPI.getAll(1, 1)) as {
              success?: boolean;
              data?: { meta?: { total?: number } };
            };
            if (committees.success) {
              totalCommitteeMembers = committees.data?.meta?.total ?? 0;
            }
          } catch (e) {
            console.error("Failed to fetch committees fallback:", e);
          }
        }

        const safeCommitteeMembers = totalCommitteeMembers ?? 0;

        setStats({
          totalCommitteeMembers: Math.max(safeCommitteeMembers - 1, 0),
          activeSpeakers: d.activeSpeakers ?? 0,
          paidParticipants: d.paidParticipants ?? 0,
          pendingReviewers: d.pendingReviewers ?? 0,
          newMessages: d.newMessages ?? d.pendingMessages ?? 0,
        });
      }
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      setStats({
        totalCommitteeMembers: 0,
        activeSpeakers: 0,
        paidParticipants: 0,
        pendingReviewers: 0,
        newMessages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRecentMessages = async () => {
    try {
      setMessagesLoading(true);
      const response = (await messageAPI.getAll(1, 50)) as {
        success?: boolean;
        data?: { data?: FullMessage[] };
      };

      const list = response.data?.data || [];
      if (response.success && Array.isArray(list)) {
        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setRecentMessages(sorted);
      }
    } catch (error) {
      console.error("Failed to load recent messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const openMessage = async (msg: RecentMessage) => {
    try {
      setMessageDetailLoading(true);
      const response = (await messageAPI.getById(msg._id)) as {
        success?: boolean;
        data?: FullMessage;
      };
      if (response.success && response.data) {
        setSelectedMessage(response.data);
        await loadRecentMessages();
      } else {
        // fallback to list item
        setSelectedMessage(msg);
      }
    } catch (error) {
      console.error("Failed to load message detail:", error);
      setSelectedMessage(msg);
    } finally {
      setMessageDetailLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm(t.confirmDelete);
    if (!confirmed) return;

    try {
      setDeletingMessage(id);
      await messageAPI.delete(id);
      setSelectedMessage(null);
      setRecentMessages((prev) => prev.filter((m) => m._id !== id));
      await loadRecentMessages();
      await loadDashboardStats();
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setDeletingMessage(null);
    }
  };

  const t = {
    en: {
      title: "Dashboard Overview",
      subtitle: "Conference Management Statistics",
      totalMembers: "Total Committee Members",
      activeSpeakers: "Active Speakers",
      paidParticipants: "Paid Participants",
      pendingReviewers: "Pending Reviewers",
      newMessages: "New Messages",
      latestMessages: "Latest Messages",
      from: "From",
      email: "Email",
      receivedOn: "Received On",
      close: "Close",
      delete: "Delete",
      confirmDelete: "Delete this message?",
      open: "Open",
      quickActions: "Quick Actions",
      addCommittee: "Add Committee Member",
      addSpeaker: "Add New Speaker",
      reviewParticipants: "Review Participants",
      reviewReviewers: "Review Pending Reviewers",
      systemStatus: "System Status",
      serverStatus: "Server Status",
      database: "Database",
      lastUpdate: "Last Update",
      active: "Active",
      connected: "Connected",
    },
    ar: {
      title: "نظرة عامة",
      subtitle: "إحصائيات إدارة المؤتمر",
      totalMembers: "إجمالي أعضاء اللجان",
      activeSpeakers: "المتحدثون النشطون",
      paidParticipants: "المشاركون المدفوعون",
      pendingReviewers: "المحكمون المعلقون",
      newMessages: "رسائل جديدة",
      latestMessages: "أحدث الرسائل",
      from: "من",
      email: "البريد الإلكتروني",
      receivedOn: "استلمت في",
      close: "إغلاق",
      delete: "حذف",
      confirmDelete: "هل تريد حذف هذه الرسالة؟",
      open: "عرض",
      quickActions: "إجراءات سريعة",
      addCommittee: "إضافة عضو لجنة جديد",
      addSpeaker: "إضافة متحدث جديد",
      reviewParticipants: "مراجعة المشاركين",
      reviewReviewers: "مراجعة المحكمين المعلقين",
      systemStatus: "حالة النظام",
      serverStatus: "حالة الخادم",
      database: "قاعدة البيانات",
      lastUpdate: "آخر تحديث",
      active: "نشط",
      connected: "متصل",
    },
  }[language];

  const statsCards = [
    {
      title: t.totalMembers,
      value: stats.totalCommitteeMembers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: t.activeSpeakers,
      value: stats.activeSpeakers,
      icon: Mic2,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: t.paidParticipants,
      value: stats.paidParticipants,
      icon: UserCheck,
      color: "from-primary to-accent",
      bgColor: "bg-accent/10",
      textColor: "text-primary",
    },
    {
      title: t.pendingReviewers,
      value: stats.pendingReviewers,
      icon: FileText,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      title: t.newMessages,
      value: stats.newMessages,
      icon: Mail,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
        <p className="text-neutral-500">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center`}
                >
                  <Icon size={28} className={stat.textColor} />
                </div>
                <TrendingUp size={20} className="text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.title}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
          <h2 className="text-2xl font-bold text-primary mb-6">
            {t.quickActions}
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => onNavigate?.("committees")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-all flex items-center gap-4"
            >
              <Users className="text-blue-600" size={20} />
              <span className="font-medium text-primary">{t.addCommittee}</span>
            </button>
            <button
              onClick={() => onNavigate?.("speakers")}
              className="w-full px-6 py-4 bg-purple-50 hover:bg-purple-100 rounded-xl text-left transition-all flex items-center gap-4"
            >
              <Mic2 className="text-purple-600" size={20} />
              <span className="font-medium text-primary">{t.addSpeaker}</span>
            </button>
            <button
              onClick={() => onNavigate?.("participants")}
              className="w-full px-6 py-4 bg-accent/10 hover:bg-accent/20 rounded-xl text-left transition-all flex items-center gap-4"
            >
              <UserCheck className="text-primary" size={20} />
              <span className="font-medium text-primary">
                {t.reviewParticipants}
              </span>
            </button>
            <button
              onClick={() => onNavigate?.("reviewers")}
              className="w-full px-6 py-4 bg-amber-50 hover:bg-amber-100 rounded-xl text-left transition-all flex items-center gap-4"
            >
              <FileText className="text-amber-600" size={20} />
              <span className="font-medium text-primary">
                {t.reviewReviewers}
              </span>
            </button>
          </div>
        </div>

        {/* Latest Messages */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 flex flex-col">
          <h2 className="text-2xl font-bold text-primary mb-6">
            {t.latestMessages}
          </h2>
          {messagesLoading ? (
            <div className="text-neutral-500 text-sm">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          ) : recentMessages.length === 0 ? (
            <div className="text-neutral-400 text-sm">
              {language === "ar" ? "لا توجد رسائل" : "No messages"}
            </div>
          ) : (
            <div
              className="space-y-3 pr-2 custom-scrollbar-light"
              style={{ height: 280, maxHeight: 280, overflowY: "scroll" }}
            >
              {recentMessages.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => openMessage(msg)}
                  className="w-full text-left flex items-start justify-between gap-3 p-3 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-primary truncate">
                      {msg.subject}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {msg.senderName}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {new Date(msg.createdAt).toLocaleString(
                        language === "ar" ? "ar" : "en",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                      msg.status === "unread"
                        ? "bg-primary/10 text-primary"
                        : msg.status === "replied"
                          ? "bg-accent/20 text-primary"
                          : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {msg.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-black/80">
          <h2 className="text-2xl font-bold mb-6">{t.systemStatus}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <span className="text-white/80">{t.serverStatus}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">{t.active}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <span className="text-white/80">{t.database}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">{t.connected}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">{t.lastUpdate}</span>
              <span className="font-medium">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xl font-bold text-primary mb-1">
                  {selectedMessage.subject}
                </div>
                <div className="text-sm text-neutral-600 flex items-center gap-2">
                  <span className="font-semibold">{t.from}:</span>
                  <span>{selectedMessage.senderName}</span>
                </div>
                {selectedMessage.senderEmail && (
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                    <span className="font-semibold">{t.email}:</span>
                    <span>{selectedMessage.senderEmail}</span>
                  </div>
                )}
                <div className="text-xs text-neutral-500 mt-1">
                  {t.receivedOn}:{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString(
                    language === "ar" ? "ar" : "en",
                  )}
                </div>
              </div>
              <span
                className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                  selectedMessage.status === "unread"
                    ? "bg-primary/10 text-primary"
                    : selectedMessage.status === "replied"
                      ? "bg-accent/20 text-primary"
                      : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {selectedMessage.status}
              </span>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 text-neutral-700 whitespace-pre-wrap min-h-[120px]">
              {messageDetailLoading
                ? language === "ar"
                  ? "جاري التحميل..."
                  : "Loading..."
                : selectedMessage.message || ""}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => deleteMessage(selectedMessage._id)}
                disabled={deletingMessage === selectedMessage._id}
                className="px-5 py-2 rounded-lg bg-red-600 text-black hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deletingMessage === selectedMessage._id ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader size={16} className="animate-spin" /> {t.delete}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Trash size={16} /> {t.delete}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-accent transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
