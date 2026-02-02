import { Calendar, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ImportantDatesProps {
  language: 'en' | 'ar';
}

export default function ImportantDates({ language }: ImportantDatesProps) {
  const isRtl = language === 'ar';
  
  const dates = [
    { 
      title: { en: 'Official Launch', ar: 'الإطلاق الرسمي' }, 
      date: '24/01/2026', 
      desc: { en: 'Official announcement and call for papers', ar: 'الإعلان الرسمي والدعوة لتقديم الأوراق' }
    },
    { 
      title: { en: 'Abstract Deadline', ar: 'الموعد النهائي للملخصات' }, 
      date: '15/03/2026', 
      desc: { en: 'Last day to submit research abstracts', ar: 'آخر يوم لتقديم ملخصات الأبحاث' }
    },
    { 
      title: { en: 'Full Paper Deadline', ar: 'الموعد النهائي للأبحاث' }, 
      date: '30/04/2026', 
      desc: { en: 'Last day to submit full research papers', ar: 'آخر يوم لتقديم الأبحاث الكاملة' }
    },
    { 
      title: { en: 'Final Acceptance', ar: 'إشعار القبول النهائي' }, 
      date: '15/05/2026', 
      desc: { en: 'Authors notified of final acceptance', ar: 'إخطار المؤلفين بالقبول النهائي' }
    },
    { 
      title: { en: 'Program Distribution', ar: 'توزيع برنامج المؤتمر' }, 
      date: '01/06/2026', 
      desc: { en: 'Official schedule released to participants', ar: 'إصدار الجدول الرسمي للمشاركين' }
    },
    { 
      title: { en: 'Conference Days', ar: 'أيام المؤتمر' }, 
      date: '8–9 June 2026', 
      desc: { en: 'Main event at Amman Arab University', ar: 'الحدث الرئيسي في جامعة عمان العربية' },
      highlight: true
    },
  ];

  const t = {
    en: {
      title: 'Important Dates',
      subtitle: 'Key milestones for authors and participants.',
      notice: 'All deadlines are based on Jordan Local Time (GMT+3).'
    },
    ar: {
      title: 'التواريخ المهمة',
      subtitle: 'المواعيد النهائية الرئيسية للمؤلفين والمشاركين.',
      notice: 'جميع المواعيد النهائية تعتمد على توقيت الأردن المحلي (GMT+3).'
    }
  }[language];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-0 bottom-0 w-0.5 bg-accent/20`} />

          <div className="space-y-12 relative">
            {dates.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-8 items-start"
              >
                {/* Dot */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border shadow-lg
                  ${item.highlight ? 'bg-primary text-secondary border-accent/30' : 'bg-white border-accent text-primary'}
                `}>
                  {item.highlight ? <Sparkles size={20} className="text-accent" /> : <Clock size={20} />}
                </div>

                {/* Card */}
                <div className={`flex-grow p-8 rounded-[32px] border transition-all
                  ${item.highlight ? 'bg-primary text-white border-accent/20 shadow-2xl shadow-primary/20' : 'bg-white border-neutral-100 shadow-sm hover:shadow-xl'}
                `}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-xl">{isRtl ? item.title.ar : item.title.en}</h3>
                    <div className={`flex items-center gap-2 font-mono text-sm px-4 py-1.5 rounded-full border
                      ${item.highlight ? 'bg-white/10 border-white/10 text-secondary' : 'bg-secondary text-primary border-accent/10'}
                    `}>
                      <Calendar size={14} className="text-accent" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <p className={item.highlight ? 'text-secondary/80' : 'text-neutral-500'}>
                    {isRtl ? item.desc.ar : item.desc.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 bg-white rounded-[32px] border border-neutral-100 flex items-center gap-4 shadow-xl shadow-primary/5">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0 border border-accent/10">
            <Clock size={24} className="text-accent" />
          </div>
          <p className="text-sm text-neutral-600 font-medium leading-relaxed">{t.notice}</p>
        </div>
      </div>
    </div>
  );
}
