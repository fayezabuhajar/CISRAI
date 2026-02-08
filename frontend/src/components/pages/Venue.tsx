import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

interface VenueProps {
  language: "en" | "ar";
}

export default function Venue({ language }: VenueProps) {
  const isRtl = language === "ar";

  const t = {
    en: {
      title: "Conference Venue",
      subtitle: "Join us at the prestigious Amman Arab University campus.",
      venueName: "Amman Arab University",
      address: "Jordan Street, Mobis, Amman, Jordan",
      aboutVenue: "About Amman Arab University",
      aboutText:
        "Amman Arab University (AAU) is a leading institution in Jordan, committed to academic excellence and scientific research. The campus provides a modern and inspiring environment for scholars to share knowledge and foster innovation in Islamic sciences.",
      gettingThere: "Travel & Transportation",
      facilities: "Campus Facilities",
    },
    ar: {
      title: "مكان انعقاد المؤتمر",
      subtitle: "انضم إلينا في حرم جامعة عمان العربية المتميز.",
      venueName: "جامعة عمان العربية",
      address: "شارع الأردن، موبص، عمان، الأردن",
      aboutVenue: "عن جامعة عمان العربية",
      aboutText:
        "تعد جامعة عمان العربية مؤسسة رائدة في الأردن، ملتزمة بالتميز الأكاديمي والبحث العلمي. يوفر الحرم الجامعي بيئة حديثة وملهمة للعلماء لتبادل المعرفة وتعزيز الابتكار في العلوم الشرعية.",
      gettingThere: "السفر والمواصلات",
      facilities: "مرافق الحرم الجامعي",
    },
  }[language];

  const facilities = [
    { en: "Main Conference Auditoriums", ar: "قاعات المؤتمرات الرئيسية" },
    { en: "Modern Research Labs", ar: "مختبرات بحثية حديثة" },
    { en: "High-speed Academic Network", ar: "شبكة أكاديمية عالية السرعة" },
    { en: "On-campus Prayer Rooms", ar: "مصليات داخل الحرم الجامعي" },
    { en: "Scientific Exhibition Areas", ar: "مساحات للمعارض العلمية" },
    { en: "Catering & Dining Facilities", ar: "مرافق الإطعام والضيافة" },
  ];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        {/* Hero Venue Card */}
        <div className="relative mb-20 overflow-hidden rounded-[40px] shadow-2xl shadow-primary/10 border border-neutral-100">
          <div className="bg-primary aspect-[21/9] w-full flex items-center justify-center relative overflow-hidden">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="venue-pattern"
                    x="0"
                    y="0"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M40 0 L50 30 L80 40 L50 50 L40 80 L30 50 L0 40 L30 30 Z"
                      fill="white"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#venue-pattern)" />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative z-10 px-6"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-secondary mb-6 shadow-lg">
                <MapPin size={18} className="text-accent" />
                <span className="text-sm font-bold uppercase tracking-widest">
                  {isRtl ? "الموقع" : "Location"}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                {t.venueName}
              </h2>
              <p className="text-xl text-secondary/80 font-medium">
                {t.address}
              </p>
            </motion.div>
          </div>

          <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-neutral-100">
            <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start">
              <div>
                <div className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-1">
                  {isRtl ? "الهاتف" : "Phone"}
                </div>
                <div className="font-bold text-primary">+962 6 4790222</div>
              </div>
              <div className="w-px h-10 bg-neutral-100 hidden md:block" />
              <div>
                <div className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-1">
                  {isRtl ? "البريد" : "Email"}
                </div>
                <div className="font-bold text-primary">info@aau.edu.jo</div>
              </div>
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 hover:bg-accent group active:scale-95">
              <Navigation
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span>
                {isRtl ? "عرض الموقع على الخريطة" : "View on Google Maps"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About Section */}
          <section className="space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-neutral-100 shadow-xl shadow-primary/5 relative overflow-hidden">
              <h2 className="text-3xl font-bold text-primary mb-6">
                {t.aboutVenue}
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg mb-8 relative z-10">
                {t.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {facilities.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-neutral-700 font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-accent/10">
                      <ShieldCheck className="text-accent" size={16} />
                    </div>
                    <span>{isRtl ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/50 rounded-full blur-3xl opacity-50" />
            </div>
          </section>

          {/* Travel Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-primary mb-6">
              {t.gettingThere}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-8 rounded-[32px] border border-neutral-100 flex gap-6 items-start hover:border-accent/20 transition-all shadow-sm">
                <div className="w-14 h-14 bg-secondary text-primary rounded-2xl flex items-center justify-center shrink-0 border border-accent/10">
                  <Plane size={30} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {isRtl ? "عبر الجو" : "By Air"}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {isRtl
                      ? "مطار الملكة علياء الدولي هو المنفذ الرئيسي، ويبعد حوالي 45 دقيقة عن الحرم الجامعي."
                      : "Queen Alia International Airport (AMM) is the main entry point, located approximately 45 minutes from the campus."}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-neutral-100 flex gap-6 items-start hover:border-accent/20 transition-all shadow-sm">
                <div className="w-14 h-14 bg-secondary text-primary rounded-2xl flex items-center justify-center shrink-0 border border-accent/10">
                  <Car size={30} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {isRtl ? "عبر الطريق" : "By Road"}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {isRtl
                      ? "تقع الجامعة على شارع الأردن الرئيسي، مع توفر مواقف سيارات واسعة وخدمات نقل عام."
                      : "The university is located on the main Jordan Street, with ample parking and public transport links available."}
                  </p>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-[32px] text-white flex gap-6 items-center shadow-lg border border-accent/10">
                <div className="w-14 h-14 bg-white/10 text-accent rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                  <Clock size={30} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">
                    {isRtl ? "ساعات العمل" : "Opening Hours"}
                  </h3>
                  <p className="text-secondary/60 text-sm">
                    {isRtl
                      ? "من الأحد إلى الخميس: 08:00 - 16:00"
                      : "Sun - Thu: 08:00 AM - 04:00 PM"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
