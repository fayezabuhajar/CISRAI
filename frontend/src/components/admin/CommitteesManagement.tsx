import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Users, Search, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { committeeAPI } from "../../services/api";

interface CommitteesManagementProps {
  language: "en" | "ar";
}

interface CommitteeMember {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  committee: "scientific" | "preparatory" | "media" | "technical";
  title: {
    en: string;
    ar: string;
  };
  affiliation?: {
    en: string;
    ar: string;
  };
  email?: string;
  order: number;
}

export default function CommitteesManagement({
  language,
}: CommitteesManagementProps) {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    committee: "scientific" as
      | "scientific"
      | "preparatory"
      | "media"
      | "technical",
    titleEn: "",
    titleAr: "",
    affiliationEn: "",
    affiliationAr: "",
    email: "",
    order: 0,
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await committeeAPI.getAll(1, 1000);
      console.log("Committees response:", response);
      if (response.success && response.data?.data) {
        // Filter out old records with invalid structure
        const validMembers = response.data.data.filter(
          (m: any) =>
            m.name && typeof m.name === "object" && m.name.en && m.name.ar,
        );
        console.log("Valid members:", validMembers);
        setMembers(validMembers);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Failed to load committees:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Committees Management",
      subtitle: "Manage committee members and their roles",
      addMember: "Add Member",
      search: "Search members...",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      affiliationEn: "Affiliation (English)",
      affiliationAr: "Affiliation (Arabic)",
      committee: "Committee",
      email: "Email",
      order: "Order",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      addNew: "Add New Member",
      editMember: "Edit Member",
      totalMembers: "Total Members",
      loading: "Loading...",
      saving: "Saving...",
      confirmDelete: "Are you sure you want to delete this member?",
      scientific: "Scientific Committee",
      preparatory: "Preparatory Committee",
      media: "Media Committee",
      technical: "Technical Committee",
    },
    ar: {
      title: "إدارة اللجان",
      subtitle: "إدارة أعضاء اللجان وأدوارهم",
      addMember: "إضافة عضو",
      search: "البحث عن الأعضاء...",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      titleEn: "المنصب (إنجليزي)",
      titleAr: "المنصب (عربي)",
      affiliationEn: "الانتساب (إنجليزي)",
      affiliationAr: "الانتساب (عربي)",
      committee: "اللجنة",
      email: "البريد الإلكتروني",
      order: "الترتيب",
      actions: "الإجراءات",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      addNew: "إضافة عضو جديد",
      editMember: "تعديل العضو",
      totalMembers: "إجمالي الأعضاء",
      loading: "جاري التحميل...",
      saving: "جاري الحفظ...",
      confirmDelete: "هل أنت متأكد من حذف هذا العضو؟",
      scientific: "اللجنة العلمية",
      preparatory: "اللجنة التحضيرية",
      media: "اللجنة الإعلامية",
      technical: "اللجنة الفنية والتقنية",
    },
  }[language];

  const filteredMembers = members.filter(
    (m) =>
      m.name?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name?.ar?.includes(searchQuery) ||
      m.committee?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAdd = async () => {
    if (
      !formData.nameEn ||
      !formData.nameAr ||
      !formData.titleEn ||
      !formData.titleAr
    )
      return;

    setSaving(true);
    try {
      const payload = {
        name: { en: formData.nameEn, ar: formData.nameAr },
        committee: formData.committee,
        title: { en: formData.titleEn, ar: formData.titleAr },
        affiliation:
          formData.affiliationEn && formData.affiliationAr
            ? { en: formData.affiliationEn, ar: formData.affiliationAr }
            : undefined,
        email: formData.email || undefined,
        order: formData.order,
      };
      const response = await committeeAPI.create(payload);
      if (response.success) {
        await loadMembers();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add member:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingMember) return;

    setSaving(true);
    try {
      const payload = {
        name: { en: formData.nameEn, ar: formData.nameAr },
        committee: formData.committee,
        title: { en: formData.titleEn, ar: formData.titleAr },
        affiliation:
          formData.affiliationEn && formData.affiliationAr
            ? { en: formData.affiliationEn, ar: formData.affiliationAr }
            : undefined,
        email: formData.email || undefined,
        order: formData.order,
      };
      await committeeAPI.update(editingMember._id, payload);
      await loadMembers();
      resetForm();
    } catch (error) {
      console.error("Failed to update member:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.confirmDelete)) return;

    try {
      await committeeAPI.delete(id);
      setMembers(members.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const startEdit = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormData({
      nameEn: member.name.en,
      nameAr: member.name.ar,
      committee: member.committee,
      titleEn: member.title.en,
      titleAr: member.title.ar,
      affiliationEn: member.affiliation?.en || "",
      affiliationAr: member.affiliation?.ar || "",
      email: member.email || "",
      order: member.order,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingMember(null);
    setFormData({
      nameEn: "",
      nameAr: "",
      committee: "scientific",
      titleEn: "",
      titleAr: "",
      affiliationEn: "",
      affiliationAr: "",
      email: "",
      order: 0,
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
          <span>{t.addMember}</span>
        </button>
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
              {editingMember ? t.editMember : t.addNew}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
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
                  required
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
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.committee} *
                </label>
                <select
                  value={formData.committee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      committee: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  required
                >
                  <option value="scientific">{t.scientific}</option>
                  <option value="preparatory">{t.preparatory}</option>
                  <option value="media">{t.media}</option>
                  <option value="technical">{t.technical}</option>
                </select>
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
                  min="0"
                />
              </div>
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
                  required
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
                  dir="rtl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t.affiliationEn}
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
                  {t.affiliationAr}
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
              <div className="col-span-2">
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
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={editingMember ? handleUpdate : handleAdd}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all disabled:opacity-50"
              >
                {saving && <Loader size={16} className="animate-spin" />}
                <span>{saving ? t.saving : t.save}</span>
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
          <p className="text-neutral-500">{t.loading}</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <Users className="text-primary" size={24} />
              <div>
                <p className="text-neutral-600 text-sm">{t.totalMembers}</p>
                <p className="text-3xl font-bold text-primary">
                  {members.length}
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.nameEn}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.nameAr}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.committee}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.titleEn}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.order}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredMembers.map((member) => (
                    <motion.tr
                      key={member._id}
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    >
                      <td className="px-6 py-4 font-medium text-primary">
                        {member.name.en}
                      </td>
                      <td className="px-6 py-4 text-neutral-600" dir="rtl">
                        {member.name.ar}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {t[member.committee]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {member.title.en}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {member.order}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => startEdit(member)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12 text-neutral-500">
                <Users size={48} className="mx-auto opacity-20 mb-4" />
                <p>
                  {language === "ar" ? "لا توجد بيانات" : "No data available"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
