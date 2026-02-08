import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Mic2,
  Search,
  ToggleLeft,
  ToggleRight,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { speakerAPI } from "../../services/api";

interface SpeakersManagementProps {
  language: "en" | "ar";
}

interface Speaker {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  keynote: {
    en: string;
    ar: string;
  };
  affiliation: {
    en: string;
    ar: string;
  };
  bio?: {
    en: string;
    ar: string;
  };
  email?: string;
  phone?: string;
  photo?: string;
  socialLinks?: string;
  order: number;
  status: "active" | "inactive";
}

export default function SpeakersManagement({
  language,
}: SpeakersManagementProps) {
  const isRtl = language === "ar";
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    roleEn: "",
    roleAr: "",
    titleEn: "",
    titleAr: "",
    keynoteEn: "",
    keynoteAr: "",
    affiliationEn: "",
    affiliationAr: "",
    bioEn: "",
    bioAr: "",
    email: "",
    phone: "",
    photo: "",
    order: 0,
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      setLoading(true);
      const response = await speakerAPI.getAll(1, 100);

      // API returns { data: { data: Speaker[], meta } }
      const payload =
        (response as { data?: { data?: Speaker[] } }).data?.data ?? [];

      if (response.success && Array.isArray(payload)) {
        // Filter valid bilingual speakers only
        const validSpeakers = payload.filter(
          (s: any) =>
            s.name &&
            typeof s.name === "object" &&
            s.name.en &&
            s.name.ar &&
            s.role &&
            typeof s.role === "object" &&
            s.role.en &&
            s.role.ar,
        );
        setSpeakers(validSpeakers);
      }
    } catch (error) {
      console.error("Failed to load speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Keynote Speakers Management",
      subtitle: "Manage conference speakers and their presentations",
      addSpeaker: "Add Speaker",
      search: "Search speakers...",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      roleEn: "Role (English)",
      roleAr: "Role (Arabic)",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      keynoteEn: "Keynote (English)",
      keynoteAr: "Keynote (Arabic)",
      affiliationEn: "Affiliation (English)",
      affiliationAr: "Affiliation (Arabic)",
      bioEn: "Bio (English)",
      bioAr: "Bio (Arabic)",
      email: "Email",
      phone: "Phone",
      photo: "Photo URL",
      order: "Display Order",
      status: "Status",
      actions: "Actions",
      active: "Active",
      inactive: "Inactive",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      addNew: "Add New Speaker",
      editSpeaker: "Edit Speaker",
      totalSpeakers: "Total Speakers",
      activeSpeakers: "Active Speakers",
    },
    ar: {
      title: "إدارة المتحدثين الرئيسيين",
      subtitle: "إدارة متحدثي المؤتمر وعروضهم التقديمية",
      addSpeaker: "إضافة متحدث",
      search: "البحث عن المتحدثين...",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      roleEn: "الدور (إنجليزي)",
      roleAr: "الدور (عربي)",
      titleEn: "اللقب (إنجليزي)",
      titleAr: "اللقب (عربي)",
      keynoteEn: "الكلمة الرئيسية (إنجليزي)",
      keynoteAr: "الكلمة الرئيسية (عربي)",
      affiliationEn: "الانتماء (إنجليزي)",
      affiliationAr: "الانتماء (عربي)",
      bioEn: "السيرة الذاتية (إنجليزي)",
      bioAr: "السيرة الذاتية (عربي)",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      photo: "رابط الصورة",
      order: "ترتيب العرض",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشط",
      inactive: "غير نشط",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      addNew: "إضافة متحدث جديد",
      editSpeaker: "تعديل المتحدث",
      totalSpeakers: "إجمالي المتحدثين",
      activeSpeakers: "المتحدثون النشطون",
    },
  }[language];

  const handleAdd = async () => {
    if (
      !formData.nameEn ||
      !formData.nameAr ||
      !formData.roleEn ||
      !formData.roleAr ||
      !formData.titleEn ||
      !formData.titleAr ||
      !formData.keynoteEn ||
      !formData.keynoteAr ||
      !formData.affiliationEn ||
      !formData.affiliationAr
    )
      return;

    setSaving(true);
    try {
      const payload = {
        name: { en: formData.nameEn, ar: formData.nameAr },
        role: { en: formData.roleEn, ar: formData.roleAr },
        title: { en: formData.titleEn, ar: formData.titleAr },
        keynote: { en: formData.keynoteEn, ar: formData.keynoteAr },
        affiliation: { en: formData.affiliationEn, ar: formData.affiliationAr },
        bio:
          formData.bioEn || formData.bioAr
            ? { en: formData.bioEn, ar: formData.bioAr }
            : undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        photo: formData.photo || undefined,
        order: formData.order,
        status: formData.status,
      };

      const response = await speakerAPI.create(payload);
      if (response.success) {
        await loadSpeakers();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add speaker:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      nameEn: speaker.name.en,
      nameAr: speaker.name.ar,
      roleEn: speaker.role.en,
      roleAr: speaker.role.ar,
      titleEn: speaker.title.en,
      titleAr: speaker.title.ar,
      keynoteEn: speaker.keynote.en,
      keynoteAr: speaker.keynote.ar,
      affiliationEn: speaker.affiliation.en,
      affiliationAr: speaker.affiliation.ar,
      bioEn: speaker.bio?.en || "",
      bioAr: speaker.bio?.ar || "",
      email: speaker.email || "",
      phone: speaker.phone || "",
      photo: speaker.photo || "",
      order: speaker.order,
      status: speaker.status,
    });
    setShowAddForm(true);
  };

  const handleUpdate = async () => {
    if (!editingSpeaker) return;

    setSaving(true);
    try {
      const payload = {
        name: { en: formData.nameEn, ar: formData.nameAr },
        role: { en: formData.roleEn, ar: formData.roleAr },
        title: { en: formData.titleEn, ar: formData.titleAr },
        keynote: { en: formData.keynoteEn, ar: formData.keynoteAr },
        affiliation: { en: formData.affiliationEn, ar: formData.affiliationAr },
        bio:
          formData.bioEn || formData.bioAr
            ? { en: formData.bioEn, ar: formData.bioAr }
            : undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        photo: formData.photo || undefined,
        order: formData.order,
        status: formData.status,
      };

      await speakerAPI.update(editingSpeaker._id, payload);
      await loadSpeakers();
      resetForm();
    } catch (error) {
      console.error("Failed to update speaker:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        isRtl
          ? "هل أنت متأكد من حذف هذا المتحدث؟"
          : "Are you sure you want to delete this speaker?",
      )
    )
      return;

    try {
      await speakerAPI.delete(id);
      setSpeakers(speakers.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Failed to delete speaker:", error);
    }
  };

  const toggleStatus = async (speaker: Speaker) => {
    try {
      const payload = {
        name: speaker.name,
        role: speaker.role,
        title: speaker.title,
        keynote: speaker.keynote,
        affiliation: speaker.affiliation,
        bio: speaker.bio,
        email: speaker.email,
        phone: speaker.phone,
        photo: speaker.photo,
        order: speaker.order,
        status: speaker.status === "active" ? "inactive" : "active",
      };
      await speakerAPI.update(speaker._id, payload);
      await loadSpeakers();
    } catch (error) {
      console.error("Failed to toggle speaker status:", error);
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingSpeaker(null);
    setFormData({
      nameEn: "",
      nameAr: "",
      roleEn: "",
      roleAr: "",
      titleEn: "",
      titleAr: "",
      keynoteEn: "",
      keynoteAr: "",
      affiliationEn: "",
      affiliationAr: "",
      bioEn: "",
      bioAr: "",
      email: "",
      phone: "",
      photo: "",
      order: 0,
      status: "active",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">{t.title}</h2>
          <p className="text-neutral-500 mt-1">{t.subtitle}</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-accent transition-all shadow-lg"
        >
          <Plus size={20} />
          <span>{t.addSpeaker}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <Mic2 className="text-primary" size={24} />
            <div>
              <p className="text-neutral-600 text-sm">{t.totalSpeakers}</p>
              <p className="text-3xl font-bold text-primary">
                {speakers.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <Mic2 className="text-primary" size={24} />
            <div>
              <p className="text-neutral-600 text-sm">{t.activeSpeakers}</p>
              <p className="text-3xl font-bold text-primary">
                {speakers.filter((s) => s.status === "active").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-lg"
          >
            <h3 className="text-xl font-bold text-primary mb-6">
              {editingSpeaker ? t.editSpeaker : t.addNew}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Name Fields */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.nameEn} *
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.nameAr} *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  dir="rtl"
                />
              </div>

              {/* Role Fields */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.roleEn} *
                </label>
                <input
                  type="text"
                  value={formData.roleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, roleEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Keynote Speaker"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.roleAr} *
                </label>
                <input
                  type="text"
                  value={formData.roleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, roleAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="مثال: متحدث رئيسي"
                  dir="rtl"
                />
              </div>

              {/* Title Fields */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.titleEn} *
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Professor of Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.titleAr} *
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="مثال: أستاذ علوم الحاسب"
                  dir="rtl"
                />
              </div>

              {/* Keynote Fields */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.keynoteEn} *
                </label>
                <input
                  type="text"
                  value={formData.keynoteEn}
                  onChange={(e) =>
                    setFormData({ ...formData, keynoteEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., AI and the Future of Education"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.keynoteAr} *
                </label>
                <input
                  type="text"
                  value={formData.keynoteAr}
                  onChange={(e) =>
                    setFormData({ ...formData, keynoteAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="مثال: الذكاء الاصطناعي ومستقبل التعليم"
                  dir="rtl"
                />
              </div>

              {/* Affiliation Fields */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.affiliationEn} *
                </label>
                <input
                  type="text"
                  value={formData.affiliationEn}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliationEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.affiliationAr} *
                </label>
                <input
                  type="text"
                  value={formData.affiliationAr}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliationAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  dir="rtl"
                />
              </div>

              {/* Bio Fields (Optional) */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.bioEn}
                </label>
                <textarea
                  value={formData.bioEn}
                  onChange={(e) =>
                    setFormData({ ...formData, bioEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.bioAr}
                </label>
                <textarea
                  value={formData.bioAr}
                  onChange={(e) =>
                    setFormData({ ...formData, bioAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  rows={3}
                  dir="rtl"
                />
              </div>

              {/* Contact & Other Fields */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.photo}
                </label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.order}
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.status}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={editingSpeaker ? handleUpdate : handleAdd}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all disabled:opacity-50"
              >
                {saving && <Loader size={16} className="animate-spin" />}
                <span>{saving ? "Saving..." : t.save}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
          size={20}
        />
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <Loader className="animate-spin mx-auto mb-2" size={32} />
          <p className="text-neutral-500">Loading speakers...</p>
        </div>
      ) : (
        /* Speakers Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers
            .filter(
              (speaker) =>
                speaker.name?.en
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.name?.ar
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.affiliation?.en
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.affiliation?.ar
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.keynote?.en
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.keynote?.ar
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map((speaker) => (
              <motion.div
                key={speaker._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={
                      speaker.photo ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                    }
                    alt={speaker.name.en}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => toggleStatus(speaker)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      speaker.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {speaker.status === "active" ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} />
                    )}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-primary mb-1">
                  {speaker.name.en}
                </h3>
                <h4
                  className="text-md font-semibold text-primary/70 mb-1"
                  dir="rtl"
                >
                  {speaker.name.ar}
                </h4>
                <p className="text-sm text-accent mb-2">{speaker.role.en}</p>
                <p className="text-sm text-neutral-600 mb-2">
                  {speaker.title.en}
                </p>
                <p className="text-sm text-neutral-600 mb-3">
                  {speaker.affiliation.en}
                </p>
                <div className="bg-primary/10 px-3 py-2 rounded-lg mb-3">
                  <p className="text-xs text-primary font-medium">
                    {speaker.keynote.en}
                  </p>
                </div>
                <div className="text-xs text-neutral-500 mb-4">
                  Order: {speaker.order}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(speaker)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(speaker._id)}
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
