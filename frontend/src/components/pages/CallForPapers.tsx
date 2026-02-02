import { FileText, Mail, BookOpen, FileCheck, Award, Info, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CallForPapersProps {
  language: 'en' | 'ar';
}

export default function CallForPapers({ language }: CallForPapersProps) {
  const isRtl = language === 'ar';
  const t = {
    en: {
      title: 'Paper Submission & Publication',
      submission: 'Submission Process',
      email: 'scientific.research2@aau.edu.jo',
      pubTitle: 'Publication Options',
      rulesTitle: 'Paper Submission Rules',
      formatting: 'Formatting Guidelines',
      similarity: 'Similarity & AI Policy',
    },
    ar: {
      title: 'تقديم الأبحاث والنشر',
      submission: 'عملية التقديم',
      email: 'scientific.research2@aau.edu.jo',
      pubTitle: 'خيارات النشر',
      rulesTitle: 'قواعد تقديم الأوراق البحثية',
      formatting: 'إرشادات التنسيق',
      similarity: 'سياسة التشابه والذكاء الاصطناعي',
    }
  }[language];

  const publicationOptions = [
    {
      title: { en: 'Conference Proceedings', ar: 'كتاب وقائع المؤتمر' },
      desc: { en: 'Free publication in the official conference proceedings book.', ar: 'نشر مجاني في كتاب وقائع المؤتمر الرسمي.' },
      type: 'free'
    },
    {
      title: { en: 'Indexed Journals / Chapter Books', ar: 'المجلات المصنفة / كتب الفصول' },
      desc: { en: 'Optional publication in Springer or Scopus indexed journals.', ar: 'نشر اختياري في مجلات Springer أو Scopus المصنفة.' },
      fee: '400 USD',
      type: 'paid'
    }
  ];

  const rules = [
    { en: 'Paper must align with conference themes', ar: 'يجب أن تتماشى الورقة مع محاور المؤتمر' },
    { en: 'Subject to double-blind peer review', ar: 'تخضع الورقة لمراجعة الأقران مزدوجة التعمية' },
    { en: 'Accepted languages: Arabic & English', ar: 'اللغات المقبولة: العربية والإنجليزية' },
    { en: 'Original, unpublished work only', ar: 'العمل أصيل وغير منشور مسبقاً فقط' },
    { en: 'Maximum length: 20 pages or 10,000 words', ar: 'الحد الأقصى للطول: 20 صفحة أو 10,000 كلمة' },
    { en: 'Citation style: APA 7th edition', ar: 'نمط الاقتباس: الإصدار السابع من APA' },
  ];

  const formatting = [
    { en: 'Format: Microsoft Word (.docx)', ar: 'التنسيق: Microsoft Word (.docx)' },
    { en: 'Font: Times New Roman', ar: 'الخط: Times New Roman' },
    { en: 'Specific font sizes and spacing apply', ar: 'تطبق أحجام خطوط وتباعد محددة' },
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </header>

        {/* Submission Channel */}
        <section className="mb-16">
          <div className="bg-primary rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-primary/20 border border-accent/10 relative overflow-hidden">
            <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <Mail size={40} className="text-white" />
            </div>
            <div className="flex-grow text-center md:text-start relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">{t.submission}</h2>
              <p className="text-secondary/70 mb-4">{isRtl ? 'ترسل الأوراق البحثية عبر البريد الإلكتروني المخصص:' : 'Submit your papers via the dedicated conference email:'}</p>
              <div className="inline-block bg-white/10 px-6 py-3 rounded-xl font-mono text-lg border border-white/20 select-all text-secondary">
                {t.email}
              </div>
            </div>
            {/* Background Arch Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-10 -mr-32 -mt-32" />
          </div>
        </section>

        {/* Publication Options */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-primary mb-10 text-center">{t.pubTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publicationOptions.map((opt, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${opt.type === 'free' ? 'bg-secondary text-primary border-accent/20' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                    {opt.type === 'free' ? <BookOpen size={24} className="text-accent" /> : <Award size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{isRtl ? opt.title.ar : opt.title.en}</h3>
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed">{isRtl ? opt.desc.ar : opt.desc.en}</p>
                {opt.fee && (
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <span className="text-sm uppercase tracking-widest text-neutral-400">{isRtl ? 'الرسوم:' : 'Fee:'}</span>
                    <span className="text-accent">{opt.fee}</span>
                  </div>
                )}
                {!opt.fee && (
                  <div className="text-accent font-bold text-lg uppercase tracking-widest">
                    {isRtl ? 'مجاني' : 'Free'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-secondary/50 rounded-2xl border border-accent/10 flex gap-4 items-start">
            <Info className="text-accent shrink-0" />
            <p className="text-sm text-primary/80 leading-relaxed font-medium">
              {isRtl 
                ? 'ملاحظة: رسوم المشاركة في المؤتمر لا تشمل رسوم نشر Springer/Scopus. النشر في المجلات اختياري حسب رغبة الباحث.'
                : 'Note: Conference participation fees do not include Springer/Scopus publication fees. Journal publication is optional based on author preference.'
              }
            </p>
          </div>
        </section>

        {/* Rules & Formatting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center border border-accent/20">
                <FileCheck size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary">{t.rulesTitle}</h2>
            </div>
            <div className="space-y-4">
              {rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-accent/30 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-accent/10">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-neutral-700 font-medium">{isRtl ? rule.ar : rule.en}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center border border-accent/20">
                <FileText size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary">{t.formatting}</h2>
            </div>
            <div className="space-y-4 mb-10">
              {formatting.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-neutral-700 font-medium">{isRtl ? item.ar : item.en}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-amber-800">
                <AlertCircle size={24} />
                <h3 className="font-bold">{t.similarity}</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed mb-6">
                {isRtl 
                  ? 'يخضع كل بحث لفحص التشابه والذكاء الاصطناعي. الحد الأقصى المقبول للتشابه هو 25%.' 
                  : 'All papers undergo plagiarism and AI usage checks. Maximum acceptable similarity is 25%.'
                }
              </p>
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-amber-200 shadow-inner">
                <span className="text-sm font-bold text-amber-700 uppercase tracking-widest">{isRtl ? 'الحد الأقصى' : 'Max Limit'}</span>
                <span className="text-3xl font-black text-amber-900">25%</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
