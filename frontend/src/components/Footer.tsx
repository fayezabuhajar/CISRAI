import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  language: "en" | "ar";
}

export default function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isRtl = language === "ar";

  const t = {
    en: {
      about: "Curricula in Islamic Sciences",
      aboutText:
        "An international academic conference exploring the impact of Artificial Intelligence on Sharia sciences and research methodologies.",
      links: "Quick Navigation",
      contact: "Contact Us",
      organizedBy:
        "Organized by Faculty of Sharia & Deanship of Scientific Research",
      rights: "All rights reserved.",
      university: "Amman Arab University",
    },
    ar: {
      about: "مناهج العلوم الشرعية",
      aboutText:
        "مؤتمر أكاديمي دولي يستكشف أثر الذكاء الاصطناعي على العلوم الشرعية ومنهجيات البحث العلمي.",
      links: "روابط سريعة",
      contact: "اتصل بنا",
      organizedBy: "تنظيم كلية الشريعة وعمادة البحث العلمي",
      rights: "جميع الحقوق محفوظة.",
      university: "جامعة عمان العربية",
    },
  }[language];

  return (
    <footer className="bg-[#333333] text-[#F5F0E6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-start gap-3">
              <img
                src="/logo1.png"
                alt="CISRAI 2026 logo"
                className="w-14 h-14 object-contain flex-shrink-0"
                loading="lazy"
              />
              <div className="space-y-1 leading-snug max-w-xs">
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
                <div className="h-0.5 w-12 bg-[#D4AF37]/80 rounded-full" />
              </div>
            </Link>
            <p className="text-[#F5F0E6]/60 text-sm leading-relaxed max-w-xs">
              {t.aboutText}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-6 uppercase tracking-widest text-xs">
              {t.links}
            </h3>
            <ul className="space-y-4">
              {[
                { label: isRtl ? "الرئيسية" : "Home", path: "/" },
                { label: isRtl ? "عن المؤتمر" : "Info", path: "/info" },
                {
                  label: isRtl ? "التسجيل" : "Registration",
                  path: "/registration",
                },
                { label: isRtl ? "اتصل بنا" : "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#F5F0E6]/80 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-6 uppercase tracking-widest text-xs">
              {t.contact}
            </h3>
            <div className="space-y-4 text-sm text-[#F5F0E6]/80">
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#D4AF37]" />
                <span className="break-all">CISRAI2026@aau.edu.jo</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#D4AF37]" />
                <span dir="ltr">+962 6 4790222</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-[#D4AF37]" />
                <span>{isRtl ? "عمان، الأردن" : "Amman, Jordan"}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-6 uppercase tracking-widest text-xs">
              {isRtl ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <GraduationCap size={16} />
                <span className="text-xs font-bold">
                  {isRtl ? "كلية الشريعة" : "Faculty of Sharia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start">
          <p className="text-xs text-[#F5F0E6]/40">
            © {currentYear} {t.university}. {t.rights}
          </p>
          <div className="text-[10px] text-[#F5F0E6]/20 uppercase tracking-widest font-bold">
            {t.organizedBy}
          </div>
        </div>
      </div>

      {/* Hexagonal Islamic Background Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="islamic-footer-bg"
              x="0"
              y="0"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0 L90 26 L90 78 L60 104 L30 78 L30 26 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
              <path
                d="M60 30 Q60 25, 65 25 L65 40 Q65 48, 60 52 Q55 48, 55 40 L55 25 Q60 25, 60 30"
                fill="none"
                stroke="#E6D8AD"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-footer-bg)" />
        </svg>
      </div>
    </footer>
  );
}
