import {
  Users,
  Mic2,
  UserCheck,
  FileText,
  Mail,
  TrendingUp,
  Loader,
  Trash,
  MapPin,
  Edit,
  Save,
  X,
  Phone,
  Globe,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  committeeAPI,
  dashboardAPI,
  messageAPI,
  settingsAPI,
} from "../../services/api";
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

interface VenueFeature {
  en: string;
  ar: string;
}

interface VenueData {
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  aboutEn: string;
  aboutAr: string;
  phone: string;
  email: string;
  mapUrl: string;
  features: VenueFeature[];
}

interface ImportantDate {
  titleEn: string;
  titleAr: string;
  date: string;
  descEn: string;
  descAr: string;
  highlight: boolean;
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

  // Venue management state
  const [venueData, setVenueData] = useState<VenueData | null>(null);
  const [venueLoading, setVenueLoading] = useState(true);
  const [editingVenue, setEditingVenue] = useState(false);
  const [venueSaving, setVenueSaving] = useState(false);
  const [venueForm, setVenueForm] = useState<VenueData>({
    nameEn: "",
    nameAr: "",
    addressEn: "",
    addressAr: "",
    aboutEn: "",
    aboutAr: "",
    phone: "",
    email: "",
    mapUrl: "",
    features: [],
  });

  // Important Dates management state
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [datesLoading, setDatesLoading] = useState(true);
  const [editingDates, setEditingDates] = useState(false);
  const [datesSaving, setDatesSaving] = useState(false);
  const [datesForm, setDatesForm] = useState<ImportantDate[]>([]);

  // Patron Name management state
  interface PatronData {
    patronNameEn: string;
    patronNameAr: string;
  }
  const [patronData, setPatronData] = useState<PatronData | null>(null);
  const [patronLoading, setPatronLoading] = useState(true);
  const [editingPatron, setEditingPatron] = useState(false);
  const [patronSaving, setPatronSaving] = useState(false);
  const [patronForm, setPatronForm] = useState<PatronData>({
    patronNameEn: "",
    patronNameAr: "",
  });

  // Sponsors management state
  interface Sponsor {
    nameEn: string;
    nameAr: string;
    logoUrl: string;
    websiteUrl?: string;
    order: number;
  }
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [sponsorsLoading, setSponsorsLoading] = useState(true);
  const [editingSponsors, setEditingSponsors] = useState(false);
  const [sponsorsSaving, setSponsorsSaving] = useState(false);
  const [sponsorsForm, setSponsorsForm] = useState<Sponsor[]>([]);

  useEffect(() => {
    // Load initial data once
    loadDashboardStats();
    loadRecentMessages();
    loadVenueData();
    loadImportantDates();
    loadPatronData();
    loadSponsors();
  }, []);

