import { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  Mail,
  Phone,
  Building,
  Loader,
  Trash,
} from "lucide-react";

import { registrationAPI } from "../../services/api";

interface ParticipantsManagementProps {
  language: "en" | "ar";
}

interface Participant {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  affiliation?: string;
  registrationType: "onsite-paper" | "online-paper" | "attendance";
  paymentStatus: "pending" | "completed" | "cancelled";
  paymentMethod?: "bank-transfer" | "credit-card" | null;
  transactionId?: string;
}

export default function ParticipantsManagement({
  language,
}: ParticipantsManagementProps) {
  const isRtl = language === "ar";
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const response = (await registrationAPI.getAll(1, 200)) as {
        success?: boolean;
        data?: { data?: Participant[] };
      };

      const payload = response.data?.data ?? [];
      if (response.success && Array.isArray(payload)) {
        setParticipants(payload);
      }
    } catch (error) {
      console.error("Failed to load participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Participants Management",
      subtitle: "Manage registered conference participants",
      search: "Search participants...",
      filterByType: "Registration Type",
      filterByPayment: "Payment Status",
      all: "All",
      onsite: "Onsite (Paper)",
      online: "Online (Paper)",
      attendance: "Attendance Only",
      paid: "Paid",
      unpaid: "Unpaid",
      cancelled: "Cancelled",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      institution: "Affiliation / Institution",
      type: "Registration",
      payment: "Payment",
      totalParticipants: "Total Participants",
      paidParticipants: "Paid",
      unpaidParticipants: "Unpaid",
      plan: "Plan",
      transaction: "Transaction",
      method: "Method",
      actions: "Actions",
      delete: "Delete",
      confirmDelete: "Delete this unpaid participant?",
    },
    ar: {
      title: "إدارة المشاركين",
      subtitle: "إدارة المشاركين المسجلين في المؤتمر",
      search: "البحث عن المشاركين...",
      filterByType: "نوع التسجيل",
      filterByPayment: "حالة الدفع",
      all: "الكل",
      onsite: "حضوري (ورقة)",
      online: "عن بعد (ورقة)",
      attendance: "حضور فقط",
      paid: "مدفوع",
      unpaid: "غير مدفوع",
      cancelled: "ملغي",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      institution: "الجهة / المؤسسة",
      type: "نوع التسجيل",
      payment: "الدفع",
      totalParticipants: "إجمالي المشاركين",
      paidParticipants: "مدفوع",
      unpaidParticipants: "غير مدفوع",
      plan: "الخطة",
      transaction: "المعاملة",
      method: "طريقة الدفع",
      actions: "إجراءات",
      delete: "حذف",
      confirmDelete: "هل تريد حذف هذا المشارك غير المدفوع؟",
    },
  }[language];

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const status = p.paymentStatus || "pending";
      const matchesSearch =
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.affiliation || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "all" || p.registrationType === typeFilter;
      const matchesPayment =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && status === "completed") ||
        (paymentFilter === "unpaid" && status !== "completed");

      return matchesSearch && matchesType && matchesPayment;
    });
  }, [participants, searchQuery, typeFilter, paymentFilter]);

  const totalPaid = useMemo(
    () =>
      participants.filter((p) => (p.paymentStatus || "pending") === "completed")
        .length,
    [participants],
  );

  const totalUnpaid = useMemo(
    () =>
      participants.filter((p) => (p.paymentStatus || "pending") !== "completed")
        .length,
    [participants],
  );

  const getTypeColor = (type: Participant["registrationType"]) => {
    switch (type) {
      case "onsite-paper":
        return "bg-emerald-100 text-emerald-700";
      case "online-paper":
        return "bg-blue-100 text-blue-700";
      case "attendance":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  const getTypeLabel = (type: Participant["registrationType"]) => {
    switch (type) {
      case "onsite-paper":
        return isRtl ? t.onsite : t.onsite;
      case "online-paper":
        return isRtl ? t.online : t.online;
      case "attendance":
        return isRtl ? t.attendance : t.attendance;
      default:
        return type;
    }
  };

  const togglePayment = async (participant: Participant) => {
    const currentStatus = participant.paymentStatus || "pending";
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";

    try {
      setUpdatingId(participant._id);
      await registrationAPI.updatePayment(participant._id, {
        paymentStatus: nextStatus,
        paymentMethod: participant.paymentMethod ?? undefined,
        transactionId: participant.transactionId ?? undefined,
      });
      await loadParticipants();
    } catch (error) {
      console.error("Failed to update payment status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteParticipant = async (participant: Participant) => {
    const status = participant.paymentStatus || "pending";
    if (status === "completed") {
      return;
    }

    const confirmed = window.confirm(t.confirmDelete);
    if (!confirmed) return;

    try {
      setDeletingId(participant._id);
      await registrationAPI.delete(participant._id);
      setParticipants((prev) =>
        prev.filter((item) => item._id !== participant._id),
      );
    } catch (error) {
      console.error("Failed to delete participant:", error);
    } finally {
      setDeletingId(null);
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
        <div
          className="rounded-3xl p-6 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--primary))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{participants.length}</div>
              <div className="text-white/80">{t.totalParticipants}</div>
            </div>
          </div>
        </div>
        <div
          className="rounded-3xl p-6 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--accent))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{totalPaid}</div>
              <div className="text-white/80">{t.paidParticipants}</div>
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
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{totalUnpaid}</div>
              <div className="text-white/80">{t.unpaidParticipants}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
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

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="onsite-paper">{t.onsite}</option>
              <option value="online-paper">{t.online}</option>
              <option value="attendance">{t.attendance}</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="paid">{t.paid}</option>
              <option value="unpaid">{t.unpaid}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-emerald-50 overflow-hidden">
        {loading ? (
          <div className="py-12 flex items-center justify-center gap-3 text-neutral-500">
            <Loader className="animate-spin" size={20} />
            <span>{language === "ar" ? "جاري التحميل..." : "Loading..."}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-100">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t.phone}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t.institution}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t.type}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider text-center">
                    {t.payment}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider text-center">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant._id}
                    className="hover:bg-neutral-50 transition-all duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                          {participant.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-emerald-950">
                            {participant.fullName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {t.plan}:{" "}
                            {getTypeLabel(participant.registrationType)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Mail size={14} />
                        {participant.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                      <div className="flex items-center gap-2 text-neutral-700">
                        <Phone size={14} />
                        {participant.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                      <div className="flex items-center gap-2 text-neutral-700">
                        <Building size={14} />
                        {participant.affiliation || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(participant.registrationType)}`}
                      >
                        {getTypeLabel(participant.registrationType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => togglePayment(participant)}
                        disabled={updatingId === participant._id}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm disabled:opacity-60 ${
                          (participant.paymentStatus || "pending") ===
                          "completed"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : (participant.paymentStatus || "pending") ===
                                "cancelled"
                              ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        {updatingId === participant._id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (participant.paymentStatus || "pending") ===
                          "completed" ? (
                          <>
                            <ToggleRight size={16} /> {t.paid}
                          </>
                        ) : (participant.paymentStatus || "pending") ===
                          "cancelled" ? (
                          <>
                            <ToggleLeft size={16} /> {t.cancelled}
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={16} /> {t.unpaid}
                          </>
                        )}
                      </button>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        {participant.transactionId
                          ? `${t.transaction}: ${participant.transactionId}`
                          : ""}
                        {participant.paymentMethod
                          ? ` · ${t.method}: ${participant.paymentMethod}`
                          : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteParticipant(participant)}
                        disabled={
                          deletingId === participant._id ||
                          updatingId === participant._id ||
                          (participant.paymentStatus || "pending") ===
                            "completed"
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === participant._id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <>
                            <Trash size={16} /> {t.delete}
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
