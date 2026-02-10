import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  language: 'en' | 'ar';
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  const isRtl = language === 'ar';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#D4AF37]/15 sticky top-0 z-40 shadow-sm h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Header Title / Info */}
        <div className="flex items-center gap-4">
          <div
            className={`hidden sm:block ${isRtl ? "text-right" : "text-left"}`}
          >
            <h1 className="text-sm font-bold text-[#333333] leading-tight">
              {language === "ar" ? (
                <>
                  واقع المناهج الدراسية في العلوم الشرعية والبحث العلمي
                  <br />
                  في ظل الذكاء الاصطناعي
                </>
              ) : (
                <>
                  The Reality of Curricula in Islamic Sciences and Scientific
                  Research
                  <br />
                  In Light of Artificial Intelligence
                </>
              )}
            </h1>

            <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mt-0.5">
              {language === "ar"
                ? "عمان، الأردن | 8-9 يونيو 2026"
                : "Amman, Jordan | June 8-9, 2026"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F0E6] text-[#333333] hover:bg-[#E6D8AD] transition-colors border border-[#D4AF37]/20"
          >
            <Globe className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium">
              {language === "en" ? "عربي" : "English"}
            </span>
          </button>

          <Link
            to="/registration"
            className="hidden md:block px-6 py-2 rounded-full bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#C5A059] transition-colors shadow-lg shadow-[#D4AF37]/20"
          >
            {language === "ar" ? "سجل الآن" : "Register Now"}
          </Link>
        </div>
      </div>
    </header>
  );
}