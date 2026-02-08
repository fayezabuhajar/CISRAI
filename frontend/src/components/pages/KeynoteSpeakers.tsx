import { Briefcase, GraduationCap, Quote } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { speakerAPI } from "../../services/api";

interface KeynoteSpeakersProps {
  language: "en" | "ar";
}

interface Speaker {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  keynote: {
    en: string;
    ar: string;
  };
  affiliation: {
    en: string;
    ar: string;
  };
  bio?: {
    en: string;
    ar: string;
  };
  photo?: string;
  order: number;
}

export default function KeynoteSpeakers({ language }: KeynoteSpeakersProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const isRtl = language === "ar";

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      setLoading(true);
      const response = await speakerAPI.getAll(1, 100);
      if (response.success && response.data?.data) {
        const validSpeakers = response.data.data.filter(
          (s: any) =>
            s.name && typeof s.name === "object" && s.name.en && s.name.ar,
        );
        setSpeakers(
          validSpeakers.sort((a: Speaker, b: Speaker) => a.order - b.order),
        );
      }
    } catch (error) {
      console.error("Failed to load speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Keynote Speakers & Leadership",
      subtitle: "Leading the academic discourse on AI and Sharia sciences.",
      topic: "Keynote Topic",
      loading: "Loading...",
      noSpeakers: "No speakers available yet",
    },
    ar: {
      title: "المتحدثون الرئيسيون والقيادة",
      subtitle: "قيادة الحوار الأكاديمي حول الذكاء الاصطناعي والعلوم الشرعية.",
      topic: "موضوع الكلمة الرئيسية",
      loading: "جاري التحميل...",
      noSpeakers: "لا يوجد متحدثون بعد",
    },
  }[language];

  if (loading) {
    return (
      <div className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="space-y-12">
          {speakers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400 text-lg">{t.noSpeakers}</p>
            </div>
          ) : (
            speakers.map((speaker) => (
              <motion.div
                key={speaker._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] border border-neutral-100 overflow-hidden shadow-xl shadow-primary/5 flex flex-col md:flex-row border-accent/10"
              >
                <div className="md:w-1/3 bg-primary p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10 w-48 h-48 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-white/20 flex items-center justify-center shadow-2xl">
                    <span className="text-7xl font-black text-white">
                      {(isRtl ? speaker.name.ar : speaker.name.en)
                        .split(" ")[0]
                        .charAt(0)}
                    </span>
                  </div>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.05]">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="speaker-pattern"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z"
                            fill="currentColor"
                            className="text-accent"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#speaker-pattern)"
                      />
                    </svg>
                  </div>
                </div>

                <div className="md:w-2/3 p-8 md:p-12 relative">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-accent/20">
                    {isRtl ? speaker.role.ar : speaker.role.en}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    {isRtl ? speaker.name.ar : speaker.name.en}
                  </h2>
                  <div className="text-accent font-bold mb-8 flex items-center gap-2">
                    <GraduationCap size={18} />
                    <span>{isRtl ? speaker.title.ar : speaker.title.en}</span>
                  </div>

                  <div className="bg-secondary/20 p-8 rounded-3xl border border-accent/10 relative mb-8 overflow-hidden shadow-inner">
                    <div className="absolute top-4 right-4 text-accent/10">
                      <Quote size={64} />
                    </div>
                    <div className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-3">
                      {t.topic}
                    </div>
                    <p className="text-xl font-bold text-primary relative z-10 leading-relaxed">
                      "{isRtl ? speaker.keynote.ar : speaker.keynote.en}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <Briefcase size={14} className="text-accent" />
                    <span>
                      {isRtl ? speaker.affiliation.ar : speaker.affiliation.en}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
