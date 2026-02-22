import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Loader,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";
import { settingsAPI } from "../../services/api";

interface SettingsManagementProps {
  language: "en" | "ar";
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
}

export default function SettingsManagement({
  language,
}: SettingsManagementProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [venueData, setVenueData] = useState<VenueData>({
    nameEn: "",
    nameAr: "",
    addressEn: "",
    addressAr: "",
    aboutEn: "",
    aboutAr: "",
    phone: "",
    email: "",
    mapUrl: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const t = {
    en: {
      title: "Venue Settings",
      subtitle: "Manage conference venue information",
      nameEn: "Venue Name (English)",
      nameAr: "Venue Name (Arabic)",
      addressEn: "Address (English)",
      addressAr: "Address (Arabic)",
      aboutEn: "About (English)",
      aboutAr: "About (Arabic)",
      phone: "Phone Number",
      email: "Email Address",
      mapUrl: "Google Maps URL",
      save: "Save Changes",
      saving: "Saving...",
      successMessage: "Venue settings updated successfully!",
      errorMessage: "Failed to update venue settings. Please try again.",
    },
    ar: {
      title: "إعدادات الموقع",
      subtitle: "إدارة معلومات موقع المؤتمر",
      nameEn: "اسم الموقع (بالإنجليزية)",
      nameAr: "اسم الموقع (بالعربية)",
      addressEn: "العنوان (بالإنجليزية)",
      addressAr: "العنوان (بالعربية)",
      aboutEn: "حول الموقع (بالإنجليزية)",
      aboutAr: "حول الموقع (بالعربية)",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      mapUrl: "رابط Google Maps",
      save: "حفظ التغييرات",
      saving: "جارٍ الحفظ...",
      successMessage: "تم تحديث إعدادات الموقع بنجاح!",
      errorMessage: "فشل تحديث إعدادات الموقع. يرجى المحاولة مرة أخرى.",
    },
  }[language];

  useEffect(() => {
    fetchVenueData();
  }, []);

  const fetchVenueData = async () => {
    try {
      setLoading(true);
      const response = (await settingsAPI.getVenue()) as {
        success: boolean;
        data: VenueData;
      };
      if (response.success && response.data) {
        setVenueData(response.data);
      }
    } catch (error) {
      console.error("Error fetching venue data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      const response = (await settingsAPI.updateVenue(
        venueData as unknown as Record<string, unknown>,
      )) as { success: boolean };
      if (response.success) {
        setMessage({ type: "success", text: t.successMessage });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error("Error updating venue data:", error);
      setMessage({ type: "error", text: t.errorMessage });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof VenueData, value: string) => {
    setVenueData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Settings className="text-primary" size={32} />
          <h1 className="text-4xl font-bold text-primary">{t.title}</h1>
        </div>
        <p className="text-neutral-500">{t.subtitle}</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200"
      >
        <div className="space-y-6">
          {/* Venue Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {t.nameEn}
                </div>
              </label>
              <input
                type="text"
                value={venueData.nameEn}
                onChange={(e) => handleChange("nameEn", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Amman Arab University"
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-bold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {t.nameAr}
                </div>
              </label>
              <input
                type="text"
                value={venueData.nameAr}
                onChange={(e) => handleChange("nameAr", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-right"
                placeholder="جامعة عمان العربية"
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                {t.addressEn}
              </label>
              <input
                type="text"
                value={venueData.addressEn}
                onChange={(e) => handleChange("addressEn", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Jordan Street, Mobis, Amman, Jordan"
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-bold text-primary mb-2">
                {t.addressAr}
              </label>
              <input
                type="text"
                value={venueData.addressAr}
                onChange={(e) => handleChange("addressAr", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-right"
                placeholder="شارع الأردن، موبص، عمان، الأردن"
              />
            </div>
          </div>

          {/* About */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                {t.aboutEn}
              </label>
              <textarea
                value={venueData.aboutEn}
                onChange={(e) => handleChange("aboutEn", e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="About the venue..."
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-bold text-primary mb-2">
                {t.aboutAr}
              </label>
              <textarea
                value={venueData.aboutAr}
                onChange={(e) => handleChange("aboutAr", e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-right"
                placeholder="حول الموقع..."
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {t.phone}
                </div>
              </label>
              <input
                type="tel"
                value={venueData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+962 7 9887 2239"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {t.email}
                </div>
              </label>
              <input
                type="email"
                value={venueData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="info@aau.edu.jo"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  {t.mapUrl}
                </div>
              </label>
              <input
                type="url"
                value={venueData.mapUrl}
                onChange={(e) => handleChange("mapUrl", e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-neutral-200">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-3 hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {saving ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>{t.saving}</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>{t.save}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
