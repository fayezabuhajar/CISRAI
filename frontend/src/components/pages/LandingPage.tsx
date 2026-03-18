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
import { settingsAPI } from "../../services/api";

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

  const [venueName, setVenueName] = useState({
    en: "Amman Arab University",
    ar: "جامعة عمان العربية",
  });

  const [conferenceDate, setConferenceDate] = useState("8–9 June 2026");
  const [patronName, setPatronName] = useState({
    en: "Prof. Dr. Ismail Yamin",
    ar: "الأستاذ الدكتور إسماعيل يامين",
  });

  interface Sponsor {
    nameEn: string;
    nameAr: string;
    logoUrl: string;
    websiteUrl?: string;
    order: number;
  }
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = (await settingsAPI.getVenue()) as {
          success: boolean;
          data: { nameEn: string; nameAr: string };
        };
        if (response.success && response.data) {
          setVenueName({
            en: response.data.nameEn,
            ar: response.data.nameAr,
          });
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    const fetchConferenceDate = async () => {
      try {
        const response = (await settingsAPI.getImportantDates()) as {
          success: boolean;
          data: Array<{ date: string; highlight: boolean }>;
        };
        if (response.success && response.data) {
          const highlightedDate = response.data.find((d) => d.highlight);
          if (highlightedDate) {
            setConferenceDate(highlightedDate.date);
          }
        }
      } catch (error) {
        console.error("Error fetching conference date:", error);
      }
    };

    const fetchPatronName = async () => {
      try {
        const response = (await settingsAPI.getPatronName()) as {
          success: boolean;
          data: { patronNameEn: string; patronNameAr: string };
        };
        if (response.success && response.data) {
          setPatronName({
            en: response.data.patronNameEn,
            ar: response.data.patronNameAr,
          });
        }
      } catch (error) {
        console.error("Error fetching patron name:", error);
      }
    };

    const fetchSponsors = async () => {
      try {
        const response = (await settingsAPI.getSponsors()) as {
          success: boolean;
          data: Sponsor[];
        };
        if (response.success && response.data) {
          setSponsors(response.data.sort((a, b) => a.order - b.order));
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchVenueData();
    fetchConferenceDate();
    fetchPatronName();
    fetchSponsors();
  }, []);

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
      patronage: `Under the patronage of His Excellency ${patronName.en}`,
      organizedBy:
        "Organized by: Faculty of Sharia & Deanship of Scientific Research and Postgraduate Studies",
      title:
        "The Reality of Curricula in Islamic Sciences and Scientific Research",
      subtitle: "In Light of Artificial Intelligence",
      description:
        "A global gathering of scholars and researchers to explore the intersection of traditional Islamic academia and cutting-edge digital transformation.",
      president: `Conference President: ${patronName.en}`,
      chair: "Scientific Committee Chair: Dr. Kifah Al-Souri",
      date: conferenceDate,
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
      sponsorsTitle: "Our Sponsors",
      sponsorsSubtitle:
        "Thanks to our valued partners supporting this conference",
    },
    ar: {
      patronage: `تحت رعاية ${patronName.ar} المحترم`,
      organizedBy: "تنظيم: كلية الشريعة وعمادة البحث العلمي والدراسات العليا",
      title: "واقع المناهج الدراسية في العلوم الشرعية والبحث العلمي",
      subtitle: "في ظل الذكاء الاصطناعي",
      description:
        "تجمع عالمي للعلماء والباحثين لاستكشاف التقاطع بين الأكاديمية الإسلامية التقليدية والتحول الرقمي المتطور.",
      president: `رئيس المؤتمر: ${patronName.ar}`,
      chair: "رئيس اللجنة العلمية: الدكتور كفاح الصوري",
      date: conferenceDate,
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
      sponsorsTitle: "رعاة المؤتمر",
      sponsorsSubtitle: "شكراً لشركائنا الداعمين لهذا المؤتمر",
    },
  };

  const tracks = [
    {
      id: 1,
      title: {
        en: "Reality of Sharia Science Curricula and Content in Educational Institutions",
        ar: "واقع مناهج ومحتوى العلوم الشرعية في المؤسسات التعليمية",
      },
      description: {
        en: "This track examines the current state of Sharia science curricula and content in educational institutions through critical analytical evaluation, assessing alignment with contemporary requirements amid epistemological, social, intellectual, and technological transformations, quality standards under academic accreditation, challenges in the digital age, impact of smart technologies on curriculum development and teaching strategies, and development experiences.",
        ar: "يتناول هذا المحور تشخيص واقع مناهج العلوم الشرعية دراسة تحليلية نقدية تقويمية، ومدى مواكبتها لمتطلبات العصر في ظل التحولات المعاصرة المعرفية والاجتماعية والفكرية والتقنية، ومعايير جودة المناهج الشرعية في ضوء الاعتماد الأكاديمي والتحولات المعاصرة، والتحديات والإشكالات في ظل التحولات الرقمية، وأثر التقنيات الذكية في تطوير المناهج واستراتيجيات التدريس والتقويم، وتجارب وآفاق تطوير مناهج العلوم الشرعية.",
      },
    },
    {
      id: 2,
      title: {
        en: "Scientific Research in Sharia Sciences and Curricula: Reality and Development Prospects",
        ar: "البحث العلمي في العلوم والمناهج الشرعية - الواقع وآفاق التطوير",
      },
      description: {
        en: "This track focuses on the reality of scientific research in Sharia sciences through critical analytical evaluation, disciplined methodological renewal in developing Sharia research, integration between Sharia sciences and humanities and applied sciences, and the role of scientific institutions in developing Sharia research in light of digital transformations.",
        ar: "يركز هذا المحور على واقع البحث العلمي في العلوم الشرعية دراسة تحليلية نقدية تقويمية، والتجديد المنهجي المنضبط في تطوير البحث العلمي الشرعي، والتكامل بين العلوم الشرعية والعلوم الإنسانية والتطبيقية في البحث العلمي، ودور المؤسسات العلمية في تطوير البحث العلمي الشرعي في ضوء التحولات الرقمية.",
      },
    },
    {
      id: 3,
      title: {
        en: "University-Level Academic Sharia Education in the Age of Artificial Intelligence",
        ar: "التعليم الأكاديمي الجامعي الشرعي في عصر الذكاء الاصطناعي",
      },
      description: {
        en: "This track discusses university-level Sharia education amid transformations brought by artificial intelligence, challenges of employing AI in academic Sharia education, and prospects for developing university Sharia education to achieve quality and sustainability.",
        ar: "يناقش هذا المحور التعليم الجامعي الشرعي في ظل التحولات التي أحدثها الذكاء الاصطناعي، وتحديات توظيف الذكاء الاصطناعي في التعليم الأكاديمي الجامعي الشرعي، واستشراف آفاق تطوير التعليم الشرعي الجامعي بما يحقق الجودة والاستدامة.",
      },
    },
    {
      id: 4,
      title: {
        en: "Artificial Intelligence and Sharia Scientific Research",
        ar: "الذكاء الاصطناعي والبحث العلمي الشرعي",
      },
      description: {
        en: "This track addresses the role of artificial intelligence in developing Sharia scientific research, methodological and ethical challenges associated with employing AI in Sharia studies research, and Sharia standards and controls in using AI technologies in Sharia scientific research.",
        ar: "يتناول هذا المحور دور الذكاء الاصطناعي في تطوير البحث العلمي الشرعي، والتحديات والاشكالات المنهجية والأخلاقية المرتبطة بتوظيف الذكاء الاصطناعي في البحث العلمي في الدراسات الشرعية، والمعايير والضوابط الشرعية في استخدام تقنيات الذكاء الاصطناعي في البحث العلمي الشرعي.",
      },
    },
    {
      id: 5,
      title: {
        en: "Educational Content in Sharia Sciences in the Age of Artificial Intelligence",
        ar: "المحتوى التعليمي في العلوم الشرعية في عصر الذكاء الاصطناعي",
      },
      description: {
        en: "This track focuses on analyzing the reality of scientific content in Sharia sciences (Quranic sciences, Hadith sciences, creed, jurisprudence, principles of jurisprudence, Da'wah) amid digital transformations, evaluating quality and scientific methodology of digital Sharia content, producing scientific Sharia content according to Sharia controls, achieving value, educational, and skill dimensions and competencies in Sharia sciences content, and developing Sharia content to achieve authenticity and contemporaneity.",
        ar: "يركز هذا المحور على تحليل واقع المحتوى العلمي في العلوم الشرعية (علوم القرآن، علوم الحديث، العقيدة، الفقه، أصول الفقه، الدعوة) في ظل التحولات الرقمية، وتقييم جودة المحتوى الشرعي الرقمي ومنهجيته العلمية، وانتاج المحتوى العلمي الشرعي وفق الضوابط الشرعية في ظل التحولات الرقمية، وتحقق الأبعاد القيمية والتربوية والمهارية والكفايات في محتوى العلوم الشرعية وأثرها على المتعلمين، وتطوير المحتوى الشرعي بما يحقق الأصالة والمعاصرة.",
      },
    },
    {
      id: 6,
      title: {
        en: "Practical Experiences and Leading Practices in Producing Sharia Academic Curricula and Content",
        ar: "تجارب عملية وممارسات رائدة في انتاج المناهج والمحتويات الاكاديمية الشرعية",
      },
      description: {
        en: "This track presents practical models and innovative practices in producing Sharia academic curricula and content, and evaluates innovative models in developing Sharia curricula and content in terms of quality and effectiveness.",
        ar: "يقدم هذا المحور عرض نماذج عملية وممارسات مبتكرة في إنتاج المناهج والمحتويات الأكاديمية الشرعية، وتقييم نماذج مبتكرة في تطوير المناهج والمحتوى الشرعي من حيث الجودة والفاعلية.",
      },
    },
    {
      id: 7,
      title: {
        en: "Role of Educational and Sharia Institutions in Developing Sharia Curricula and Content",
        ar: "دور المؤسسات التعليمية والشرعية في تطوير المحتويات والمناهج الدراسية الشرعية",
      },
      description: {
        en: "This track discusses epistemological integration between Sharia sciences and related sciences (educational sciences, law, Arabic language, sociology, history, geography), interdisciplinary integration in improving quality and educational effectiveness of Sharia curricula, and exchange of expertise between educational institutions and researchers in producing Sharia academic curricula and content.",
        ar: "يناقش هذا المحور التكامل المعرفي بين العلوم الشرعية والعلوم ذات الصلة (العلوم التربوية، القانون، اللغة العربية، علم الاجتماع، التاريخ، الجغرافيا)، والتكامل البيني في تحسين جودة المناهج الشرعية وفاعليتها التعليمية، وتبادل الخبرات بين المؤسسات التعليمية والباحثين في انتاج المناهج والمحتويات الاكاديمية الشرعية.",
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
                    {isRtl ? venueName.ar : venueName.en}
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
                {isRtl ? "اﻟﺪﻛﺘﻮرة كفاح الصوري" : "Dr. Kifah Al-Souri"}
              </div>
            </div>
            <div className="h-px bg-[#333333]/10" />
            <div>
              <div className="text-xs text-[#333333]/50 uppercase">
                {isRtl
                  ? "المنسق العام للمؤتمر"
                  : "General Conference Coordinator"}
              </div>
              <div className="font-medium text-lg">
                {isRtl
                  ? "الأستاذ الدكتور اسماعيل يامين"
                  : "Professor Dr. Ismail Yamin"}
              </div>
            </div>
            <div className="h-px bg-[#333333]/10" />
            <div>
              <div className="text-xs text-[#333333]/50 uppercase">
                {isRtl ? "رئيس اللجنة التحضيرية" : "Scientific Committee Chair"}
              </div>
              <div className="font-medium text-lg">
                {isRtl
                  ? "الأستاذ الدكتور حســـن الزعبـــي"
                  : "Dr. Hassan Al-Zoubi"}
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
              {isRtl
                ? "عمادة البحث العلمي والدراسات العليا"
                : "Deanship of Scientific Research and Postgraduate Studies"}
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

      {/* Sponsors Section */}
      {sponsors.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-neutral-50 via-white to-accent/5 relative overflow-hidden">
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(26, 48, 94, 0.15) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Decorative Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute top-1/4 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {t.sponsorsTitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t.sponsorsSubtitle}
              </p>
            </motion.div>

            {/* Sponsors Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group h-full"
                >
                  <a
                    href={sponsor.websiteUrl || "#"}
                    target={sponsor.websiteUrl ? "_blank" : undefined}
                    rel={sponsor.websiteUrl ? "noopener noreferrer" : undefined}
                    className={`flex flex-col h-full bg-white backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/60 hover:border-primary/50 hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      sponsor.websiteUrl ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div className="aspect-square flex items-center justify-center flex-shrink-0">
                      {sponsor.logoUrl ? (
                        <img
                          src={sponsor.logoUrl}
                          alt={
                            language === "ar" ? sponsor.nameAr : sponsor.nameEn
                          }
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-50 rounded-xl">
                          <Users size={48} className="text-neutral-300" />
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-4 text-center">
                      <h3 className="font-bold text-primary text-sm">
                        {language === "ar" ? sponsor.nameAr : sponsor.nameEn}
                      </h3>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
