import { Calendar, Clock, Sparkles, Loader, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { settingsAPI } from "../../services/api";

interface ImportantDatesProps {
  language: "en" | "ar";
}

interface ImportantDate {
  titleEn: string;
  titleAr: string;
  date: string;
  descEn: string;
  descAr: string;
  highlight: boolean;
}

interface PaymentDeadline {
  dateEn: string;
  dateAr: string;
}

// Helper function to parse date string to Date object
const parseDate = (dateStr: string): Date => {
  // Try parsing DD/MM/YYYY format
  const ddmmyyyyMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  // Try parsing date ranges like "8–9 June 2026"
  const rangeMatch = dateStr.match(/(\d{1,2})[–-](\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (rangeMatch) {
    const [, startDay, , monthStr, year] = rangeMatch;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.findIndex((m) =>
      m.toLowerCase().startsWith(monthStr.toLowerCase()),
    );
    if (monthIndex >= 0) {
      return new Date(parseInt(year), monthIndex, parseInt(startDay));
    }
  }

  // Try natural date parsing as fallback
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate.getTime()) ? new Date(9999, 11, 31) : parsedDate;
};

// Sort dates by chronological order
const sortDates = (datesArray: ImportantDate[]): ImportantDate[] => {
  return [...datesArray].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

export default function ImportantDates({ language }: ImportantDatesProps) {
  const isRtl = language === "ar";
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [paymentDeadline, setPaymentDeadline] =
    useState<PaymentDeadline | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = (await settingsAPI.getImportantDates()) as {
          success: boolean;
          data: ImportantDate[];
        };
        if (response.success && response.data) {
          setDates(sortDates(response.data));
        }
      } catch (error) {
        console.error("Error fetching important dates:", error);
        // Set default dates if API fails
        setDates(
          sortDates([
            {
              titleEn: "Official Launch",
              titleAr: "الإطلاق الرسمي",
              date: "24/01/2026",
              descEn: "Official announcement and call for papers",
              descAr: "الإعلان الرسمي والدعوة لتقديم الأوراق",
              highlight: false,
            },
            {
              titleEn: "Abstract Deadline",
              titleAr: "الموعد النهائي للملخصات",
              date: "15/03/2026",
              descEn: "Last day to submit research abstracts",
              descAr: "آخر يوم لتقديم ملخصات الأبحاث",
              highlight: false,
            },
            {
              titleEn: "Full Paper Deadline",
              titleAr: "الموعد النهائي للأبحاث",
              date: "30/04/2026",
              descEn: "Last day to submit full research papers",
              descAr: "آخر يوم لتقديم الأبحاث الكاملة",
              highlight: false,
            },
            {
              titleEn: "Final Acceptance",
              titleAr: "إشعار القبول النهائي",
              date: "15/05/2026",
              descEn: "Authors notified of final acceptance",
              descAr: "إخطار المؤلفين بالقبول النهائي",
              highlight: false,
            },
            {
              titleEn: "Program Distribution",
              titleAr: "توزيع برنامج المؤتمر",
              date: "01/06/2026",
              descEn: "Official schedule released to participants",
              descAr: "إصدار الجدول الرسمي للمشاركين",
              highlight: false,
            },
            {
              titleEn: "Conference Days",
              titleAr: "أيام المؤتمر",
              date: "8–9 June 2026",
              descEn: "Main event at Amman Arab University",
              descAr: "الحدث الرئيسي في جامعة عمان العربية",
              highlight: true,
            },
          ]),
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentDeadline = async () => {
      try {
        const response = (await settingsAPI.getPaymentDeadline()) as {
          success: boolean;
          data: PaymentDeadline;
        };
        if (response.success && response.data) {
          setPaymentDeadline(response.data);
        }
      } catch (error) {
        console.error("Error fetching payment deadline:", error);
      }
    };

    fetchDates();
    fetchPaymentDeadline();
  }, []);

  const t = {
    en: {
      title: "Important Dates",
      subtitle: "Key milestones for authors and participants.",
      notice: "All deadlines are based on Jordan Local Time (GMT+3).",
      paymentDeadlineTitle: "Payment Deadline",
      paymentDeadlineDesc: "Last date to pay conference registration fees.",
    },
    ar: {
      title: "التواريخ المهمة",
      subtitle: "المواعيد النهائية الرئيسية للمؤلفين والمشاركين.",
      notice: "جميع المواعيد النهائية تعتمد على توقيت الأردن المحلي (GMT+3).",
      paymentDeadlineTitle: "آخر موعد لدفع الرسوم",
      paymentDeadlineDesc: "آخر موعد لدفع رسوم التسجيل في المؤتمر.",
    },
  }[language];

  if (loading) {
    return (
      <div className="py-20 bg-background min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

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
          <div
            className={`absolute ${isRtl ? "right-6" : "left-6"} top-0 bottom-0 w-0.5 bg-accent/20`}
          />

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
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border shadow-lg
                  ${item.highlight ? "bg-primary text-secondary border-accent/30" : "bg-white border-accent text-primary"}
                `}
                >
                  {item.highlight ? (
                    <Sparkles size={20} className="text-accent" />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`flex-grow p-8 rounded-[32px] border transition-all
                  ${item.highlight ? "bg-primary text-white border-accent/20 shadow-2xl shadow-primary/20" : "bg-white border-neutral-100 shadow-sm hover:shadow-xl"}
                `}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-xl">
                      {isRtl ? item.titleAr : item.titleEn}
                    </h3>
                    <div
                      className={`flex items-center gap-2 font-mono text-sm px-4 py-1.5 rounded-full border
                      ${item.highlight ? "bg-white/10 border-white/10 text-secondary" : "bg-secondary text-primary border-accent/10"}
                    `}
                    >
                      <Calendar size={14} className="text-accent" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <p
                    className={
                      item.highlight ? "text-secondary/80" : "text-neutral-500"
                    }
                  >
                    {isRtl ? item.descAr : item.descEn}
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
          <p className="text-sm text-neutral-600 font-medium leading-relaxed">
            {t.notice}
          </p>
        </div>

        {/* Payment Deadline Section */}
        {paymentDeadline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-8 bg-gradient-to-br from-accent/10 via-white to-primary/5 rounded-[32px] border-2 border-accent/30 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 text-primary flex items-center justify-center shrink-0 border-2 border-accent/30 shadow-lg">
                <DollarSign size={32} className="text-primary" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {t.paymentDeadlineTitle}
                </h3>
                <p className="text-neutral-600 mb-3">{t.paymentDeadlineDesc}</p>
                <div className="flex items-center gap-3 text-lg font-bold text-primary">
                  <Calendar size={20} className="text-accent" />
                  <span>
                    {isRtl ? paymentDeadline.dateAr : paymentDeadline.dateEn}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
