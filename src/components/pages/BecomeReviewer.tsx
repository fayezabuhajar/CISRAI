import { Award, CheckCircle, FileCheck, Send, UserCheck, ShieldCheck, Mail, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface BecomeReviewerProps {
  language: 'en' | 'ar';
}

export default function BecomeReviewer({ language }: BecomeReviewerProps) {
  const isRtl = language === 'ar';
  
  const content = {
    en: {
      title: 'Become a Reviewer',
      subtitle: 'Join our distinguished scientific committee.',
      eligibility: 'Eligibility Criteria',
      responsibilities: 'Reviewer Responsibilities',
      benefits: 'Member Benefits',
      formTitle: 'Expert Application Form'
    },
    ar: {
      title: 'كن محكماً معتمداً',
      subtitle: 'انضم إلى لجنتنا العلمية المتميزة.',
      eligibility: 'معايير الأهلية',
      responsibilities: 'مسؤوليات المحكم',
      benefits: 'مزايا العضوية',
      formTitle: 'نموذج طلب الخبراء'
    }
  }[language];

  const eligibility = [
    { en: 'PhD in Islamic Studies or Sharia.', ar: 'درجة الدكتوراه في الدراسات الإسلامية أو الشريعة.' },
    { en: 'Active research profile in relevant tracks.', ar: 'سجل بحثي نشط في المسارات ذات الصلة.' },
    { en: 'Proficiency in Arabic and/or English.', ar: 'إتقان اللغة العربية و/أو الإنجليزية.' },
  ];

  const benefits = [
    { en: 'Official Reviewer Certificate.', ar: 'شهادة تحكيم رسمية.' },
    { en: 'Recognition in Conference Proceedings.', ar: 'الاعتراف في وقائع المؤتمر.' },
    { en: 'Priority for Scientific Partnerships.', ar: 'الأولوية في الشراكات العلمية.' },
  ];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{content.title}</h1>
          <p className="text-neutral-500">{content.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Eligibility */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
            <div className="w-12 h-12 bg-secondary text-primary rounded-2xl flex items-center justify-center mb-6 border border-accent/10">
              <UserCheck size={24} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-6">{content.eligibility}</h2>
            <div className="space-y-4">
              {eligibility.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-neutral-600">
                  <CheckCircle size={16} className="text-accent shrink-0 mt-1" />
                  <span>{isRtl ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div whileHover={{ y: -5 }} className="bg-primary p-8 rounded-[32px] text-white shadow-2xl shadow-primary/20 border border-accent/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 text-accent rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <Award size={24} />
              </div>
              <h2 className="text-xl font-bold mb-6 text-white">{content.benefits}</h2>
              <div className="space-y-4">
                {benefits.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-secondary/80">
                    <CheckCircle size={16} className="text-accent shrink-0 mt-1" />
                    <span>{isRtl ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl opacity-10" />
          </motion.div>

          {/* Responsibilities */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-primary mb-6">{content.responsibilities}</h2>
            <div className="space-y-4">
              {[
                { en: 'constructive & timely feedback.', ar: 'ملاحظات بناءة وفي الوقت المحدد.' },
                { en: 'Adherence to ethical standards.', ar: 'الالتزام بالمعايير الأخلاقية.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-neutral-600">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2" />
                  <span>{isRtl ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-neutral-100 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center border border-accent/20 shadow-lg">
              <FileCheck size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-primary">{content.formTitle}</h2>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">{isRtl ? 'الاسم واللقب' : 'Name & Title'}</label>
                <input type="text" className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input type="email" className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">{isRtl ? 'المؤسسة الأكاديمية' : 'Academic Institution'}</label>
                <input type="text" className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">{isRtl ? 'رابط السيرة الذاتية (ORCID/Google Scholar)' : 'CV Link (ORCID/Scholar)'}</label>
                <input type="url" className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest">{isRtl ? 'مجالات الخبرة (مفصولة بفاصلة)' : 'Fields of Expertise (comma separated)'}</label>
              <textarea className="w-full px-5 py-4 rounded-xl bg-secondary/30 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all h-32" />
            </div>

            <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
              <Send size={20} />
              <span>{isRtl ? 'إرسال طلب الانضمام' : 'Submit Expert Application'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
