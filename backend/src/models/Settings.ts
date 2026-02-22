import mongoose, { Schema } from "mongoose";

export interface IVenueFeature {
  en: string;
  ar: string;
}

export interface IImportantDate {
  titleEn: string;
  titleAr: string;
  date: string;
  descEn: string;
  descAr: string;
  highlight: boolean;
}

export interface ISponsor {
  nameEn: string;
  nameAr: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
}

export interface IVenueSettings {
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  aboutEn: string;
  aboutAr: string;
  phone: string;
  email: string;
  mapUrl: string;
  features: IVenueFeature[];
}

export interface ISettings {
  _id: string;
  venue: IVenueSettings;
  importantDates: IImportantDate[];
  patronNameEn: string;
  patronNameAr: string;
  sponsors: ISponsor[];
  updatedAt: Date;
  createdAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    venue: {
      nameEn: {
        type: String,
        required: true,
        default: "Amman Arab University",
      },
      nameAr: {
        type: String,
        required: true,
        default: "جامعة عمان العربية",
      },
      addressEn: {
        type: String,
        required: true,
        default: "Jordan Street, Mobis, Amman, Jordan",
      },
      addressAr: {
        type: String,
        required: true,
        default: "شارع الأردن، موبص، عمان، الأردن",
      },
      aboutEn: {
        type: String,
        required: true,
        default:
          "Amman Arab University (AAU) is a leading institution in Jordan, committed to academic excellence and scientific research. The campus provides a modern and inspiring environment for scholars to share knowledge and foster innovation in Islamic sciences.",
      },
      aboutAr: {
        type: String,
        required: true,
        default:
          "تعد جامعة عمان العربية مؤسسة رائدة في الأردن، ملتزمة بالتميز الأكاديمي والبحث العلمي. يوفر الحرم الجامعي بيئة حديثة وملهمة للعلماء لتبادل المعرفة وتعزيز الابتكار في العلوم الشرعية.",
      },
      phone: {
        type: String,
        required: true,
        default: "+962 6 4790222",
      },
      email: {
        type: String,
        required: true,
        default: "info@aau.edu.jo",
      },
      mapUrl: {
        type: String,
        required: true,
        default: "https://maps.app.goo.gl/EvfuXJJCKszZdu3e9",
      },
      features: {
        type: [
          {
            en: { type: String, required: true },
            ar: { type: String, required: true },
          },
        ],
        default: [
          { en: "Main Conference Auditoriums", ar: "قاعات المؤتمرات الرئيسية" },
          { en: "Modern Research Labs", ar: "مختبرات بحثية حديثة" },
          {
            en: "High-speed Academic Network",
            ar: "شبكة أكاديمية عالية السرعة",
          },
          {
            en: "A Mosque within the University Campus",
            ar: "مسجد داخل الحرم الجامعي",
          },
          { en: "Scientific Exhibition Areas", ar: "مساحات للمعارض العلمية" },
          { en: "Catering & Dining Facilities", ar: "مرافق الإطعام والضيافة" },
        ],
      },
    },
    patronNameEn: {
      type: String,
      required: true,
      default: "Prof. Dr. Ismail Yamin",
    },
    patronNameAr: {
      type: String,
      required: true,
      default: "الأستاذ الدكتور إسماعيل يامين",
    },
    sponsors: {
      type: [
        {
          nameEn: { type: String, required: true },
          nameAr: { type: String, required: true },
          logoUrl: { type: String, required: true },
          websiteUrl: { type: String, required: false },
          order: { type: Number, required: true, default: 0 },
        },
      ],
      default: [],
    },
    importantDates: {
      type: [
        {
          titleEn: { type: String, required: true },
          titleAr: { type: String, required: true },
          date: { type: String, required: true },
          descEn: { type: String, required: true },
          descAr: { type: String, required: true },
          highlight: { type: Boolean, default: false },
        },
      ],
      default: [
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
      ],
    },
  },
  { timestamps: true },
);

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model<ISettings>("Settings", settingsSchema);

export default Settings;
