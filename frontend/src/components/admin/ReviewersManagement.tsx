import { useCallback, useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  FileText,
  Mail,
  Phone,
  Building,
  Award,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { reviewerAPI } from "../../services/api";

interface ReviewersManagementProps {
  language: "en" | "ar";
}

interface ReviewerRequest {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  affiliation: string;
  expertise: string[];
  status: "pending" | "approved" | "rejected";
  bio?: string;
}

export default function ReviewersManagement({
  language,
}: ReviewersManagementProps) {
  const isRtl = language === "ar";
  const [requests, setRequests] = useState<ReviewerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const t = {
    en: {
      title: "Reviewer Requests",
      subtitle: "Review and manage reviewer applications",
      search: "Search reviewers...",
      filterByStatus: "Filter by Status",
      all: "All",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      name: "Name",
      email: "Email",
      phone: "Phone",
      institution: "Institution",
      expertise: "Field of Expertise",
      status: "Status",
      actions: "Actions",
      approve: "Approve",
      reject: "Reject",
      delete: "Delete",
      totalRequests: "Total Requests",
      pendingRequests: "Pending",
      approvedRequests: "Approved",
      loading: "Loading reviewer requests...",
      error: "Failed to load reviewer requests",
      retry: "Retry",
      backToPending: "Move to Pending",
      actionError: "Action failed, please try again",
    },
    ar: {
      title: "طلبات التحكيم",
      subtitle: "مراجعة وإدارة طلبات المحكمين",
      search: "البحث عن المحكمين...",
      filterByStatus: "تصفية حسب الحالة",
      all: "الكل",
      pending: "معلق",
      approved: "موافق عليه",
      rejected: "مرفوض",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      institution: "المؤسسة",
      expertise: "مجال الخبرة",
      status: "الحالة",
      actions: "الإجراءات",
      approve: "الموافقة",
      reject: "الرفض",
      delete: "حذف",
      totalRequests: "إجمالي الطلبات",
      pendingRequests: "معلق",
      approvedRequests: "موافق عليه",
      loading: "جاري تحميل طلبات المحكمين...",
      error: "فشل تحميل طلبات المحكمين",
      retry: "إعادة المحاولة",
      backToPending: "إرجاع للحالة المعلقة",
      actionError: "فشل تنفيذ الإجراء، حاول مرة أخرى",
    },
  }[language];

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await reviewerAPI.getAll(1, 50)) as {
        success?: boolean;
        data?: { data?: ReviewerRequest[] };
      };

      const list = response.data?.data || [];
      if (response.success && Array.isArray(list)) {
        setRequests(list);
      } else {
        setError(t.error);
      }
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [t.error]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.expertise || [])
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;

  const handleApprove = async (id: string) => {
    try {
      setActionId(id);
      setActionError(null);
      await reviewerAPI.approve(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "approved" } : r)),
      );
      // refresh to stay in sync with backend
      await loadRequests();
    } catch (err) {
      console.error(err);
      setActionError(t.actionError);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionId(id);
      setActionError(null);
      await reviewerAPI.reject(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "rejected" } : r)),
      );
      await loadRequests();
    } catch (err) {
      console.error(err);
      setActionError(t.actionError);
    } finally {
      setActionId(null);
    }
  };

  const handleBackToPending = async (id: string) => {
    try {
      setActionId(id);
      setActionError(null);
      await reviewerAPI.update(id, { status: "pending" });
      await loadRequests();
    } catch (err) {
      console.error(err);
      setActionError(t.actionError);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionId(id);
      setActionError(null);
      await reviewerAPI.delete(id);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      setActionError(t.actionError);
    } finally {
      setActionId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-amber-100 text-amber-700">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            {isRtl ? "معلق" : "Pending"}
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-accent/20 text-primary">
            <CheckCircle size={16} />
            {isRtl ? "موافق عليه" : "Approved"}
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-700">
            <XCircle size={16} />
            {isRtl ? "مرفوض" : "Rejected"}
          </span>
        );
      default:
        return null;
    }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-black shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{requests.length}</div>
              <div className="text-blue-100">{t.totalRequests}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-black shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{pendingCount}</div>
              <div className="text-amber-100">{t.pendingRequests}</div>
            </div>
          </div>
        </div>
        <div
          className="rounded-3xl p-6 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--primary))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{approvedCount}</div>
              <div className="text-white/80">{t.approvedRequests}</div>
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
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="pending">{t.pending}</option>
              <option value="approved">{t.approved}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviewer Requests Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading && (
          <div className="col-span-1 lg:col-span-2 flex items-center gap-3 text-neutral-500">
            <Loader className="animate-spin" size={18} />
            <span>{t.loading}</span>
          </div>
        )}

        {!loading && error && (
          <div className="col-span-1 lg:col-span-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{t.error}</span>
            <button
              onClick={loadRequests}
              className="text-sm font-medium underline"
            >
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && filteredRequests.length === 0 && (
          <div className="col-span-1 lg:col-span-2 text-neutral-500 text-sm">
            {isRtl ? "لا توجد طلبات مطابقة" : "No matching requests"}
          </div>
        )}

        {!loading && !error && actionError && (
          <div className="col-span-1 lg:col-span-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl">
            {actionError}
          </div>
        )}

        {!loading &&
          !error &&
          filteredRequests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-border hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent), var(--primary))",
                    }}
                  >
                    {request.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {request.fullName}
                    </h3>
                    <div className="mt-1">{getStatusBadge(request.status)}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Mail size={16} className="text-accent" />
                  <span>{request.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Phone size={16} className="text-accent" />
                  <span>{request.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Building size={16} className="text-accent" />
                  <span>{request.affiliation}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Award size={16} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">
                      {t.expertise}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {request.expertise?.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {request.status === "pending" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(request._id)}
                    disabled={actionId === request._id}
                    className="flex-1 bg-primary hover:bg-accent text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {actionId === request._id ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                    <span>{t.approve}</span>
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    disabled={actionId === request._id}
                    className="flex-1 bg-accent hover:bg-primary text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {actionId === request._id ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <XCircle size={18} />
                    )}
                    <span>{t.reject}</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBackToPending(request._id)}
                    disabled={actionId === request._id}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-red-100 px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {actionId === request._id ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <FileText size={18} />
                    )}
                    <span>{t.backToPending}</span>
                  </button>
                </div>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleDelete(request._id)}
                  disabled={actionId === request._id}
                  className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-red-600 px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {actionId === request._id ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  <span>{t.delete}</span>
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
