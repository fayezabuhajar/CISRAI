import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  FileText,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Award,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DomeTrackCard } from "../DomeTrackCard";

interface LandingPageProps {
  language: "en" | "ar";
}

export default function LandingPage({ language }: LandingPageProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-08T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const content = {
    en: {
      patronage: "Under the patronage of His Excellency Prof. Dr. Ismail Yamin",
      organizedBy:
        "Organized by: Faculty of Sharia & Deanship of Scientific Research",
      title:
        "The Reality of Curricula in Islamic Sciences and Scientific Research",
      subtitle: "In Light of Artificial Intelligence",
      description:
        "A global gathering of scholars and researchers to explore the intersection of traditional Islamic academia and cutting-edge digital transformation.",
      president: "Conference President: Prof. Dr. Ismail Yamin",
      chair: "Committee Chair: Dr. Kifah Al-Souri",
      date: "8–9 June 2026",
      venue: "Amman Arab University",
      mode: "On-site and Online",
      register: "Register Now",
      callForPapers: "Submit Your Paper",
      countdown: "Conference Starts In",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      highlights: "Conference Highlights",
      highlight1Title: "Islamic Curricula",
      highlight1Desc:
        "Analyzing the current status of Sharia content in digital transformation.",
      highlight2Title: "AI Integration",
      highlight2Desc:
        "Bridging authenticity with modern AI-driven research methodologies.",
      highlight3Title: "Global Research",
      highlight3Desc:
        "Promoting excellence in Islamic studies through scientific innovation.",
      highlight4Title: "Digital Education",
      highlight4Desc:
        "Developing pioneering models for Islamic teaching in the AI era.",
      tracksTitle: "Conference Tracks",
      tracksSubtitle:
        "Explore the key research areas and thematic focuses of the conference",
      readMore: "Read More",
      closeModal: "Close",
    },
    ar: {
      patronage: "تحت رعاية الأستاذ الدكتور إسماعيل يامين المحترم",
      organizedBy: "تنظيم: كلية الشريعة وعمادة البحث العلمي والدراسات العليا",
      title: "واقع المناهج الدراسية في العلوم الشرعية والبحث العلمي",
      subtitle: "في ظل الذكاء الاصطناعي",
      description:
        "تجمع عالمي للعلماء والباحثين لاستكشاف التقاطع بين الأكاديمية الإسلامية التقليدية والتحول الرقمي المتطور.",
      president: "رئيس المؤتمر: الأستاذ الدكتور إسماعيل يامين",
      chair: "رئيس اللجنة التحضيرية: الدكتور كفاح الصوري",
      date: "8–9 يونيو 2026",
      venue: "جامعة عمان العربية",
      mode: "حضورياً وعبر الإنترنت",
      register: "سجل الآن",
      callForPapers: "قدم ورقتك البحثية",
      countdown: "بداية المؤتمر في",
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      seconds: "ثانية",
      highlights: "أبرز محاور المؤتمر",
      highlight1Title: "المناهج الشرعية",
      highlight1Desc: "تشخيص واقع المناهج الشرعية في ظل التحول الرقمي.",
      highlight2Title: "تطبيقات الذكاء الاصطناعي",
      highlight2Desc: "الجمع بين الأصالة الشرعية ومنهجيات البحث الحديثة.",
      highlight3Title: "البحث العلمي",
      highlight3Desc: "تعزيز التميز في الدراسات الإسلامية من خلال الابتكار.",
      highlight4Title: "التعليم الرقمي",
      highlight4Desc:
        "تطوير نماذج رائدة لتعليم العلوم الشرعية في عصر الذكاء الاصطناعي.",
      tracksTitle: "محاور المؤتمر",
      tracksSubtitle:
        "استكشف المجالات البحثية والمحاور الموضوعية الرئيسية للمؤتمر",
      readMore: "اقرأ المزيد",
      closeModal: "إغلاق",
    },
  };

  const tracks = [
    {
      id: 1,
      title: {
        en: "Reality of Sharia Curricula and Content in Educational Institutions",
        ar: "واقع المناهج والمحتوى الشرعي في المؤسسات التعليمية",
      },
      description: {
        en: "This track analyzes the current state of Sharia curricula adopted in educational institutions in terms of knowledge structure, presentation methods, and alignment with modern educational and scientific developments, while identifying challenges related to curriculum modernization and balancing authenticity with contemporary needs.",
        ar: "يحلل هذا المحور الوضع الحالي للمناهج الشرعية المعتمدة في المؤسسات التعليمية من حيث البنية المعرفية وطرق العرض والمواءمة مع التطورات التعليمية والعلمية الحديثة، مع تحديد التحديات المتعلقة بتحديث المناهج والموازنة بين الأصالة والاحتياجات المعاصرة.",
      },
    },
    {
      id: 2,
      title: {
        en: "Scientific Research in Sharia Sciences and Curricula: Reality and Development Prospects",
        ar: "البحث العلمي في العلوم الشرعية والمناهج: الواقع وآفاق التطوير",
      },
      description: {
        en: "This track focuses on the reality of scientific research in Sharia sciences and curricula, including methodologies, research priorities, and academic output, while exploring future development opportunities to enhance research quality and societal impact.",
        ar: "يركز هذا المحور على واقع البحث العلمي في العلوم الشرعية والمناهج، بما في ذلك المنهجيات والأولويات البحثية والإنتاج الأكاديمي، مع استكشاف فرص التطوير المستقبلية لتعزيز جودة البحث وتأثيره المجتمعي.",
      },
    },
    {
      id: 3,
      title: {
        en: "University-Level Islamic Education in the Age of Artificial Intelligence",
        ar: "التعليم الشرعي الجامعي في عصر الذكاء الاصطناعي",
      },
      description: {
        en: "This track discusses the impact of digital transformation and AI technologies on Islamic higher education, including teaching methods, learning environments, student assessment, and the evolving role of faculty members, highlighting opportunities and challenges of AI integration.",
        ar: "يناقش هذا المحور تأثير التحول الرقمي وتقنيات الذكاء الاصطناعي على التعليم الشرعي العالي، بما في ذلك طرق التدريس وبيئات التعلم وتقييم الطلاب والدور المتطور لأعضاء هيئة التدريس، مع تسليط الضوء على فرص وتحديات دمج الذكاء الاصطناعي.",
      },
    },
    {
      id: 4,
      title: {
        en: "Artificial Intelligence and Sharia Scientific Research",
        ar: "الذكاء الاصطناعي والبحث العلمي الشرعي",
      },
      description: {
        en: "This track addresses the use of AI technologies in Sharia research, such as analyzing Islamic texts, supporting comparative studies, and accelerating research and indexing processes, while emphasizing ethical and scientific regulations governing AI use in Sharia fields.",
        ar: "يتناول هذا المحور استخدام تقنيات الذكاء الاصطناعي في البحث الشرعي، مثل تحليل النصوص الإسلامية ودعم الدراسات المقارنة وتسريع عمليات البحث والفهرسة، مع التأكيد على الضوابط الأخلاقية والعلمية التي تحكم استخدام الذكاء الاصطناعي في المجالات الشرعية.",
      },
    },
    {
      id: 5,
      title: {
        en: "Educational Content in Islamic Sciences in the Age of Artificial Intelligence",
        ar: "المحتوى التعليمي في العلوم الشرعية في عصر الذكاء الاصطناعي",
      },
      description: {
        en: "This track focuses on developing Islamic educational content using AI tools, including interactive digital content design, personalized learning, and improving educational material quality to enhance effective knowledge transfer.",
        ar: "يركز هذا المحور على تطوير المحتوى التعليمي الشرعي باستخدام أدوات الذكاء الاصطناعي، بما في ذلك تصميم المحتوى الرقمي التفاعلي والتعلم الشخصي وتحسين جودة المواد التعليمية لتعزيز نقل المعرفة بفعالية.",
      },
    },
    {
      id: 6,
      title: {
        en: "Practical Experiences and Leading Practices in Producing Islamic Academic Curricula and Content",
        ar: "التجارب العملية والممارسات الرائدة في إنتاج المناهج والمحتوى الأكاديمي الشرعي",
      },
      description: {
        en: "This track presents successful practical models and pioneering experiences in developing Islamic academic curricula and content at local, regional, and international levels, analyzing success factors and scalability.",
        ar: "يقدم هذا المحور نماذج عملية ناجحة وتجارب رائدة في تطوير المناهج والمحتوى الأكاديمي الشرعي على المستويات المحلية والإقليمية والدولية، مع تحليل عوامل النجاح وقابلية التوسع.",
      },
    },
    {
      id: 7,
      title: {
        en: "Role of Educational and Sharia Institutions in Developing Islamic Curricula and Content",
        ar: "دور المؤسسات التعليمية والشرعية في تطوير المناهج والمحتوى الشرعي",
      },
      description: {
        en: "This track discusses the role of educational and Sharia institutions in leading curriculum and content development through academic policies, partnerships, capacity building, and quality assurance to achieve sustainable and contemporary Islamic education.",
        ar: "يناقش هذا المحور دور المؤسسات التعليمية والشرعية في قيادة تطوير المناهج والمحتوى من خلال السياسات الأكاديمية والشراكات وبناء القدرات وضمان الجودة لتحقيق تعليم شرعي مستدام ومعاصر.",
      },
    },
  ];

  const t = content[language];
  const isRtl = language === "ar";

  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-[#D4AF37] text-[#333333] pt-10 overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="islamic-hero"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 90 V50 C10 20, 50 5, 50 5 C50 5, 90 20, 90 50 V90 H75 V55 C75 35, 50 25, 50 25 C50 25, 25 35, 25 55 V90 Z"
                  fill="currentColor"
                  className="text-[#333333]"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-hero)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#333333]/10 backdrop-blur-md border border-[#333333]/20 text-[#ffffff] text-sm font-medium mb-6 uppercase tracking-wider">
              {t.patronage}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] text-white">
              {t.title} <br />
              <span className="text-[#333333]/90">{t.subtitle}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#333333]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#333333]" />
                </div>
                <div>
                  <div className="text-sm text-[#333333]/60 uppercase tracking-widest">
                    {isRtl ? "التاريخ" : "Date"}
                  </div>
                  <div className="text-lg font-bold text-[#333333]">
                    {t.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#333333]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#333333]" />
                </div>
                <div>
                  <div className="text-sm text-[#333333]/60 uppercase tracking-widest">
                    {isRtl ? "المكان" : "Location"}
                  </div>
                  <div className="text-lg font-bold text-[#333333]">
                    {t.venue}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/registration"
                className="group px-8 py-4 bg-[#333333] hover:bg-[#444444] text-white rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-bold shadow-2xl shadow-[#333333]/30"
              >
                <span>{t.register}</span>
                <ArrowRight size={20} className={isRtl ? "rotate-180" : ""} />
              </Link>
              <Link
                to="/call-for-papers"
                className="px-8 py-4 bg-white/90 hover:bg-white text-[#333333] border border-[#333333]/20 rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-medium backdrop-blur-md shadow-lg"
              >
                <FileText size={20} />
                <span>{t.callForPapers}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Info Card */}
        <div
          className={`hidden xl:block absolute bottom-16 ${isRtl ? "left-20" : "right-20"} bg-white/90 backdrop-blur-xl border border-[#333333]/10 p-8 rounded-3xl max-w-sm shadow-2xl`}
        >
          <div className="text-[#333333] font-bold mb-4 flex items-center gap-2">
            <GraduationCap size={24} />
            <span>{isRtl ? "قيادة المؤتمر" : "Conference Leadership"}</span>
          </div>
          <div className="space-y-4 text-[#333333]">
            <div>
              <div className="text-xs text-[#333333]/50 uppercase">
                {isRtl ? "رئيس المؤتمر" : "President"}
              </div>
              <div className="font-medium text-lg">
                {isRtl ? "أ.د. إسماعيل يامين" : "Prof. Dr. Ismail Yamin"}
              </div>
            </div>
            <div className="h-px bg-[#333333]/10" />
            <div>
              <div className="text-xs text-[#333333]/50 uppercase">
                {isRtl ? "رئيس اللجنة التحضيرية" : "Committee Chair"}
              </div>
              <div className="font-medium text-lg">
                {isRtl ? "د. كفاح الصوري" : "Dr. Kifah Al-Souri"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Bar */}
      <section className="bg-primary/95 border-y border-white/10 py-8 relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-xl font-bold text-accent uppercase tracking-widest">
              {t.countdown}
            </h2>
            <div className="flex gap-4 sm:gap-8">
              {[
                { value: timeLeft.days, label: t.days },
                { value: timeLeft.hours, label: t.hours },
                { value: timeLeft.minutes, label: t.minutes },
                { value: timeLeft.seconds, label: t.seconds },
              ].map((item, index) => (
                <div key={index} className="text-center min-w-[70px]">
                  <div className="text-3xl md:text-4xl font-black text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-accent font-bold uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organized By */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary/40 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {isRtl
              ? "تنظيم المؤسسات الأكاديمية"
              : "Organized by Academic Institutions"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-90">
            <div className="text-xl font-bold text-primary">
              {isRtl ? "كلية الشريعة" : "Faculty of Sharia"}
            </div>
            <div className="w-2 h-2 rounded-full bg-accent/30" />
            <div className="text-xl font-bold text-primary">
              {isRtl ? "عمادة البحث العلمي" : "Deanship of Scientific Research"}
            </div>
            <div className="w-2 h-2 rounded-full bg-accent/30" />
            <div className="text-xl font-bold text-primary">
              {isRtl ? "جامعة عمان العربية" : "Amman Arab University"}
            </div>
          </div>
        </div>
      </section>

      {/* Features/Highlights */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.highlights}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: t.highlight1Title,
                desc: t.highlight1Desc,
              },
              { icon: Award, title: t.highlight2Title, desc: t.highlight2Desc },
              { icon: Users, title: t.highlight3Title, desc: t.highlight3Desc },
              {
                icon: FileText,
                title: t.highlight4Title,
                desc: t.highlight4Desc,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6">
                  <feature.icon size={30} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subtle Islamic Arch Background */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            fill="currentColor"
            className="text-primary"
          >
            <path d="M50 0 C22.4 0 0 22.4 0 50 L0 100 L100 100 L100 50 C100 22.4 77.6 0 50 0 Z" />
          </svg>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-24 bg-white relative">
        {/* Light Islamic Identity Refinement */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <defs>
              <pattern
                id="light-islamic-bg"
                x="0"
                y="0"
                width="300"
                height="300"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M150 50 Q150 10, 160 10 L160 40 Q160 60, 150 80 Q140 60, 140 40 L140 10 Q150 10, 150 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M50 200 Q50 160, 60 160 L60 190 Q60 210, 50 230 Q40 210, 40 190 L40 160 Q50 160, 50 200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="250"
                  cy="100"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#light-islamic-bg)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.tracksTitle}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
              {t.tracksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <DomeTrackCard
                key={track.id}
                trackNumber={track.id}
                title={isRtl ? track.title.ar : track.title.en}
                description={
                  isRtl ? track.description.ar : track.description.en
                }
                onClick={() => setSelectedTrack(track.id)}
                isRtl={isRtl}
                readMoreText={t.readMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Track Details Modal */}
      <AnimatePresence>
        {selectedTrack && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[24px] p-8 md:p-12 max-w-3xl w-full shadow-2xl relative overflow-hidden border border-accent/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-neutral-50 hover:bg-neutral-100 rounded-full flex items-center justify-center text-primary transition-colors z-10"
                >
                  <X size={20} />
                </button>

                {/* Track Number Badge */}
                <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-xl border border-accent/20">
                  {selectedTrack}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 leading-tight">
                  {
                    tracks.find((track) => track.id === selectedTrack)?.title[
                      language
                    ]
                  }
                </h2>

                {/* Description */}
                <div className="text-neutral-700 leading-relaxed space-y-4">
                  <p className="text-base md:text-lg">
                    {
                      tracks.find((track) => track.id === selectedTrack)
                        ?.description[language]
                    }
                  </p>
                </div>

                {/* Close Button at bottom */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setSelectedTrack(null)}
                    className="px-10 py-4 bg-primary text-white rounded-xl font-bold transition-all shadow-xl hover:bg-accent active:scale-95"
                  >
                    {t.closeModal}
                  </button>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl pointer-events-none" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
