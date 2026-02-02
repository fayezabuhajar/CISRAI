import { useState } from 'react';
import { Users, Mic2, UserCheck, FileText, Mail, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CommitteesManagement from '../admin/CommitteesManagement';
import SpeakersManagement from '../admin/SpeakersManagement';
import ParticipantsManagement from '../admin/ParticipantsManagement';
import ReviewersManagement from '../admin/ReviewersManagement';
import MessagesManagement from '../admin/MessagesManagement';
import DashboardOverview from '../admin/DashboardOverview';

interface AdminDashboardProps {
  language: 'en' | 'ar';
  onLogout: () => void;
}

type ActiveSection = 'overview' | 'committees' | 'speakers' | 'participants' | 'reviewers' | 'messages';

export default function AdminDashboard({ language, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isRtl = language === 'ar';

  const t = {
    en: {
      title: 'Admin Dashboard',
      overview: 'Overview',
      committees: 'Committees',
      speakers: 'Keynote Speakers',
      participants: 'Participants',
      reviewers: 'Reviewer Requests',
      messages: 'Contact Messages',
      logout: 'Logout'
    },
    ar: {
      title: 'لوحة الإدارة',
      overview: 'نظرة عامة',
      committees: 'اللجان',
      speakers: 'المتحدثون الرئيسيون',
      participants: 'المشاركون',
      reviewers: 'طلبات التحكيم',
      messages: 'الرسائل',
      logout: 'تسجيل الخروج'
    }
  }[language];

  const menuItems = [
    { id: 'overview' as ActiveSection, label: t.overview, icon: LayoutDashboard },
    { id: 'committees' as ActiveSection, label: t.committees, icon: Users },
    { id: 'speakers' as ActiveSection, label: t.speakers, icon: Mic2 },
    { id: 'participants' as ActiveSection, label: t.participants, icon: UserCheck },
    { id: 'reviewers' as ActiveSection, label: t.reviewers, icon: FileText },
    { id: 'messages' as ActiveSection, label: t.messages, icon: Mail },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview language={language} />;
      case 'committees':
        return <CommitteesManagement language={language} />;
      case 'speakers':
        return <SpeakersManagement language={language} />;
      case 'participants':
        return <ParticipantsManagement language={language} />;
      case 'reviewers':
        return <ReviewersManagement language={language} />;
      case 'messages':
        return <MessagesManagement language={language} />;
      default:
        return <DashboardOverview language={language} />;
    }
  };

  return (
    <div className={`min-h-screen bg-neutral-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-emerald-900 text-white p-3 rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : (isRtl ? 300 : -300) }}
        className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-72 bg-emerald-900 text-white shadow-2xl z-40 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : 'hidden lg:flex'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">AAU</span>
            </div>
            <div>
              <div className="text-lg font-bold">{t.title}</div>
              <div className="text-xs text-emerald-300">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} className={isActive ? 'text-emerald-400' : ''} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="m-4 flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">{t.logout}</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`lg:${isRtl ? 'mr-72' : 'ml-72'} min-h-screen`}>
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
