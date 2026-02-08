import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { messageAPI } from "../../services/api";

interface ContactUsProps {
  language: "en" | "ar";
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as { data?: { error?: string }; message?: string };
    return maybeError.data?.error || maybeError.message || fallback;
  }

  return fallback;
};

export default function ContactUs({ language }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isRtl = language === "ar";

  const t = {
    en: {
      title: "Get in Touch",
      subtitle: "Have questions? Our team is here to help you.",
      formTitle: "Send a Direct Message",
      contactInfo: "Official Channels",
      email: "CISRAI2026@aau.edu.jo",
      phone: "+962 6 4790222",
      address: "Jordan Street, Mobis, Amman, Jordan",
      submit: "Send Message",
      sending: "Sending...",
      name: "Name",
      emailLabel: "Email",
      subject: "Subject",
      message: "Message",
      successMessage:
        "Message sent successfully! We will get back to you soon.",
      errorMessage: "Failed to send message. Please try again.",
      privacyNote:
        "We respect your privacy. Your data will only be used to contact you regarding your inquiry.",
      follow: "Follow Us",
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "هل لديك استفسارات؟ فريقنا هنا لمساعدتك.",
      formTitle: "أرسل رسالة مباشرة",
      contactInfo: "القنوات الرسمية",
      email: "CISRAI2026@aau.edu.jo",
      phone: "4790222 6 962+",
      address: "شارع الأردن، موبص، عمان، الأردن",
      submit: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      name: "الاسم",
      emailLabel: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      successMessage: "تم إرسال الرسالة بنجاح! سنعود إليك قريباً.",
      errorMessage: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      privacyNote:
        "نحن نحترم خصوصيتك. لن يتم استخدام بياناتك إلا للتواصل معك بخصوص استفسارك.",
      follow: "تابعنا",
    },
  }[language];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await messageAPI.send(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, t.errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20 border border-accent/10">
              <h2 className="text-2xl font-bold mb-10 relative z-10 text-white">
                {t.contactInfo}
              </h2>
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Mail size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      {isRtl ? "البريد الإلكتروني" : "Email"}
                    </div>
                    <div className="text-sm font-medium break-all text-secondary">
                      {t.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Phone size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      {isRtl ? "الهاتف" : "Phone"}
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {t.phone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      {isRtl ? "العنوان" : "Address"}
                    </div>
                    <div className="text-sm font-medium leading-relaxed text-secondary">
                      {t.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -mr-16 -mt-16 blur-3xl opacity-20" />
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
              <h3 className="font-bold text-primary mb-6">{t.follow}</h3>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-all border border-accent/10"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center border border-accent/10">
                  <MessageSquare size={24} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {t.formTitle}
                </h2>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm flex items-gap-2"
                >
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm flex items-gap-2"
                >
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{t.successMessage}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all h-40 resize-none"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>{t.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-8 flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-accent/10">
              <ShieldCheck className="text-accent shrink-0" size={20} />
              <p className="text-primary/70 font-medium text-sm leading-relaxed">
                {t.privacyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
