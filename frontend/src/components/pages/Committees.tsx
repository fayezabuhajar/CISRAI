import { Award, Users, ShieldCheck, Cpu, ChevronRight, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CommitteesProps {
  language: 'en' | 'ar';
}

export default function Committees({ language }: CommitteesProps) {
  const [activeTab, setActiveTab] = useState('scientific');
  const isRtl = language === 'ar';

  const committees = {
    scientific: {
      id: 'scientific',
      title: { en: 'Scientific Committee', ar: 'اللجنة العلمية' },
      icon: Award,
      members: [
        {
          name: { en: 'Dr. Kifah Al-Souri', ar: 'د. كفاح الصوري' },
          title: { en: 'Chair', ar: 'رئيس اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Prof. Dr. Hail Dawood', ar: 'أ.د. هايل داود' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'University of Jordan', ar: 'الجامعة الأردنية' }
        },
        {
          name: { en: 'Prof. Dr. Abdulnasser Abu Al-Basal', ar: 'أ.د. عبد الناصر أبو البصل' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'University of Jordan', ar: 'الجامعة الأردنية' }
        },
        {
          name: { en: 'Prof. Dr. Ismail Shendi', ar: 'أ.د. إسماعيل شندي' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Palestine Technical University – Kadoorie, Palestine', ar: 'جامعة فلسطين التقنية – خضوري، فلسطين' }
        },
        {
          name: { en: 'Prof. Dr. Jameel Al-Rifai', ar: 'أ.د. جميل الرفاعي' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'University of Jordan', ar: 'الجامعة الأردنية' }
        },
        {
          name: { en: 'Prof. Dr. Khaled Abu Shaeira', ar: 'أ.د. خالد أبو شعيرة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Prof. Dr. Mohammad Tlafha', ar: 'أ.د. محمد طلافحة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Yarmouk University', ar: 'جامعة اليرموك' }
        },
        {
          name: { en: 'Dr. Alaa Al-Bourini', ar: 'د. آلاء البوريني' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Fatima Kassab', ar: 'د. فاطمة قصاب' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Fajr Qutayshat', ar: 'د. فجر قطيشات' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Ms. Doaa Al-Zoubi', ar: 'أ. دعاء الزعبي' },
          title: { en: 'Rapporteur', ar: 'مقررة اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        }
      ]
    },
    preparatory: {
      id: 'preparatory',
      title: { en: 'Preparatory Committee', ar: 'اللجنة التحضيرية' },
      icon: Users,
      members: [
        {
          name: { en: 'Prof. Dr. Hassan Al-Zoubi', ar: 'أ.د. حسن الزعبي' },
          title: { en: 'Chair', ar: 'رئيس اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Hajar Al-Akkour', ar: 'د. هاجر العكور' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Abeer Al-Tarawneh', ar: 'د. عبير الطراونة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Afaf Adinat', ar: 'د. عفاف عدينات' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Nusaiba Al-Mousa', ar: 'د. نسيبة الموسى' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Al-Muntasir Qudoura', ar: 'د. المنتصر قدورة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Lina Al-Jarrah', ar: 'د. لينا الجراح' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Bilal Abu Aisha', ar: 'د. بلال أبو عيشة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Sally Al-Shoura', ar: 'د. سالي الشورة' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Ms. Mariam Al-Ghamri', ar: 'أ. مريم الغامري' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Ms. Nour Al-Jarrah', ar: 'أ. نور الجراح' },
          title: { en: 'Rapporteur', ar: 'مقررة اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        }
      ]
    },
    media: {
      id: 'media',
      title: { en: 'Media Committee', ar: 'اللجنة الإعلامية' },
      icon: ShieldCheck,
      members: [
        {
          name: { en: 'Prof. Dr. Ahmad Al-Sheeha', ar: 'أ.د. أحمد الشيحة' },
          title: { en: 'Chair', ar: 'رئيس اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Bilal Abu Qudoum', ar: 'د. بلال أبو قدوم' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Prof. Dr. Suhaila Bannat', ar: 'أ.د. سهيلة بنات' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Kamal Alayan', ar: 'د. كمال علايان' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Dr. Fayza Al-Sukar', ar: 'د. فايزة السكر' },
          title: { en: 'Vice President – Jordan Scholars Association', ar: 'نائب رئيس – جمعية علماء الأردن' },
          affiliation: { en: 'Jordan Scholars Association', ar: 'جمعية علماء الأردن' }
        }
      ]
    },
    technical: {
      id: 'technical',
      title: { en: 'Technical Committee', ar: 'اللجنة الفنية والتقنية' },
      icon: Cpu,
      members: [
        {
          name: { en: 'Dr. Mohammad Shehab', ar: 'د. محمد شهاب' },
          title: { en: 'Chair', ar: 'رئيس اللجنة' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Mr. Fayez Abu Hajar', ar: 'أ. فايز أبو حجر' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Ms. Maria Al-Shishani', ar: 'أ. ماريا الشيشاني' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        },
        {
          name: { en: 'Mr. Ahmad Al-Mahmoud', ar: 'أ. أحمد المحمود' },
          title: { en: 'Member', ar: 'عضو' },
          affiliation: { en: 'Amman Arab University', ar: 'جامعة عمان العربية' }
        }
      ]
    }
  };

  const t = {
    en: {
      title: 'Conference Committees',
      desc: 'The dedicated academic and administrative teams ensuring the success of the conference.',
      viewMembers: 'View Committee Members'
    },
    ar: {
      title: 'لجان المؤتمر',
      desc: 'الفرق الأكاديمية والإدارية المتخصصة التي تضمن نجاح المؤتمر.',
      viewMembers: 'عرض أعضاء اللجنة'
    }
  }[language];

  const activeCommittee = committees[activeTab as keyof typeof committees];

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
                  ${activeTab === comm.id 
                    ? 'bg-primary text-white border-accent shadow-xl shadow-primary/20' 
                    : 'bg-white text-primary hover:bg-secondary border-neutral-100'}
                `}
              >
                <comm.icon size={22} className={activeTab === comm.id ? 'text-accent' : 'text-primary/60 group-hover:text-primary'} />
                <span className="font-bold flex-grow">{isRtl ? comm.title.ar : comm.title.en}</span>
                <ChevronRight size={18} className={`transition-transform ${activeTab === comm.id ? 'rotate-90' : ''} ${isRtl ? 'rotate-180' : ''}`} />
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
              {activeCommittee.members.map((member, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-xl transition-all group hover:border-accent/20">
                  <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-accent/10">
                    <User size={30} />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-1 leading-tight">{isRtl ? member.name.ar : member.name.en}</h3>
                  <div className="text-accent font-bold text-sm mb-4">{isRtl ? member.title.ar : member.title.en}</div>
                  <div className="text-neutral-400 text-xs uppercase tracking-widest leading-relaxed">{isRtl ? member.affiliation.ar : member.affiliation.en}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
