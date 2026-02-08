import {
  Award,
  CheckCircle,
  FileCheck,
  Send,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { reviewerAPI } from "../../services/api";

interface BecomeReviewerProps {
  language: "en" | "ar";
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      data?: {
        error?: string;
        message?: string;
        errors?: Array<{ msg?: string }>;
      };
      message?: string;
    };
    const validationMessage = maybeError.data?.errors?.[0]?.msg;
    return (
      validationMessage ||
      maybeError.data?.error ||
      maybeError.data?.message ||
      maybeError.message ||
      fallback
    );
  }

  return fallback;
};

interface FormData {
  name: string;
  email: string;
  institution: string;
  cv_link: string;
  fields_of_expertise: string;
}

export default function BecomeReviewer({ language }: BecomeReviewerProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    institution: "",
    cv_link: "",
    fields_of_expertise: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isRtl = language === "ar";

  const content = {
    en: {
      title: "Become a Reviewer",
      subtitle: "Join our distinguished scientific committee.",
      eligibility: "Eligibility Criteria",
      responsibilities: "Reviewer Responsibilities",
      benefits: "Member Benefits",
      formTitle: "Expert Application Form",
      name: "Name & Title",
      emailLabel: "Email Address",
      institution: "Academic Institution",
      cv_link: "CV Link (ORCID/Scholar)",
      expertise: "Fields of Expertise (comma separated)",
      submit: "Submit Expert Application",
      submitting: "Submitting...",
      successMessage:
        "Application submitted successfully! We will review your profile.",
      errorMessage: "Failed to submit application. Please try again.",
      constructive: "Provide constructive & timely feedback.",
      ethical: "Adherence to ethical standards.",
    },
    ar: {
      title: "كن محكماً معتمداً",
      subtitle: "انضم إلى لجنتنا العلمية المتميزة.",
      eligibility: "معايير الأهلية",
      responsibilities: "مسؤوليات المحكم",
      benefits: "مزايا العضوية",
      formTitle: "نموذج طلب الخبراء",
      name: "الاسم واللقب",
      emailLabel: "البريد الإلكتروني",
      institution: "المؤسسة الأكاديمية",
      cv_link: "رابط السيرة الذاتية (ORCID/Google Scholar)",
      expertise: "مجالات الخبرة (مفصولة بفاصلة)",
      submit: "إرسال طلب الانضمام",
      submitting: "جاري الإرسال...",
      successMessage: "تم تقديم الطلب بنجاح! سيتم مراجعة ملفك الشخصي.",
      errorMessage: "فشل تقديم الطلب. يرجى المحاولة مرة أخرى.",
      constructive: "تقديم ملاحظات بناءة وفي الوقت المحدد.",
      ethical: "الالتزام بالمعايير الأخلاقية.",
    },
  }[language];

  const eligibility = [
    {
      en: "PhD in Islamic Studies or Sharia.",
      ar: "درجة الدكتوراه في الدراسات الإسلامية أو الشريعة.",
    },
    {
      en: "Active research profile in relevant tracks.",
      ar: "سجل بحثي نشط في المسارات ذات الصلة.",
    },
    {
      en: "Proficiency in Arabic and/or English.",
      ar: "إتقان اللغة العربية و/أو الإنجليزية.",
    },
  ];

  const benefits = [
    { en: "Official Reviewer Certificate.", ar: "شهادة تحكيم رسمية." },
    {
      en: "Recognition in Conference Proceedings.",
      ar: "الاعتراف في وقائع المؤتمر.",
    },
    {
      en: "Priority for Scientific Partnerships.",
      ar: "الأولوية في الشراكات العلمية.",
    },
  ];

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
      const payload = {
        fullName: formData.name,
        email: formData.email,
        affiliation: formData.institution,
        cv: formData.cv_link || undefined,
        expertise: formData.fields_of_expertise
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await reviewerAPI.apply(payload);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        institution: "",
        cv_link: "",
        fields_of_expertise: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, content.errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {content.title}
          </h1>
          <p className="text-neutral-500">{content.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Eligibility */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5"
          >
            <div className="w-12 h-12 bg-secondary text-primary rounded-2xl flex items-center justify-center mb-6 border border-accent/10">
              <UserCheck size={24} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-6">
              {content.eligibility}
            </h2>
            <div className="space-y-4">
              {eligibility.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-neutral-600">
                  <CheckCircle
                    size={16}
                    className="text-accent shrink-0 mt-1"
                  />
                  <span>{isRtl ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-primary p-8 rounded-[32px] text-white shadow-2xl shadow-primary/20 border border-accent/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 text-accent rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <Award size={24} />
              </div>
              <h2 className="text-xl font-bold mb-6 text-white">
                {content.benefits}
              </h2>
              <div className="space-y-4">
                {benefits.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-secondary/80">
                    <CheckCircle
                      size={16}
                      className="text-accent shrink-0 mt-1"
                    />
                    <span>{isRtl ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl opacity-10" />
          </motion.div>

          {/* Responsibilities */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5"
          >
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-primary mb-6">
              {content.responsibilities}
            </h2>
            <div className="space-y-4">
              {[
                {
                  en: content.constructive,
                  ar: "تقديم ملاحظات بناءة وفي الوقت المحدد.",
                },
                { en: content.ethical, ar: "الالتزام بالمعايير الأخلاقية." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-neutral-600">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2" />
                  <span>{isRtl ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-neutral-100 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center border border-accent/20 shadow-lg">
              <FileCheck size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-primary">
              {content.formTitle}
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
              <span>{content.successMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                  {content.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                  {content.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                  {content.institution}
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                  {content.cv_link}
                </label>
                <input
                  type="url"
                  name="cv_link"
                  value={formData.cv_link}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                {content.expertise}
              </label>
              <textarea
                name="fields_of_expertise"
                value={formData.fields_of_expertise}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all h-32"
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
                  <span>{content.submitting}</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>{content.submit}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
