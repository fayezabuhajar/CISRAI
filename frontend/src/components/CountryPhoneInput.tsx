import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface CountryPhoneInputProps {
  language: "en" | "ar";
  disabled?: boolean;
  required?: boolean;
  onChange?: (phone: string, country: Country) => void;
}

const countries: Country[] = [
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "AE", name: "UAE", dialCode: "+971", flag: "🇦🇪" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { code: "SY", name: "Syria", dialCode: "+963", flag: "🇸🇾" },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: "🇮🇶" },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: "🇵🇸" },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: "🇾🇪" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { code: "LY", name: "Libya", dialCode: "+218", flag: "🇱🇾" },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: "🇸🇩" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
];

const countryNamesAr: { [key: string]: string } = {
  JO: "الأردن",
  SA: "السعودية",
  AE: "الإمارات",
  EG: "مصر",
  KW: "الكويت",
  QA: "قطر",
  BH: "البحرين",
  OM: "عمان",
  LB: "لبنان",
  SY: "سوريا",
  IQ: "العراق",
  PS: "فلسطين",
  YE: "اليمن",
  MA: "المغرب",
  DZ: "الجزائر",
  TN: "تونس",
  LY: "ليبيا",
  SD: "السودان",
  TR: "تركيا",
  US: "الولايات المتحدة",
  GB: "بريطانيا",
  FR: "فرنسا",
  DE: "ألمانيا",
  MY: "ماليزيا",
  ID: "إندونيسيا",
  PK: "باكستان",
};

export function CountryPhoneInput({
  language,
  disabled,
  required,
  onChange,
}: CountryPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isRtl = language === "ar";

  const normalizeDigits = (value: string) => {
    const arabicIndic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const easternArabicIndic = [
      "۰",
      "۱",
      "۲",
      "۳",
      "۴",
      "۵",
      "۶",
      "۷",
      "۸",
      "۹",
    ];

    return value
      .split("")
      .map((char) => {
        const arabicIndex = arabicIndic.indexOf(char);
        if (arabicIndex >= 0) {
          return String(arabicIndex);
        }
        const easternIndex = easternArabicIndic.indexOf(char);
        if (easternIndex >= 0) {
          return String(easternIndex);
        }
        return char;
      })
      .join("");
  };

  const emitChange = (numberValue: string, countryValue: Country) => {
    const normalized = normalizeDigits(numberValue);
    const sanitizedNumber = normalized.replace(/\D/g, "");
    const fullPhone = `${countryValue.dialCode}${sanitizedNumber}`.trim();
    if (fullPhone === countryValue.dialCode) {
      return;
    }
    onChange?.(fullPhone, countryValue);
  };

  const filteredCountries = countries.filter((country) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchLower) ||
      (isRtl && countryNamesAr[country.code]?.includes(searchQuery))
    );
  });

  return (
    <div className="relative">
      <div className="flex gap-2">
        {/* Country Selector */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className="h-[46px] px-3 rounded-xl border border-emerald-100 bg-white hover:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed min-w-[130px]"
          >
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-emerald-900">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown
              size={16}
              className={`text-emerald-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown Menu */}
              <div
                className={`absolute ${isRtl ? "left-0" : "right-0"} top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 z-50 overflow-hidden`}
              >
                {/* Search */}
                <div className="p-3 border-b border-emerald-100">
                  <input
                    type="text"
                    placeholder={
                      isRtl ? "ابحث عن دولة..." : "Search country..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  />
                </div>

                {/* Countries List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                        setSearchQuery("");
                        emitChange(phoneNumber, country);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors text-left ${
                        selectedCountry.code === country.code
                          ? "bg-emerald-50"
                          : ""
                      }`}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-emerald-950">
                          {isRtl && countryNamesAr[country.code]
                            ? countryNamesAr[country.code]
                            : country.name}
                        </div>
                        <div className="text-xs text-emerald-600">
                          {country.dialCode}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-8 text-center text-neutral-400 text-sm">
                      {isRtl ? "لا توجد نتائج" : "No results found"}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative min-w-0">
          <Phone
            className={`absolute ${isRtl ? "right-4" : "left-4"} top-3.5 text-emerald-600`}
            size={18}
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const value = normalizeDigits(e.target.value).replace(/\D/g, "");
              setPhoneNumber(value);
              emitChange(value, selectedCountry);
            }}
            placeholder={isRtl ? "رقم الهاتف" : "Phone number"}
            disabled={disabled}
            required={required}
            className={`w-full ${isRtl ? "pr-12 pl-4 text-right" : "pl-12 pr-4"} py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed font-mono text-base`}
          />
        </div>
      </div>
    </div>
  );
}
