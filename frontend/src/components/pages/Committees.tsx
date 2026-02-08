import {
  Award,
  Users,
  ShieldCheck,
  Cpu,
  ChevronRight,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { committeeAPI } from "../../services/api";

interface CommitteesProps {
  language: "en" | "ar";
}

interface CommitteeMember {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  committee: "scientific" | "preparatory" | "media" | "technical";
  title: {
    en: string;
    ar: string;
  };
  affiliation?: {
    en: string;
    ar: string;
  };
  email?: string;
  order: number;
}

export default function Committees({ language }: CommitteesProps) {
  const [activeTab, setActiveTab] = useState("scientific");
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const isRtl = language === "ar";

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await committeeAPI.getAll(1, 1000);
      if (response.success && response.data?.data) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load committees:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCommitteeMembers = (committeeType: string) => {
    return members
      .filter((m) => m.committee === committeeType)
      .sort((a, b) => a.order - b.order);
  };

  const committees = {
    scientific: {
      id: "scientific",
      title: { en: "Scientific Committee", ar: "اللجنة العلمية" },
      icon: Award,
    },
    preparatory: {
      id: "preparatory",
      title: { en: "Preparatory Committee", ar: "اللجنة التحضيرية" },
      icon: Users,
    },
    media: {
      id: "media",
      title: { en: "Media Committee", ar: "اللجنة الإعلامية" },
      icon: ShieldCheck,
    },
    technical: {
      id: "technical",
      title: { en: "Technical Committee", ar: "اللجنة الفنية والتقنية" },
      icon: Cpu,
    },
  };

  const t = {
    en: {
      title: "Conference Committees",
      desc: "The dedicated academic and administrative teams ensuring the success of the conference.",
      viewMembers: "View Committee Members",
      loading: "Loading...",
    },
    ar: {
      title: "لجان المؤتمر",
      desc: "الفرق الأكاديمية والإدارية المتخصصة التي تضمن نجاح المؤتمر.",
      viewMembers: "عرض أعضاء اللجنة",
      loading: "جاري التحميل...",
    },
  }[language];

  const activeCommittee = committees[activeTab as keyof typeof committees];
  const activeMembers = getCommitteeMembers(activeTab);

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
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">{t.desc}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {Object.values(committees).map((comm) => (
              <button
                key={comm.id}
                onClick={() => setActiveTab(comm.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-start border group
                  ${
                    activeTab === comm.id
                      ? "bg-primary text-white border-accent shadow-xl shadow-primary/20"
                      : "bg-white text-primary hover:bg-secondary border-neutral-100"
                  }
                `}
              >
                <comm.icon
                  size={22}
                  className={
                    activeTab === comm.id
                      ? "text-accent"
                      : "text-primary/60 group-hover:text-primary"
                  }
                />
                <span className="font-bold flex-grow">
                  {isRtl ? comm.title.ar : comm.title.en}
                </span>
                <ChevronRight
                  size={18}
                  className={`transition-transform ${activeTab === comm.id ? "rotate-90" : ""} ${isRtl ? "rotate-180" : ""}`}
                />
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {activeMembers.length === 0 ? (
                <div className="col-span-full text-center py-12 text-neutral-400">
                  {language === "ar"
                    ? "لا يوجد أعضاء في هذه اللجنة حالياً"
                    : "No members in this committee yet"}
                </div>
              ) : (
                activeMembers.map((member) => (
                  <div
                    key={member._id}
                    className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-xl transition-all group hover:border-accent/20"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-accent/10">
                      <User size={30} />
                    </div>
                    <h3 className="font-bold text-primary text-lg mb-1 leading-tight">
                      {language === "ar" ? member.name.ar : member.name.en}
                    </h3>
                    <div className="text-accent font-bold text-sm mb-4">
                      {language === "ar" ? member.title.ar : member.title.en}
                    </div>
                    {member.affiliation && (
                      <div className="text-neutral-400 text-xs uppercase tracking-widest leading-relaxed">
                        {language === "ar"
                          ? member.affiliation.ar
                          : member.affiliation.en}
                      </div>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
