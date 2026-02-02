import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Globe, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactUsProps {
  language: 'en' | 'ar';
}

export default function ContactUs({ language }: ContactUsProps) {
  const isRtl = language === 'ar';
  
  const t = {
    en: {
      title: 'Get in Touch',
      subtitle: 'Have questions? Our team is here to help you.',
      formTitle: 'Send a Direct Message',
      contactInfo: 'Official Channels',
      email: 'CISRAI2026@aau.edu.jo',
      phone: '+962 6 4790222',
      address: 'Jordan Street, Mobis, Amman, Jordan',
      submit: 'Send Message'
    },
    ar: {
      title: 'تواصل معنا',
      subtitle: 'هل لديك استفسارات؟ فريقنا هنا لمساعدتك.',
      formTitle: 'أرسل رسالة مباشرة',
      contactInfo: 'القنوات الرسمية',
      email: 'CISRAI2026@aau.edu.jo',
      phone: '4790222 6 962+',
      address: 'شارع الأردن، موبص، عمان، الأردن',
      submit: 'إرسال الرسالة'
    }
  }[language];

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20 border border-accent/10">
              <h2 className="text-2xl font-bold mb-10 relative z-10 text-white">{t.contactInfo}</h2>
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Mail size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">{isRtl ? 'البريد الإلكتروني' : 'Email'}</div>
                    <div className="text-sm font-medium break-all text-secondary">{t.email}</div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Phone size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">{isRtl ? 'الهاتف' : 'Phone'}</div>
                    <div className="text-sm font-medium text-secondary">{t.phone}</div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-1">{isRtl ? 'العنوان' : 'Address'}</div>
                    <div className="text-sm font-medium leading-relaxed text-secondary">{t.address}</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -mr-16 -mt-16 blur-3xl opacity-20" />
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
              <h3 className="font-bold text-primary mb-6">{isRtl ? 'تابعنا' : 'Follow Us'}</h3>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Globe].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-all border border-accent/10">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[32px] border border-neutral-100 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center border border-accent/10">
                  <MessageSquare size={24} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-primary">{t.formTitle}</h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">{isRtl ? 'الاسم' : 'Name'}</label>
                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">{isRtl ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input type="email" className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">{isRtl ? 'الموضوع' : 'Subject'}</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">{isRtl ? 'الرسالة' : 'Message'}</label>
                  <textarea className="w-full px-6 py-4 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all h-40 resize-none" />
                </div>
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                  <Send size={20} />
                  <span>{t.submit}</span>
                </button>
              </form>
            </div>

            <div className="mt-8 flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-accent/10">
              <ShieldCheck className="text-accent shrink-0" size={20} />
              <p className="text-primary/70 font-medium text-sm leading-relaxed">
                {isRtl ? 'نحن نحترم خصوصيتك. لن يتم استخدام بياناتك إلا للتواصل معك بخصوص استفسارك.' : 'We respect your privacy. Your data will only be used to contact you regarding your inquiry.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
