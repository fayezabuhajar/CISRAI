import { Award, BookOpen, Briefcase, GraduationCap, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface KeynoteSpeakersProps {
  language: 'en' | 'ar';
}

export default function KeynoteSpeakers({ language }: KeynoteSpeakersProps) {
  const isRtl = language === 'ar';
  
  const speakers = [
    {
      name: { en: 'Prof. Dr. Ismail Yamin', ar: 'الأستاذ الدكتور إسماعيل يامين' },
      role: { en: 'Conference President', ar: 'رئيس المؤتمر' },
      title: { en: 'Dean of Scientific Research and Graduate Studies', ar: 'عميد البحث العلمي والدراسات العليا' },
      keynote: { 
        en: 'The Future of Scientific Research in Light of Digital Transformation', 
        ar: 'مستقبل البحث العلمي في ظل التحول الرقمي' 
      },
      affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
    },
    {
      name: { en: 'Dr. Kifah Al-Souri', ar: 'الدكتور كفاح الصوري' },
      role: { en: 'Preparatory Committee Chair', ar: 'رئيس اللجنة التحضيرية' },
      title: { en: 'Dean of Faculty of Sharia', ar: 'عميد كلية الشريعة' },
      keynote: { 
        en: 'Developing Sharia Curricula: Opportunities and AI Challenges', 
        ar: 'تطوير المناهج الشرعية: الفرص وتحديات الذكاء الاصطناعي' 
      },
      affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
    }
  ];

  const t = {
    en: {
      title: 'Keynote Speakers & Leadership',
      subtitle: 'Leading the academic discourse on AI and Sharia sciences.',
      topic: 'Keynote Topic',
    },
    ar: {
      title: 'المتحدثون الرئيسيون والقيادة',
      subtitle: 'قيادة الحوار الأكاديمي حول الذكاء الاصطناعي والعلوم الشرعية.',
      topic: 'موضوع الكلمة الرئيسية',
    }
  }[language];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="space-y-12">
          {speakers.map((speaker, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] border border-neutral-100 overflow-hidden shadow-xl shadow-primary/5 flex flex-col md:flex-row border-accent/10"
            >
              <div className="md:w-1/3 bg-primary p-12 flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 w-48 h-48 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-white/20 flex items-center justify-center shadow-2xl">
                  <span className="text-7xl font-black text-white">
                    {(isRtl ? speaker.name.ar : speaker.name.en).split(' ')[0].charAt(0)}
                  </span>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="speaker-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="currentColor" className="text-accent" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#speaker-pattern)" />
                  </svg>
                </div>
              </div>

              <div className="md:w-2/3 p-8 md:p-12 relative">
                <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-accent/20">
                  {isRtl ? speaker.role.ar : speaker.role.en}
                </div>
                <h2 className="text-3xl font-bold text-primary mb-2">{isRtl ? speaker.name.ar : speaker.name.en}</h2>
                <div className="text-accent font-bold mb-8 flex items-center gap-2">
                  <GraduationCap size={18} />
                  <span>{isRtl ? speaker.title.ar : speaker.title.en}</span>
                </div>

                <div className="bg-secondary/20 p-8 rounded-3xl border border-accent/10 relative mb-8 overflow-hidden shadow-inner">
                  <div className="absolute top-4 right-4 text-accent/10">
                    <Quote size={64} />
                  </div>
                  <div className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-3">{t.topic}</div>
                  <p className="text-xl font-bold text-primary relative z-10 leading-relaxed">
                    "{isRtl ? speaker.keynote.ar : speaker.keynote.en}"
                  </p>
                </div>

                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <Briefcase size={14} className="text-accent" />
                  <span>{isRtl ? speaker.affiliation.ar : speaker.affiliation.en}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
