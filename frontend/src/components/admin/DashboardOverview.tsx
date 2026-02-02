import { Users, Mic2, UserCheck, FileText, Mail, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardOverviewProps {
  language: 'en' | 'ar';
}

export default function DashboardOverview({ language }: DashboardOverviewProps) {
  const isRtl = language === 'ar';

  const t = {
    en: {
      title: 'Dashboard Overview',
      subtitle: 'Conference Management Statistics',
      committees: 'Committees',
      speakers: 'Keynote Speakers',
      participants: 'Registered Participants',
      reviewers: 'Reviewer Requests',
      messages: 'Unread Messages',
      totalMembers: 'Total Committee Members',
      activeSpeakers: 'Active Speakers',
      paidParticipants: 'Paid Participants',
      pendingReviewers: 'Pending Reviewers',
      newMessages: 'New Messages'
    },
    ar: {
      title: 'نظرة عامة',
      subtitle: 'إحصائيات إدارة المؤتمر',
      committees: 'اللجان',
      speakers: 'المتحدثون',
      participants: 'المشاركون المسجلون',
      reviewers: 'طلبات التحكيم',
      messages: 'الرسائل غير المقروءة',
      totalMembers: 'إجمالي أعضاء اللجان',
      activeSpeakers: 'المتحدثون النشطون',
      paidParticipants: 'المشاركون المدفوعون',
      pendingReviewers: 'المحكمون المعلقون',
      newMessages: 'رسائل جديدة'
    }
  }[language];

  const stats = [
    {
      title: t.totalMembers,
      value: '45',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: t.activeSpeakers,
      value: '8',
      icon: Mic2,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: t.paidParticipants,
      value: '127',
      icon: UserCheck,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: t.pendingReviewers,
      value: '12',
      icon: FileText,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      title: t.newMessages,
      value: '5',
      icon: Mail,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-950 mb-2">{t.title}</h1>
        <p className="text-neutral-500">{t.subtitle}</p>
        <div className="w-24 h-1 bg-emerald-600 rounded-full mt-4" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg shadow-emerald-900/5 border border-emerald-50 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                  <Icon size={28} className={stat.textColor} />
                </div>
                <TrendingUp size={20} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-emerald-950 mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-500">{stat.title}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-emerald-900/5 border border-emerald-50">
          <h2 className="text-2xl font-bold text-emerald-950 mb-6">
            {isRtl ? 'إجراءات سريعة' : 'Quick Actions'}
          </h2>
          <div className="space-y-4">
            <button className="w-full px-6 py-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-left transition-all flex items-center gap-4">
              <Users className="text-emerald-600" size={20} />
              <span className="font-medium text-emerald-950">
                {isRtl ? 'إضافة عضو لجنة جديد' : 'Add New Committee Member'}
              </span>
            </button>
            <button className="w-full px-6 py-4 bg-purple-50 hover:bg-purple-100 rounded-xl text-left transition-all flex items-center gap-4">
              <Mic2 className="text-purple-600" size={20} />
              <span className="font-medium text-emerald-950">
                {isRtl ? 'إضافة متحدث جديد' : 'Add New Speaker'}
              </span>
            </button>
            <button className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-all flex items-center gap-4">
              <UserCheck className="text-blue-600" size={20} />
              <span className="font-medium text-emerald-950">
                {isRtl ? 'مراجعة المشاركين' : 'Review Participants'}
              </span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-8 shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-6">
            {isRtl ? 'حالة النظام' : 'System Status'}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">{isRtl ? 'حالة الخادم' : 'Server Status'}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">{isRtl ? 'نشط' : 'Active'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">{isRtl ? 'قاعدة البيانات' : 'Database'}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">{isRtl ? 'متصل' : 'Connected'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">{isRtl ? 'آخر تحديث' : 'Last Update'}</span>
              <span className="font-medium">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
