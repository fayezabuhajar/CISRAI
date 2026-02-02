import { Target, Users, BookOpen, Cpu, Lightbulb, GraduationCap, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

interface ConferenceInfoProps {
  language: 'en' | 'ar';
}

export default function ConferenceInfo({ language }: ConferenceInfoProps) {
  const isRtl = language === 'ar';
  
  const content = {
    en: {
      title: 'Conference Abstract & Details',
      introduction: 'Introduction',
      introText: 'The integration of Artificial Intelligence (AI) into academic spheres presents both immense opportunities and significant challenges for Sharia sciences. This conference aims to explore the impact of AI on Sharia curricula and scientific research, seeking a harmonious balance between Islamic authenticity and modern technological advancements. Through collaborative dialogue, we aim to redefine the future of Islamic education.',
      motivation: 'Motivation',
      motivationText: 'Driven by the rapid transformation of global education, there is an urgent need to evaluate how Islamic academic structures can leverage AI to enhance research quality while preserving the integrity of Sharia methodologies.',
      objectives: 'Conference Objectives',
      themes: 'Conference Themes & Tracks',
      audience: 'Target Audience',
    },
    ar: {
      title: 'نبذة عن المؤتمر والتفاصيل',
      introduction: 'مقدمة',
      introText: 'يمثل دمج الذكاء الاصطناعي في الأوساط الأكاديمية فرصاً هائلة وتحديات كبيرة للعلوم الشرعية. يهدف هذا المؤتمر إلى استكشاف تأثير الذكاء الاصطناعي على المناهج الشرعية والبحث العلمي، سعياً لتحقيق توازن متناغم بين الأصالة الإسلامية والتقدم التكنولوجي الحديث. ومن خلال الحوار التعاوني، نهدف إلى إعادة تعريف مستقبل التعليم الإسلامي.',
      motivation: 'الدوافع',
      motivationText: 'انطلاقاً من التحول السريع للتعليم العالمي، هناك حاجة ملحة لتقييم كيفية استفادة الهياكل الأكاديمية الإسلامية من الذكاء الاصطناعي لتعزيز جودة البحث مع الحفاظ على نزاهة المنهجيات الشرعية.',
      objectives: 'أهداف المؤتمر',
      themes: 'محاور المؤتمر ومساراته',
      audience: 'الجمهور المستهدف',
    }
  };

  const objectives = [
    { en: 'Diagnose the reality of Sharia curricula under digital transformation', ar: 'تشخيص واقع المناهج الشرعية في ظل التحول الرقمي' },
    { en: 'Analyze AI’s impact on Islamic scientific research', ar: 'تحليل أثر الذكاء الاصطناعي على البحث العلمي الإسلامي' },
    { en: 'Promote awareness of AI integration in Islamic education', ar: 'تعزيز الوعي بدمج الذكاء الاصطناعي في التعليم الإسلامي' },
    { en: 'Discuss ethical and Sharia challenges of AI usage', ar: 'مناقشة التحديات الأخلاقية والشرعية لاستخدام الذكاء الاصطناعي' },
    { en: 'Highlight successful AI-driven educational models', ar: 'تسليط الضوء على النماذج التعليمية الناجحة المدعومة بالذكاء الاصطناعي' },
    { en: 'Develop Sharia research methodologies aligned with modern standards', ar: 'تطوير منهجيات البحث الشرعي بما يتماشى مع المعايير الحديثة' },
    { en: 'Enhance collaboration between Sharia scholars and AI experts', ar: 'تعزيز التعاون بين علماء الشريعة وخبراء الذكاء الاصطناعي' },
    { en: 'Anticipate the future of Islamic curricula', ar: 'استشراف مستقبل المناهج الإسلامية' },
    { en: 'Exchange expertise and build academic partnerships', ar: 'تبادل الخبرات وبناء الشراكات الأكاديمية' },
    { en: 'Produce scientific recommendations to improve Sharia education quality', ar: 'تقديم توصيات علمية لتحسين جودة التعليم الشرعي' },
  ];

  const themes = [
    { en: 'Current status of Sharia curricula and content in educational institutions', ar: 'واقع المناهج والمحتوى الشرعي في المؤسسات التعليمية' },
    { en: 'Scientific research in Islamic sciences: reality and development prospects', ar: 'البحث العلمي في العلوم الشرعية: الواقع وآفاق التطوير' },
    { en: 'University-level Islamic education in the age of artificial intelligence', ar: 'التعليم الإسلامي الجامعي في عصر الذكاء الاصطناعي' },
    { en: 'Artificial intelligence and Sharia scientific research', ar: 'الذكاء الاصطناعي والبحث العلمي الشرعي' },
    { en: 'Educational content of Islamic sciences in the AI era', ar: 'المحتوى التعليمي للعلوم الشرعية في عصر الذكاء الاصطناعي' },
    { en: 'Practical experiences and pioneering models in producing Islamic academic curricula', ar: 'تجارب عملية ونماذج رائدة في إنتاج المناهج الأكاديمية الإسلامية' },
    { en: 'Role of educational and Sharia institutions in developing Islamic curricula', ar: 'دور المؤسسات التعليمية والشرعية في تطوير المناهج الإسلامية' },
  ];

  const targetAudience = [
    { en: 'Faculty members and researchers', ar: 'أعضاء هيئة التدريس والباحثون' },
    { en: 'Postgraduate students in Islamic sciences', ar: 'طلبة الدراسات العليا في العلوم الشرعية' },
    { en: 'Academic decision-makers', ar: 'صناع القرار الأكاديمي' },
    { en: 'Curriculum development specialists', ar: 'متخصصو تطوير المناهج' },
    { en: 'AI and educational technology experts', ar: 'خبراء الذكاء الاصطناعي وتقنيات التعليم' },
    { en: 'Islamic and educational institutions', ar: 'المؤسسات الإسلامية والتعليمية' },
    { en: 'Publishers and digital educational content developers', ar: 'الناشرون ومطورو المحتوى التعليمي الرقمي' },
  ];

  const t = content[language];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t.title}</h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </header>

        {/* Introduction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-neutral-100"
          >
            <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">{t.introduction}</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">{t.introText}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-neutral-100"
          >
            <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">{t.motivation}</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">{t.motivationText}</p>
          </motion.div>
        </div>

        {/* Objectives Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg border border-accent/20">
              <Target className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">{t.objectives}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectives.map((obj, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-accent/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-accent/10">
                  {index + 1}
                </div>
                <p className="text-neutral-700 font-medium">{isRtl ? obj.ar : obj.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Themes Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg border border-accent/20">
              <LayoutGrid className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">{t.themes}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-primary text-secondary p-8 rounded-[32px] flex flex-col justify-between border border-accent/10 shadow-xl"
              >
                <p className="text-white leading-relaxed font-medium">
                  {isRtl ? theme.ar : theme.en}
                </p>
                <div className="mt-6 flex justify-end opacity-20">
                  <Cpu size={40} className="text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Target Audience Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg border border-accent/20">
              <Users className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">{t.audience}</h2>
          </div>
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-neutral-100 shadow-2xl shadow-primary/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-30 -mr-32 -mt-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {targetAudience.map((audience, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center border border-accent/10">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-bold text-primary">{isRtl ? audience.ar : audience.en}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
