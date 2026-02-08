import { useState } from "react";
import {
  Landmark,
  CheckCircle,
  Calendar,
  Plane,
  ShieldCheck,
  Mail,
  Building,
  User,
  AlertCircle,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { CountryPhoneInput } from "../CountryPhoneInput";
import { registrationAPI } from "../../services/api";

interface RegistrationProps {
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
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  institution: string;
  phone: string;
  country: string;
  registrationType: string;
}

export default function Registration({ language }: RegistrationProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    institution: "",
    phone: "",
    country: "",
    registrationType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isRtl = language === "ar";

  const plans = [
    {
      id: "onsite-paper",
      title: { en: "On-site with Paper", ar: "حضورياً مع بحث" },
      price: 150,
      inclusions: {
        en: [
          "Presentation slot",
          "Proceedings publication",
          "Coffee breaks",
          "Cultural trip",
          "Conference lunch",
          "ID Badge",
          "Certificate",
        ],
        ar: [
          "تقديم البحث",
          "نشر البحث في الوقائع",
          "استراحات قهوة",
          "رحلة ثقافية",
          "غداء المؤتمر",
          "بطاقة تعريفية",
          "شهادة مشاركة",
        ],
      },
    },
    {
      id: "online-paper",
      title: { en: "Online with Paper", ar: "أونلاين مع بحث" },
      price: 50,
      inclusions: {
        en: [
          "Virtual presentation",
          "Proceedings publication",
          "Digital certificate",
        ],
        ar: ["تقديم البحث افتراضياً", "نشر البحث في الوقائع", "شهادة رقمية"],
      },
    },
    {
      id: "attendance",
      title: { en: "Attendance Only", ar: "حضور بدون ورقة" },
      price: 75,
      inclusions: {
        en: [
          "Coffee breaks",
          "Cultural trip",
          "Conference lunch (2 days)",
          "Certificate",
        ],
        ar: [
          "استراحات قهوة",
          "رحلة ثقافية",
          "غداء المؤتمر (يومين)",
          "شهادة حضور",
        ],
      },
    },
  ];

  const t = {
    en: {
      title: "Registration & Fees",
      desc: "Choose your participation mode and register for the conference.",
      currency: "USD",
      perParticipant: "per participant",
      bankTitle: "Bank Transfer Information",
      bankName: "Islamic International Arab Bank",
      branch: "Abu Nusseir",
      iban: "JO68 IIBA 1190 0000 0119 0000 0175 00",
      swift: "IIBAJOAM200",
      paymentNote: "Last payment date: April 30, 2026",
      visaNote:
        "Travel, accommodation, and visa costs are covered by participants.",
      formTitle: "Participant Details",
      submit: "Confirm Registration",
      successMessage:
        "Registration successful! Check your email for confirmation.",
      errorMessage: "Registration failed. Please try again.",
      selectPlan: "Please select a registration plan.",
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      email: "Email Address",
      institution: "Institution",
      phone: "Phone Number",
      registering: "Registering...",
    },
    ar: {
      title: "التسجيل والرسوم",
      desc: "اختر طريقة المشاركة وسجل في المؤتمر.",
      currency: "دولار",
      perParticipant: "لكل مشارك",
      bankTitle: "معلومات التحويل البنكي",
      bankName: "البنك العربي الإسلامي الدولي",
      branch: "أبو نصير",
      iban: "JOXX IIAB XXXX XXXX XXXX XXXX XXXX",
      swift: "IIABJOAX",
      paymentNote: "آخر موعد للدفع: 30 أبريل 2026",
      visaNote: "تكاليف السفر والإقامة والتأشيرة تقع على عاتق المشاركين.",
      formTitle: "بيانات المشارك",
      submit: "تأكيد التسجيل",
      successMessage: "تم التسجيل بنجاح! تحقق من بريدك الإلكتروني للتأكيد.",
      errorMessage: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
      selectPlan: "يرجى اختيار خطة التسجيل.",
      firstName: "الاسم الأول",
      middleName: "الاسم الأوسط",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      institution: "المؤسسة",
      phone: "رقم الهاتف",
      registering: "جاري التسجيل...",
    },
  }[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedPlan) {
      setError(t.selectPlan);
      return;
    }

    setIsLoading(true);
    try {
      const fullName = [
        formData.firstName,
        formData.middleName,
        formData.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      const payload = {
        fullName,
        email: formData.email,
        phone: formData.phone,
        registrationType: selectedPlan,
      };

      await registrationAPI.register(payload);
      setSuccess(true);

      // Reset form
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        institution: "",
        phone: "",
        country: "",
        registrationType: "",
      });
      setSelectedPlan(null);

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, t.errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">{t.desc}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              onClick={() => {
                setSelectedPlan(plan.id);
                setError(null);
              }}
              className={`relative bg-white p-8 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col h-full
                ${selectedPlan === plan.id ? "border-accent shadow-2xl shadow-primary/10" : "border-neutral-100 shadow-xl shadow-primary/5 hover:border-accent/30"}
              `}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {isRtl ? plan.title.ar : plan.title.en}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">
                    {plan.price}
                  </span>
                  <span className="text-accent font-bold uppercase text-sm tracking-wider">
                    {t.currency}
                  </span>
                </div>
                <div className="text-neutral-400 text-xs mt-1">
                  {t.perParticipant}
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {(isRtl ? plan.inclusions.ar : plan.inclusions.en).map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-neutral-600"
                    >
                      <CheckCircle size={16} className="text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ),
                )}
              </div>

              <div
                className={`w-full py-3 rounded-2xl text-center font-bold transition-all
                ${selectedPlan === plan.id ? "bg-primary text-white" : "bg-secondary text-primary"}
              `}
              >
                {selectedPlan === plan.id
                  ? isRtl
                    ? "تم الاختيار"
                    : "Selected"
                  : isRtl
                    ? "اختر هذه الخطة"
                    : "Choose Plan"}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Info */}
          <section className="space-y-8">
            <div className="bg-primary rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20 border border-accent/10">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30">
                    <Landmark size={24} className="text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">{t.bankTitle}</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-accent text-xs uppercase tracking-widest mb-1">
                      {isRtl ? "اسم البنك" : "Bank Name"}
                    </div>
                    <div className="text-lg font-medium text-secondary">
                      {t.bankName}
                    </div>
                  </div>
                  <div>
                    <div className="text-accent text-xs uppercase tracking-widest mb-1">
                      {isRtl ? "الفرع" : "Branch"}
                    </div>
                    <div className="text-lg font-medium text-secondary">
                      {t.branch}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-accent text-xs uppercase tracking-widest mb-1">
                        IBAN
                      </div>
                      <div className="font-mono bg-white/5 border border-white/10 p-2 rounded-lg text-sm select-all text-secondary/90">
                        {t.iban}
                      </div>
                    </div>
                    <div>
                      <div className="text-accent text-xs uppercase tracking-widest mb-1">
                        SWIFT CODE
                      </div>
                      <div className="font-mono bg-white/5 border border-white/10 p-2 rounded-lg text-sm select-all text-secondary/90">
                        {t.swift}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-3 text-secondary bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Calendar size={20} className="text-accent" />
                  <span className="font-bold">{t.paymentNote}</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-10 -mr-32 -mt-32" />
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-accent/10 shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Plane className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-primary font-bold mb-2">
                  {isRtl ? "تنبيه السفر والتأشيرة" : "Travel & Visa Alert"}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {t.visaNote}
                </p>
              </div>
            </div>
          </section>

          {/* Registration Form */}
          <section className="bg-white p-8 md:p-12 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
            <h2 className="text-2xl font-bold text-primary mb-8">
              {t.formTitle}
            </h2>

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
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                    {t.firstName}
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                    {t.middleName}
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                    {t.lastName}
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                    {t.institution}
                  </label>
                  <div className="relative">
                    <Building
                      className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-accent`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className={`w-full ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                    {t.phone}
                  </label>
                  <CountryPhoneInput
                    language={language}
                    disabled={isLoading}
                    required
                    onChange={(phone, country) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone,
                        country: country.name,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>{t.registering}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
