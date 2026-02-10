import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Calendar,
  FileText,
  Users,
  UserPlus,
  MapPin,
  Clock,
  ShieldCheck,
  UserSearch,
  Mic2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    home: "Home",
    info: "Conference Info",
    dates: "Important Dates",
    callForPapers: "Call for Papers",
    committees: "Committees",
    registration: "Registration",
    venue: "Venue",
    schedule: "Schedule",
    rules: "Registration Rules",
    reviewer: "Become a Reviewer",
    speakers: "Keynote Speakers",
    contact: "Contact Us",
    collapse: "Collapse",
    expand: "Expand",
  },
  ar: {
    home: "الرئيسية",
    info: "عن المؤتمر",
    dates: "التواريخ المهمة",
    callForPapers: "الدعوة لتقديم الأوراق",
    committees: "اللجان",
    registration: "التسجيل",
    venue: "مكان الانعقاد",
    schedule: "الجدول الزمني",
    rules: "قواعد التسجيل",
    reviewer: "كن محكماً",
    speakers: "المتحدثون الرئيسيون",
    contact: "اتصل بنا",
    collapse: "تصغير",
    expand: "توسيع",
  },
};

const navItems = [
  { key: "home", path: "/", icon: Home },
  { key: "info", path: "/info", icon: Info },
  { key: "dates", path: "/dates", icon: Calendar },
  { key: "callForPapers", path: "/call-for-papers", icon: FileText },
  { key: "committees", path: "/committees", icon: Users },
  { key: "speakers", path: "/speakers", icon: Mic2 },
  { key: "registration", path: "/registration", icon: UserPlus },
  { key: "venue", path: "/venue", icon: MapPin },
  { key: "schedule", path: "/schedule", icon: Clock },
  { key: "rules", path: "/rules", icon: ShieldCheck },
  { key: "reviewer", path: "/reviewer", icon: UserSearch },
  { key: "contact", path: "/contact", icon: Mail },
];

export function Sidebar({ language }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];
  const isRtl = language === "ar";

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const sidebarWidth = isCollapsed ? "80px" : "280px";
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "80px" },
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-[#D4AF37] text-white p-4 rounded-full shadow-2xl hover:bg-[#C5A059] transition-colors border border-[#D4AF37]/20"
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={isMobileOpen ? { x: 0 } : isRtl ? { x: 0 } : { x: 0 }}
        variants={sidebarVariants}
        className={`fixed top-0 bottom-0 z-50 bg-primary text-secondary shadow-2xl transition-all duration-300 ease-in-out
          ${isRtl ? "right-0" : "left-0"}
          ${isMobileOpen ? "w-[280px] translate-x-0" : "hidden lg:flex flex-col"}
          ${!isMobileOpen && isCollapsed ? "w-[80px]" : "w-[280px]"}
          border-accent/10
        `}
        style={{ borderInlineEndWidth: "1px" }}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6 border-b border-accent/10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="../../public/logo1.png"
              alt="Logo"
              className="w-22 h-20 object-contain flex-shrink-0"
              loading="lazy"
            />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden whitespace-normal max-w-[220px] leading-snug space-y-1 break-words hyphens-auto mt-1"
              >
                <div className="text-xs font-semibold text-white/90 leading-snug">
                  {language === "ar"
                    ? "واقع المناهج الدراسية في العلوم الشرعية والبحث العلمي"
                    : "The Reality of Curricula in Islamic Sciences & Research"}
                </div>

                <div className="text-[10px] text-accent uppercase tracking-[0.08em] font-semibold whitespace-normal">
                  {language === "ar"
                    ? "في ظل الذكاء الاصطناعي"
                    : " In Light of Artificial Intelligence"}
                </div>

                <div className="h-0.5 w-12 bg-accent/80 rounded-full" />
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative
                      ${
                        isActive
                          ? "bg-accent/20 text-white font-medium shadow-sm"
                          : "text-secondary/70 hover:bg-accent/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${isActive ? "text-accent" : "group-hover:text-accent"}`}
                    />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm"
                      >
                        {t[item.key as keyof typeof t]}
                      </motion.span>
                    )}
                    {isCollapsed && (
                      <div
                        className={`absolute ${isRtl ? "right-full mr-2" : "left-full ml-2"} px-2 py-1 bg-primary text-secondary text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[70] border border-accent/20`}
                      >
                        {t[item.key as keyof typeof t]}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center gap-4 px-6 py-4 border-t border-accent/10 text-secondary/50 hover:text-accent transition-colors"
        >
          {isCollapsed ? (
            isRtl ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )
          ) : (
            <>
              {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              <span className="text-sm">{t.collapse}</span>
            </>
          )}
        </button>

        {/* Background Islamic Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="islamic-sidebar"
                x="0"
                y="0"
                width="160"
                height="160"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M80 20 Q80 10, 85 10 L85 30 Q85 40, 80 50 Q75 40, 75 30 L75 10 Q80 10, 80 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M40 100 L40 130 Q40 140, 50 140 L70 140 Q80 140, 80 130 L80 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="120"
                  cy="60"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#islamic-sidebar)"
              className="text-accent"
            />
          </svg>
        </div>
      </motion.aside>
    </>
  );
}
