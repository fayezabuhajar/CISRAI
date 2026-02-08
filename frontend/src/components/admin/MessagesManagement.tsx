import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Mail,
  MailOpen,
  Calendar,
  User,
  MessageSquare,
  Trash,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { messageAPI } from "../../services/api";

interface MessagesManagementProps {
  language: "en" | "ar";
}

interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "unread" | "read" | "replied";
  response?: string;
}

export default function MessagesManagement({
  language,
}: MessagesManagementProps) {
  const isRtl = language === "ar";
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = (await messageAPI.getAll(1, 200)) as {
        success?: boolean;
        data?: { data?: Message[] };
      };

      const payload = response.data?.data ?? [];
      if (response.success && Array.isArray(payload)) {
        setMessages(payload);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Contact Messages",
      subtitle: "Manage inquiries and contact form submissions",
      search: "Search messages...",
      filterByStatus: "Filter by Status",
      all: "All Messages",
      unread: "Unread",
      read: "Read",
      sender: "Sender",
      subject: "Subject",
      date: "Date",
      status: "Status",
      viewMessage: "View Message",
      markAsRead: "Mark as Read",
      markAsUnread: "Mark as Unread",
      totalMessages: "Total Messages",
      unreadMessages: "Unread Messages",
      close: "Close",
      from: "From",
      email: "Email",
      receivedOn: "Received On",
      delete: "Delete",
      confirmDelete: "Delete this message?",
    },
    ar: {
      title: "رسائل التواصل",
      subtitle: "إدارة الاستفسارات ونماذج الاتصال",
      search: "البحث في الرسائل...",
      filterByStatus: "تصفية حسب الحالة",
      all: "جميع الرسائل",
      unread: "غير مقروءة",
      read: "مقروءة",
      sender: "المرسل",
      subject: "الموضوع",
      date: "التاريخ",
      status: "الحالة",
      viewMessage: "عرض الرسالة",
      markAsRead: "تعليم كمقروءة",
      markAsUnread: "تعليم كغير مقروءة",
      totalMessages: "إجمالي الرسائل",
      unreadMessages: "الرسائل غير المقروءة",
      close: "إغلاق",
      from: "من",
      email: "البريد الإلكتروني",
      receivedOn: "استلمت في",
      delete: "حذف",
      confirmDelete: "هل تريد حذف هذه الرسالة؟",
    },
  }[language];

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "unread" && m.status === "unread") ||
        (statusFilter === "read" && m.status !== "unread");

      return matchesSearch && matchesStatus;
    });
  }, [messages, searchQuery, statusFilter]);

  const unreadCount = useMemo(
    () => messages.filter((m) => m.status === "unread").length,
    [messages],
  );

  const toggleReadStatus = (id: string) => {
    setMessages(
      messages.map((m) =>
        m._id === id
          ? { ...m, status: m.status === "unread" ? "read" : "unread" }
          : m,
      ),
    );
  };

  const viewMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      try {
        await messageAPI.getById(message._id);
        await loadMessages();
      } catch (error) {
        console.error("Failed to mark message as read:", error);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm(t.confirmDelete);
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await messageAPI.delete(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isRtl ? "ar" : "en", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
        <p className="text-neutral-500">{t.subtitle}</p>
        <div className="w-24 h-1 bg-accent rounded-full mt-4" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          className="rounded-3xl p-6 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--primary))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{messages.length}</div>
              <div className="text-blue-100">{t.totalMessages}</div>
            </div>
          </div>
        </div>
        <div
          className="rounded-3xl p-6 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--destructive), var(--accent))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <MailOpen size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{unreadCount}</div>
              <div className="text-red-100">{t.unreadMessages}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search
                className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                size={20}
              />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none`}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="unread">{t.unread}</option>
              <option value="read">{t.read}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-3xl shadow-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-neutral-500">
            {language === "ar" ? "جاري التحميل..." : "Loading messages..."}
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredMessages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => viewMessage(message)}
                className={`p-6 hover:bg-accent/5 transition-all cursor-pointer ${
                  message.status === "unread" ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0 ${
                      message.status === "unread" ? "bg-primary" : "bg-accent"
                    }`}
                  >
                    {message.status === "unread" ? (
                      <Mail size={24} />
                    ) : (
                      <MailOpen size={24} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3
                            className={`font-bold text-primary truncate ${message.status === "unread" ? "text-primary" : ""}`}
                          >
                            {message.subject}
                          </h3>
                          {message.status === "unread" && (
                            <span className="shrink-0 w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <User size={14} />
                          <span className="truncate">{message.senderName}</span>
                          <span className="text-neutral-400">•</span>
                          <span className="truncate">
                            {message.senderEmail}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 shrink-0">
                        <Calendar size={14} />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 line-clamp-2 mt-2">
                      {message.message}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadStatus(message._id);
                      }}
                      className="mt-3 text-sm font-medium text-accent hover:text-primary transition-colors"
                    >
                      {message.status === "unread"
                        ? t.markAsRead
                        : t.markAsUnread}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent), var(--primary))",
                    }}
                  >
                    {selectedMessage.senderName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <User size={16} className="text-accent" />
                        <span className="font-medium">{t.from}:</span>
                        <span>{selectedMessage.senderName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail size={16} className="text-accent" />
                        <span className="font-medium">{t.email}:</span>
                        <span>{selectedMessage.senderEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Calendar size={16} className="text-accent" />
                        <span className="font-medium">{t.receivedOn}:</span>
                        <span>{formatDate(selectedMessage.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-primary/60 uppercase tracking-widest mb-3">
                  <MessageSquare size={16} />
                  <span>{isRtl ? "محتوى الرسالة" : "Message Content"}</span>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => deleteMessage(selectedMessage._id)}
                  disabled={deletingId === selectedMessage._id}
                  className="flex-1 bg-red-50 text-red-700 px-6 py-3 rounded-xl hover:bg-red-100 transition-all font-medium disabled:opacity-60"
                >
                  {deletingId === selectedMessage._id ? (
                    <span className="inline-flex items-center gap-2 justify-center">
                      <Loader size={16} className="animate-spin" />
                      {t.delete}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 justify-center">
                      <Trash size={16} /> {t.delete}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition-all font-medium"
                >
                  {t.close}
                </button>
                <button
                  onClick={() => {
                    toggleReadStatus(selectedMessage._id);
                    setSelectedMessage(null);
                  }}
                  className="flex-1 bg-neutral-100 text-neutral-700 px-6 py-3 rounded-xl hover:bg-neutral-200 transition-all font-medium"
                >
                  {selectedMessage.status === "unread"
                    ? t.markAsRead
                    : t.markAsUnread}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
