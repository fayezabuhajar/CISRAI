import { useState } from "react";
import {
  Clock,
  MapPin,
  User,
  Music,
  BookOpen,
  Coffee,
  GraduationCap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

interface ScheduleItem {
  time: string;
  title: { en: string; ar: string };
  icon: LucideIcon;
  type: string;
  highlight?: boolean;
}

interface ScheduleProps {
  language: "en" | "ar";
}

export default function Schedule({ language }: ScheduleProps) {
  const [activeDay, setActiveDay] = useState(1);
  const isRtl = language === "ar";

  const scheduleData = {
    day1: [
      {
        time: "08:30 - 09:30",
        title: { en: "Registration & Welcome", ar: "التسجيل والترحيب" },
        icon: User,
        type: "registration",
      },
      {
        time: "09:30 - 10:30",
        title: { en: "Opening Ceremony", ar: "حفل الافتتاح" },
        icon: GraduationCap,
        type: "ceremony",
      },
      {
        time: "10:30 - 11:00",
        title: { en: "Coffee Break", ar: "استراحة قهوة" },
        icon: Coffee,
        type: "break",
      },
      {
        time: "11:00 - 13:00",
        title: {
          en: "Session 1: Sharia Curricula Reality",
          ar: "الجلسة الأولى: واقع المناهج الشرعية",
        },
        icon: BookOpen,
        type: "session",
      },
      {
        time: "13:00 - 14:00",
        title: { en: "Lunch Break", ar: "استراحة غداء" },
        icon: Coffee,
        type: "break",
      },
      {
        time: "14:00 - 16:00",
        title: {
          en: "Session 2: AI in Islamic Research",
          ar: "الجلسة الثانية: الذكاء الاصطناعي في البحث الشرعي",
        },
        icon: BookOpen,
        type: "session",
      },
    ],
    day2: [
      {
        time: "09:00 - 11:00",
        title: {
          en: "Session 3: Modern Educational Models",
          ar: "الجلسة الثالثة: نماذج تعليمية حديثة",
        },
        icon: BookOpen,
        type: "session",
      },
      {
        time: "11:00 - 11:30",
        title: { en: "Coffee Break", ar: "استراحة قهوة" },
        icon: Coffee,
        type: "break",
      },
      {
        time: "11:30 - 13:30",
        title: {
          en: "Session 4: Institutional Development",
          ar: "الجلسة الرابعة: التطوير المؤسسي",
        },
        icon: BookOpen,
        type: "session",
      },
      {
        time: "13:30 - 15:00",
        title: {
          en: "Closing Ceremony & Recommendations",
          ar: "حفل الختام والتوصيات",
        },
        icon: Award,
        type: "ceremony",
      },
      {
        time: "16:00 - 18:00",
        title: { en: "Religious Chants Ceremony", ar: "حفل تواشيح دينية" },
        icon: Music,
        type: "event",
        highlight: true,
      },
    ],
  };

  const t = {
    en: {
      title: "Conference Program",
      desc: "A comprehensive two-day academic program exploring AI and Islamic sciences.",
      day1: "Day One: Academic Sessions",
      day2: "Day Two: Sessions & Cultural Event",
      location: "Amman Arab University Campus",
    },
    ar: {
      title: "برنامج المؤتمر",
      desc: "برنامج أكاديمي شامل لمدة يومين يستكشف الذكاء الاصطناعي والعلوم الشرعية.",
      day1: "اليوم الأول: الجلسات الأكاديمية",
      day2: "اليوم الثاني: الجلسات والفعالية الثقافية",
      location: "حرم جامعة عمان العربية",
    },
  }[language];

  const activeSchedule =
    activeDay === 1 ? scheduleData.day1 : scheduleData.day2;

  return (
    <div className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.desc}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        {/* Day Toggle */}
        <div className="flex p-2 bg-primary rounded-[20px] mb-12 border border-accent/10 shadow-lg">
          <button
            onClick={() => setActiveDay(1)}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${activeDay === 1 ? "bg-accent text-white shadow-md" : "text-secondary hover:bg-white/5"}`}
          >
            {t.day1}
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${activeDay === 2 ? "bg-accent text-white shadow-md" : "text-secondary hover:bg-white/5"}`}
          >
            {t.day2}
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {activeSchedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white p-6 rounded-2xl border flex flex-col md:flex-row md:items-center gap-6 group hover:border-accent/30 transition-all
                ${item.highlight ? "border-accent bg-secondary/20 shadow-xl shadow-primary/5" : "border-neutral-100 shadow-sm"}
              `}
            >
              <div className="md:w-40 shrink-0">
                <div className="flex items-center gap-2 text-primary font-bold font-mono">
                  <Clock size={18} className="text-accent" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div className="flex-grow flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border
                  ${item.highlight ? "bg-primary text-white border-accent/20 shadow-lg" : "bg-secondary text-primary border-accent/10"}
                `}
                >
                  <item.icon
                    size={24}
                    className={item.highlight ? "text-accent" : ""}
                  />
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg ${item.highlight ? "text-primary" : "text-primary"}`}
                  >
                    {isRtl ? item.title.ar : item.title.en}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-400 text-sm mt-1">
                    <MapPin size={14} className="text-accent/50" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
