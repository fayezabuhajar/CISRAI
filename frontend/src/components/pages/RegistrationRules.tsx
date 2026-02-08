import {
  FileCheck,
  ShieldAlert,
  BookOpen,
  Info,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion } from "motion/react";

interface RegistrationRulesProps {
  language: "en" | "ar";
}

export default function RegistrationRules({
  language,
}: RegistrationRulesProps) {
  const isRtl = language === "ar";

  const academicRules = [
    {
      title: { en: "Alignment & Quality", ar: "المواءمة والجودة" },
      items: [
        {
          en: "Research must align with conference themes and tracks.",
          ar: "يجب أن يتماشى البحث مع محاور ومسارات المؤتمر.",
        },
        {
          en: "Subject to strict double-blind peer review.",
          ar: "يخضع البحث لمراجعة دقيقة مزدوجة التعمية من قبل الأقران.",
        },
        {
          en: "Work must be original and unpublished.",
          ar: "يجب أن يكون العمل أصيلاً وغير منشور مسبقاً.",
        },
      ],
    },
    {
      title: { en: "Manuscript Requirements", ar: "متطلبات المخطوطة" },
      items: [
        {
          en: "Max length: 20 pages or 10,000 words.",
          ar: "الحد الأقصى للطول: 20 صفحة أو 10,000 كلمة.",
        },
        {
          en: "Format: Microsoft Word, Times New Roman.",
          ar: "التنسيق: Microsoft Word، خط Times New Roman.",
        },
        {
          en: "Referencing style: APA 7th Edition.",
          ar: "نمط المراجع: الإصدار السابع من APA.",
        },
      ],
    },
    {
      title: { en: "First Page Structure", ar: "هيكلية الصفحة الأولى" },
      items: [
        {
          en: "Conference & Organizing Institution names.",
          ar: "اسم المؤتمر والمؤسسة المنظمة.",
        },
        {
          en: "Paper title in both Arabic & English.",
          ar: "عنوان البحث باللغتين العربية والإنجليزية.",
        },
        {
          en: "Author name, title, affiliation, and email.",
          ar: "اسم الباحث، اللقب العلمي، المؤسسة، والبريد الإلكتروني.",
        },
      ],
    },
  ];

  const t = {
    en: {
      title: "Academic Submission Rules",
      subtitle: "Official guidelines for researchers and authors.",
      similarityTitle: "Similarity & AI Ethics",
      similarityDesc:
        "All submissions are screened for plagiarism and AI-generated content. Maximum acceptable similarity index is 25%.",
      notice: "Adherence to these rules is mandatory for consideration.",
    },
    ar: {
      title: "قواعد تقديم الأبحاث العلمية",
      subtitle: "الإرشادات الرسمية للباحثين والمؤلفين.",
      similarityTitle: "أخلاقيات التشابه والذكاء الاصطناعي",
      similarityDesc:
        "تخضع جميع المشاركات لفحص السرقة الأدبية والمحتوى المولد بالذكاء الاصطناعي. الحد الأقصى المقبول لمعامل التشابه هو 25٪.",
      notice: "الالتزام بهذه القواعد إلزامي للنظر في البحث.",
    },
  }[language];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {academicRules.slice(0, 2).map((section, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary text-primary rounded-2xl flex items-center justify-center border border-accent/10">
                  {i === 0 ? (
                    <FileCheck size={24} className="text-accent" />
                  ) : (
                    <FileText size={24} className="text-accent" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-primary">
                  {isRtl ? section.title.ar : section.title.en}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-accent shrink-0 mt-1"
                      size={16}
                    />
                    <span className="text-neutral-600 text-sm leading-relaxed">
                      {isRtl ? item.ar : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-primary p-8 md:p-12 rounded-[32px] text-white shadow-2xl shadow-primary/20 relative overflow-hidden border border-accent/10 h-full flex flex-col justify-center">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <BookOpen size={24} className="text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {isRtl
                      ? academicRules[2].title.ar
                      : academicRules[2].title.en}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {academicRules[2].items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2" />
                      <span className="text-secondary/80 text-sm leading-relaxed">
                        {isRtl ? item.ar : item.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-10 -mr-32 -mb-32" />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-[32px] border border-accent/10 shadow-sm h-full flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t.similarityTitle}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-grow">
                {t.similarityDesc}
              </p>
              <div className="bg-secondary/30 px-6 py-4 rounded-2xl border border-accent/10 flex items-center justify-between">
                <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">
                  {isRtl ? "الحد" : "Limit"}
                </span>
                <span className="text-3xl font-black text-primary">25%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 p-6 bg-secondary/50 rounded-2xl border border-accent/10">
          <Info className="text-accent shrink-0" size={20} />
          <p className="text-primary font-bold text-sm leading-relaxed">
            {t.notice}
          </p>
        </div>
      </div>
    </div>
  );
}