  useEffect(() => {
    // Auto-refresh stats and messages only (not venue/dates/patron/sponsors)
    // Only when user is not editing
    if (editingVenue || editingDates || editingPatron || editingSponsors) {
      return; // Don't set up interval if editing
    }

    const interval = setInterval(() => {
      loadDashboardStats();
      loadRecentMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, [editingVenue, editingDates, editingPatron, editingSponsors]);

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

  // Venue management functions
  const loadVenueData = async () => {
    try {
      setVenueLoading(true);
      const response = (await settingsAPI.getVenue()) as {
        success?: boolean;
        data?: VenueData;
      };
      if (response.success && response.data) {
        setVenueData(response.data);
        setVenueForm(response.data);
      }
    } catch (error) {
      console.error("Failed to load venue data:", error);
    } finally {
      setVenueLoading(false);
    }
  };

  const handleVenueEdit = () => {
    if (venueData) {
      setVenueForm(venueData);
      setEditingVenue(true);
    }
  };

  const handleVenueSave = async () => {
    try {
      setVenueSaving(true);
      const response = (await settingsAPI.updateVenue(
        venueForm as unknown as Record<string, unknown>,
      )) as {
        success?: boolean;
      };
      if ((response as { success?: boolean })?.success) {
        setVenueData(venueForm);
        setEditingVenue(false);
        alert(
          language === "ar"
            ? "تم حفظ التغييرات بنجاح"
            : "Changes saved successfully",
        );
      }
    } catch (error) {
      console.error("Failed to save venue data:", error);
      alert(
        language === "ar" ? "فشل في حفظ التغييرات" : "Failed to save changes",
      );
    } finally {
      setVenueSaving(false);
    }
  };

  const handleVenueReset = async () => {
    const confirmed = window.confirm(
      language === "ar"
        ? "هل تريد إعادة تعيين الموقع إلى القيم الافتراضية؟"
        : "Reset venue to default values?",
    );
    if (!confirmed) return;

    const defaultVenue: VenueData = {
      nameEn: "Amman Arab University",
      nameAr: "جامعة عمان العربية",
      addressEn: "Jordan Street, Mobis, Amman, Jordan",
      addressAr: "شارع الأردن، موبص، عمان، الأردن",
      aboutEn:
        "Amman Arab University (AAU) is a leading institution of higher education in Jordan, committed to academic excellence and innovation. Founded in 1999, AAU has grown to become a respected center for learning, research, and community engagement.",
      aboutAr:
        "تعد جامعة عمان العربية مؤسسة رائدة للتعليم العالي في الأردن، وتلتزم بالتميز الأكاديمي والابتكار. تأسست جامعة عمان العربية في عام 1999، وقد نمت لتصبح مركزًا محترمًا للتعلم والبحث والمشاركة المجتمعية.",
      phone: "+962 6 4790222",
      email: "info@aau.edu.jo",
      mapUrl: "https://maps.app.goo.gl/EvfuXJJCKszZdu3e9",
      features: [
        { en: "Main Conference Auditoriums", ar: "قاعات المؤتمرات الرئيسية" },
        { en: "Modern Research Labs", ar: "مختبرات بحثية حديثة" },
        { en: "High-speed Academic Network", ar: "شبكة أكاديمية عالية السرعة" },
        {
          en: "A Mosque within the University Campus",
          ar: "مسجد داخل الحرم الجامعي",
        },
        { en: "Scientific Exhibition Areas", ar: "مساحات للمعارض العلمية" },
        { en: "Catering & Dining Facilities", ar: "مرافق الإطعام والضيافة" },
      ],
    };

    try {
      setVenueSaving(true);
      const response = (await settingsAPI.updateVenue(
        defaultVenue as unknown as Record<string, unknown>,
      )) as {
        success?: boolean;
      };
      if ((response as { success?: boolean })?.success) {
        setVenueData(defaultVenue);
        setVenueForm(defaultVenue);
        setEditingVenue(false);
        alert(
          language === "ar" ? "تم إعادة التعيين بنجاح" : "Reset successfully",
        );
      }
    } catch (error) {
      console.error("Failed to reset venue:", error);
      alert(language === "ar" ? "فشل في إعادة التعيين" : "Failed to reset");
    } finally {
      setVenueSaving(false);
    }
  };

  // Important Dates management functions
  const loadImportantDates = async () => {
    try {
      setDatesLoading(true);
      const response = (await settingsAPI.getImportantDates()) as {
        success: boolean;
        data: ImportantDate[];
      };
      if (response.success && response.data) {
        setImportantDates(response.data);
        setDatesForm(response.data);
      }
    } catch (error) {
      console.error("Failed to load important dates:", error);
    } finally {
      setDatesLoading(false);
    }
  };

  const handleDatesEdit = () => {
    setDatesForm([...importantDates]);
    setEditingDates(true);
  };

  const handleDatesSave = async () => {
    try {
      setDatesSaving(true);
      const response = (await settingsAPI.updateImportantDates(datesForm)) as {
        success: boolean;
      };
      if (response.success) {
        setImportantDates(datesForm);
        setEditingDates(false);
        alert(
          language === "ar"
            ? "تم حفظ التواريخ بنجاح"
            : "Dates saved successfully",
        );
      }
    } catch (error) {
      console.error("Failed to save dates:", error);
      alert(language === "ar" ? "فشل في حفظ التواريخ" : "Failed to save dates");
    } finally {
      setDatesSaving(false);
    }
  };

  const handleDateAdd = () => {
    setDatesForm([
      ...datesForm,
      {
        titleEn: "",
        titleAr: "",
        date: "",
        descEn: "",
        descAr: "",
        highlight: false,
      },
    ]);
  };

  const handleDateRemove = (index: number) => {
    setDatesForm(datesForm.filter((_, i) => i !== index));
  };

  const handleDateUpdate = (
    index: number,
    field: keyof ImportantDate,
    value: string | boolean,
  ) => {
    const newDates = [...datesForm];
    newDates[index] = { ...newDates[index], [field]: value };
    setDatesForm(newDates);
  };

  // Patron Name management functions
  const loadPatronData = async () => {
    try {
      setPatronLoading(true);
      const response = (await settingsAPI.getPatronName()) as {
        success?: boolean;
        data?: PatronData;
      };
      if (response.success && response.data) {
        setPatronData(response.data);
        setPatronForm(response.data);
      }
    } catch (error) {
      console.error("Failed to load patron data:", error);
    } finally {
      setPatronLoading(false);
    }
  };

  const handlePatronEdit = () => {
    if (patronData) {
      setPatronForm(patronData);
      setEditingPatron(true);
    }
  };

  const handlePatronSave = async () => {
    try {
      setPatronSaving(true);
      const response = (await settingsAPI.updatePatronName(patronForm)) as {
        success?: boolean;
      };
      if (response.success) {
        setPatronData(patronForm);
        setEditingPatron(false);
        alert(
          language === "ar"
            ? "تم حفظ اسم الراعي بنجاح"
            : "Patron name saved successfully",
        );
      }
    } catch (error) {
      console.error("Failed to save patron data:", error);
      alert(
        language === "ar"
          ? "فشل في حفظ اسم الراعي"
          : "Failed to save patron name",
      );
    } finally {
      setPatronSaving(false);
    }
  };

  // Sponsors management functions
  const loadSponsors = async () => {
    try {
      setSponsorsLoading(true);
      const response = (await settingsAPI.getSponsors()) as {
        success: boolean;
        data: Sponsor[];
      };
      if (response.success && response.data) {
        setSponsors(response.data);
        setSponsorsForm(response.data);
      }
    } catch (error) {
      console.error("Failed to load sponsors:", error);
    } finally {
      setSponsorsLoading(false);
    }
  };

  const handleSponsorsEdit = () => {
    setSponsorsForm([...sponsors]);
    setEditingSponsors(true);
  };

  const handleSponsorsSave = async () => {
    try {
      setSponsorsSaving(true);
      const response = (await settingsAPI.updateSponsors(sponsorsForm)) as {
        success: boolean;
      };
      if (response.success) {
        setSponsors(sponsorsForm);
        setEditingSponsors(false);
        alert(
          language === "ar"
            ? "تم حفظ الرعاة بنجاح"
            : "Sponsors saved successfully",
        );
      }
    } catch (error) {
      console.error("Failed to save sponsors:", error);
      alert(
        language === "ar" ? "فشل في حفظ الرعاة" : "Failed to save sponsors",
      );
    } finally {
      setSponsorsSaving(false);
    }
  };

  const handleSponsorAdd = () => {
    setSponsorsForm([
      ...sponsorsForm,
      {
        nameEn: "",
        nameAr: "",
        logoUrl: "",
        websiteUrl: "",
        order: sponsorsForm.length,
      },
    ]);
  };

  const handleSponsorRemove = (index: number) => {
    setSponsorsForm(sponsorsForm.filter((_, i) => i !== index));
  };

  const handleSponsorUpdate = (
    index: number,
    field: keyof Sponsor,
    value: string | number,
  ) => {
    const newSponsors = [...sponsorsForm];
    newSponsors[index] = { ...newSponsors[index], [field]: value };
    setSponsorsForm(newSponsors);
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
      venueManagement: "Venue Management",
      currentVenue: "Current Venue",
      editVenue: "Edit Venue",
      saveChanges: "Save Changes",
      resetToDefault: "Reset to Default",
      cancel: "Cancel",
      venueName: "Venue Name",
      address: "Address",
      about: "About",
      saving: "Saving...",
      features: "Venue Features",
      addFeature: "Add Feature",
      removeFeature: "Remove",
      featureEn: "Feature (English)",
      featureAr: "Feature (Arabic)",
      datesManagement: "Important Dates Management",
      editDates: "Edit Dates",
      addDate: "Add Date",
      removeDate: "Remove",
      dateTitle: "Title",
      dateDate: "Date",
      dateDesc: "Description",
      highlightDate: "Highlight",
      patronManagement: "Patron Name Management",
      currentPatron: "Current Patron",
      editPatron: "Edit Patron",
      patronNameEn: "Patron Name (English)",
      patronNameAr: "Patron Name (Arabic)",
      sponsorsManagement: "Sponsors Management",
      editSponsors: "Edit Sponsors",
      addSponsor: "Add Sponsor",
      removeSponsor: "Remove",
      sponsorNameEn: "Sponsor Name (English)",
      sponsorNameAr: "Sponsor Name (Arabic)",
      sponsorLogo: "Logo URL",
      sponsorWebsite: "Website URL (optional)",
      sponsorOrder: "Display Order",
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
      venueManagement: "إدارة موقع المؤتمر",
      currentVenue: "الموقع الحالي",
      editVenue: "تعديل الموقع",
      saveChanges: "حفظ التغييرات",
      resetToDefault: "إعادة تعيين",
      cancel: "إلغاء",
      venueName: "اسم الموقع",
      address: "العنوان",
      about: "نبذة",
      saving: "جاري الحفظ...",
      features: "ميزات الموقع",
      addFeature: "إضافة ميزة",
      removeFeature: "حذف",
      featureEn: "الميزة (بالإنجليزية)",
      featureAr: "الميزة (بالعربية)",
      datesManagement: "إدارة التواريخ المهمة",
      editDates: "تعديل التواريخ",
      addDate: "إضافة تاريخ",
      removeDate: "حذف",
      dateTitle: "العنوان",
      dateDate: "التاريخ",
      dateDesc: "الوصف",
      highlightDate: "مميز",
      patronManagement: "إدارة اسم الراعي",
      currentPatron: "الراعي الحالي",
      editPatron: "تعديل اسم الراعي",
      patronNameEn: "اسم الراعي (بالإنجليزية)",
      patronNameAr: "اسم الراعي (بالعربية)",
      sponsorsManagement: "إدارة الرعاة",
      editSponsors: "تعديل الرعاة",
      addSponsor: "إضافة راعي",
      removeSponsor: "حذف",
      sponsorNameEn: "اسم الراعي (بالإنجليزية)",
      sponsorNameAr: "اسم الراعي (بالعربية)",
      sponsorLogo: "رابط اللوغو",
      sponsorWebsite: "رابط الموقع (اختياري)",
      sponsorOrder: "ترتيب العرض",
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

      {/* Venue Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="text-primary" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t.venueManagement}
            </h2>
          </div>
          {!editingVenue && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleVenueEdit}
                disabled={venueLoading}
                className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center gap-2 text-sm sm:text-base"
              >
                <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="whitespace-nowrap">{t.editVenue}</span>
              </button>
              <button
                onClick={handleVenueReset}
                disabled={venueLoading || venueSaving}
                className="px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                <span className="whitespace-nowrap">{t.resetToDefault}</span>
              </button>
            </div>
          )}
        </div>

        {venueLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-primary" size={32} />
          </div>
        ) : editingVenue ? (
          <div className="space-y-6">
            {/* Edit Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.venueName} (English)
                </label>
                <input
                  type="text"
                  value={venueForm.nameEn}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, nameEn: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Venue name in English"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.venueName} (العربية)
                </label>
                <input
                  type="text"
                  value={venueForm.nameAr}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, nameAr: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اسم الموقع بالعربية"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.address} (English)
                </label>
                <input
                  type="text"
                  value={venueForm.addressEn}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, addressEn: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Address in English"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.address} (العربية)
                </label>
                <input
                  type="text"
                  value={venueForm.addressAr}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, addressAr: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="العنوان بالعربية"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.about} (English)
                </label>
                <textarea
                  value={venueForm.aboutEn}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, aboutEn: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="About the venue in English"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.about} (العربية)
                </label>
                <textarea
                  value={venueForm.aboutAr}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, aboutAr: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="نبذة عن الموقع بالعربية"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Phone size={16} className="inline mr-1" />
                  {language === "ar" ? "رقم الهاتف" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={venueForm.phone}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+962 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Mail size={16} className="inline mr-1" />
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  value={venueForm.email}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="info@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Globe size={16} className="inline mr-1" />
                  {language === "ar" ? "رابط الخريطة" : "Map URL"}
                </label>
                <input
                  type="url"
                  value={venueForm.mapUrl}
                  onChange={(e) =>
                    setVenueForm({ ...venueForm, mapUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <label className="text-base sm:text-lg font-semibold text-primary">
                  {t.features}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setVenueForm({
                      ...venueForm,
                      features: [...venueForm.features, { en: "", ar: "" }],
                    });
                  }}
                  className="px-3 sm:px-4 py-2 bg-accent/20 text-primary rounded-lg hover:bg-accent/30 transition-colors text-sm font-medium self-start sm:self-auto"
                >
                  + {t.addFeature}
                </button>
              </div>
              <div className="space-y-4">
                {venueForm.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 items-start p-4 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                      <input
                        type="text"
                        value={feature.en}
                        onChange={(e) => {
                          const newFeatures = [...venueForm.features];
                          newFeatures[index] = {
                            ...newFeatures[index],
                            en: e.target.value,
                          };
                          setVenueForm({ ...venueForm, features: newFeatures });
                        }}
                        className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t.featureEn}
                      />
                      <input
                        type="text"
                        value={feature.ar}
                        onChange={(e) => {
                          const newFeatures = [...venueForm.features];
                          newFeatures[index] = {
                            ...newFeatures[index],
                            ar: e.target.value,
                          };
                          setVenueForm({ ...venueForm, features: newFeatures });
                        }}
                        className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t.featureAr}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = venueForm.features.filter(
                          (_, i) => i !== index,
                        );
                        setVenueForm({ ...venueForm, features: newFeatures });
                      }}
                      className="w-full sm:w-auto px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium self-start sm:self-auto"
                    >
                      {t.removeFeature}
                    </button>
                  </div>
                ))}
                {venueForm.features.length === 0 && (
                  <div className="text-center py-8 text-neutral-400">
                    {language === "ar"
                      ? "لا توجد ميزات. اضغط على إضافة ميزة للبدء."
                      : "No features yet. Click Add Feature to start."}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setEditingVenue(false)}
                disabled={venueSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={18} />
                {t.cancel}
              </button>
              <button
                onClick={handleVenueSave}
                disabled={venueSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {venueSaving ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {t.saveChanges}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : venueData ? (
          <div className="space-y-6">
            {/* Display Current Venue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="text-sm text-neutral-600 mb-2">
                  {t.venueName}
                </div>
                <div className="text-xl font-bold text-primary mb-1">
                  {language === "ar" ? venueData.nameAr : venueData.nameEn}
                </div>
                <div className="text-sm text-neutral-500">
                  {language === "ar" ? venueData.nameEn : venueData.nameAr}
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="text-sm text-neutral-600 mb-2">{t.address}</div>
                <div className="text-base text-primary mb-1">
                  {language === "ar"
                    ? venueData.addressAr
                    : venueData.addressEn}
                </div>
                <div className="text-sm text-neutral-500">
                  {language === "ar"
                    ? venueData.addressEn
                    : venueData.addressAr}
                </div>
              </div>
              <div className="md:col-span-2 bg-neutral-50 rounded-xl p-6">
                <div className="text-sm text-neutral-600 mb-2">{t.about}</div>
                <div className="text-sm text-neutral-700 leading-relaxed">
                  {language === "ar" ? venueData.aboutAr : venueData.aboutEn}
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="text-xs text-blue-600 font-medium mb-1">
                    {language === "ar" ? "الهاتف" : "Phone"}
                  </div>
                  <div className="text-sm font-semibold text-neutral-800">
                    {venueData.phone}
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-purple-600" size={20} />
                </div>
                <div>
                  <div className="text-xs text-purple-600 font-medium mb-1">
                    {language === "ar" ? "البريد" : "Email"}
                  </div>
                  <div className="text-sm font-semibold text-neutral-800">
                    {venueData.email}
                  </div>
                </div>
              </div>
              <div className="bg-accent/10 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Globe className="text-primary" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-primary font-medium mb-1">
                    {language === "ar" ? "الخريطة" : "Map"}
                  </div>
                  <a
                    href={venueData.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-600 hover:underline truncate block"
                  >
                    {language === "ar" ? "عرض الموقع" : "View Location"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            {language === "ar" ? "لا توجد بيانات" : "No data available"}
          </div>
        )}
      </motion.div>

      {/* Patron Name Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
              <Users className="text-primary" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t.patronManagement}
            </h2>
          </div>
          {!editingPatron && (
            <button
              onClick={handlePatronEdit}
              disabled={patronLoading}
              className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              <Edit size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
              {t.editPatron}
            </button>
          )}
        </div>

        {patronLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : editingPatron ? (
          <div className="space-y-6">
            {/* Patron Name Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.patronNameEn}
                </label>
                <input
                  type="text"
                  value={patronForm.patronNameEn}
                  onChange={(e) =>
                    setPatronForm({
                      ...patronForm,
                      patronNameEn: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Prof. Dr. Ismail Yamin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t.patronNameAr}
                </label>
                <input
                  type="text"
                  value={patronForm.patronNameAr}
                  onChange={(e) =>
                    setPatronForm({
                      ...patronForm,
                      patronNameAr: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  placeholder="الأستاذ الدكتور إسماعيل يامين"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setEditingPatron(false)}
                disabled={patronSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={18} />
                {t.cancel}
              </button>
              <button
                onClick={handlePatronSave}
                disabled={patronSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {patronSaving ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {t.saveChanges}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : patronData ? (
          <div className="space-y-6">
            {/* Display Current Patron */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="text-sm text-neutral-600 mb-2">
                  {t.patronNameEn}
                </div>
                <div className="text-xl font-bold text-primary">
                  {patronData.patronNameEn}
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="text-sm text-neutral-600 mb-2">
                  {t.patronNameAr}
                </div>
                <div className="text-xl font-bold text-primary" dir="rtl">
                  {patronData.patronNameAr}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            {language === "ar" ? "لا توجد بيانات" : "No data available"}
          </div>
        )}
      </motion.div>

      {/* Important Dates Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Calendar className="text-primary" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t.datesManagement}
            </h2>
          </div>
          {!editingDates && (
            <button
              onClick={handleDatesEdit}
              disabled={datesLoading}
              className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center gap-2 text-sm sm:text-base self-start sm:self-auto"
            >
              <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="whitespace-nowrap">{t.editDates}</span>
            </button>
          )}
        </div>

        {datesLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-primary" size={32} />
          </div>
        ) : editingDates ? (
          <div className="space-y-6">
            {/* Edit Form */}
            <div className="space-y-4">
              {datesForm.map((date, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-neutral-50 rounded-xl border border-neutral-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        #{index + 1}
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={date.highlight}
                          onChange={(e) =>
                            handleDateUpdate(
                              index,
                              "highlight",
                              e.target.checked,
                            )
                          }
                          className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-neutral-700">
                          {t.highlightDate}
                        </span>
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDateRemove(index)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium self-start sm:self-auto"
                    >
                      {t.removeDate}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.dateTitle} (English)
                      </label>
                      <input
                        type="text"
                        value={date.titleEn}
                        onChange={(e) =>
                          handleDateUpdate(index, "titleEn", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Title in English"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.dateTitle} (العربية)
                      </label>
                      <input
                        type="text"
                        value={date.titleAr}
                        onChange={(e) =>
                          handleDateUpdate(index, "titleAr", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="العنوان بالعربية"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.dateDate}
                      </label>
                      <input
                        type="text"
                        value={date.date}
                        onChange={(e) =>
                          handleDateUpdate(index, "date", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="DD/MM/YYYY or 8–9 June 2026"
                      />
                    </div>
                    <div />
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.dateDesc} (English)
                      </label>
                      <textarea
                        value={date.descEn}
                        onChange={(e) =>
                          handleDateUpdate(index, "descEn", e.target.value)
                        }
                        rows={2}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Description in English"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.dateDesc} (العربية)
                      </label>
                      <textarea
                        value={date.descAr}
                        onChange={(e) =>
                          handleDateUpdate(index, "descAr", e.target.value)
                        }
                        rows={2}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="الوصف بالعربية"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Date Button */}
            <button
              type="button"
              onClick={handleDateAdd}
              className="w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-primary font-medium text-sm sm:text-base"
            >
              <Calendar size={20} />
              {t.addDate}
            </button>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setEditingDates(false)}
                disabled={datesSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={18} />
                {t.cancel}
              </button>
              <button
                onClick={handleDatesSave}
                disabled={datesSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {datesSaving ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {t.saveChanges}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Display Current Dates */}
            {importantDates && importantDates.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {importantDates.map((date, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 rounded-xl border ${
                      date.highlight
                        ? "bg-primary/5 border-primary/20"
                        : "bg-neutral-50 border-neutral-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-primary">
                            {language === "ar" ? date.titleAr : date.titleEn}
                          </h3>
                          {date.highlight && (
                            <span className="px-2 py-1 bg-accent/20 text-primary text-xs font-bold rounded-full whitespace-nowrap">
                              {language === "ar" ? "مميز" : "Highlight"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">
                          {language === "ar" ? date.descAr : date.descEn}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-mono bg-white px-3 py-1 rounded-lg border border-neutral-200 self-start">
                        <Calendar size={14} className="text-accent shrink-0" />
                        <span className="text-primary whitespace-nowrap">
                          {date.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-400">
                {language === "ar" ? "لا توجد تواريخ" : "No dates available"}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Sponsors Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
              <Users className="text-primary" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t.sponsorsManagement}
            </h2>
          </div>
          {!editingSponsors && (
            <button
              onClick={handleSponsorsEdit}
              disabled={sponsorsLoading}
              className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              <Edit size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
              {t.editSponsors}
            </button>
          )}
        </div>

        {sponsorsLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : editingSponsors ? (
          <div className="space-y-6">
            {/* Sponsors Form */}
            {sponsorsForm.map((sponsor, index) => (
              <div
                key={index}
                className="p-4 border-2 border-neutral-200 rounded-xl bg-neutral-50 space-y-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-primary">
                    {language === "ar"
                      ? `راعي ${index + 1}`
                      : `Sponsor ${index + 1}`}
                  </h3>
                  <button
                    onClick={() => handleSponsorRemove(index)}
                    className="w-full sm:w-auto px-3 py-1 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-2"
                  >
                    <X size={16} />
                    {t.removeSponsor}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.sponsorNameEn}
                    </label>
                    <input
                      type="text"
                      value={sponsor.nameEn}
                      onChange={(e) =>
                        handleSponsorUpdate(index, "nameEn", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.sponsorNameAr}
                    </label>
                    <input
                      type="text"
                      value={sponsor.nameAr}
                      onChange={(e) =>
                        handleSponsorUpdate(index, "nameAr", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                      placeholder="اسم الشركة"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.sponsorLogo}
                    </label>
                    <input
                      type="text"
                      value={sponsor.logoUrl}
                      onChange={(e) =>
                        handleSponsorUpdate(index, "logoUrl", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.sponsorWebsite}
                    </label>
                    <input
                      type="text"
                      value={sponsor.websiteUrl || ""}
                      onChange={(e) =>
                        handleSponsorUpdate(index, "websiteUrl", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t.sponsorOrder}
                  </label>
                  <input
                    type="number"
                    value={sponsor.order}
                    onChange={(e) =>
                      handleSponsorUpdate(
                        index,
                        "order",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}

            {/* Add Sponsor Button */}
            <button
              type="button"
              onClick={handleSponsorAdd}
              className="w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-primary font-medium text-sm sm:text-base"
            >
              <Users size={20} />
              {t.addSponsor}
            </button>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setEditingSponsors(false)}
                disabled={sponsorsSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={18} />
                {t.cancel}
              </button>
              <button
                onClick={handleSponsorsSave}
                disabled={sponsorsSaving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sponsorsSaving ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {t.saveChanges}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : sponsors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors
              .sort((a, b) => a.order - b.order)
              .map((sponsor, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-neutral-200 bg-neutral-50 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-full h-32 bg-white rounded-lg border border-neutral-200 flex items-center justify-center p-4">
                      {sponsor.logoUrl ? (
                        <img
                          src={sponsor.logoUrl}
                          alt={
                            language === "ar" ? sponsor.nameAr : sponsor.nameEn
                          }
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Users size={48} className="text-neutral-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-1">
                        {language === "ar" ? sponsor.nameAr : sponsor.nameEn}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {language === "ar" ? sponsor.nameEn : sponsor.nameAr}
                      </p>
                    </div>
                    {sponsor.websiteUrl && (
                      <a
                        href={sponsor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <Globe size={14} />
                        {language === "ar" ? "الموقع الإلكتروني" : "Website"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-400">
            {language === "ar" ? "لا يوجد رعاة" : "No sponsors available"}
          </div>
        )}
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}

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
      </div>

      {/* System Status */}
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

        {/* System Status */}
        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-black">
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
