import { useState } from 'react';
import { Search, Mail, MailOpen, Calendar, User, MessageSquare, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MessagesManagementProps {
  language: 'en' | 'ar';
}

interface Message {
  id: string;
  senderName: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}

export default function MessagesManagement({ language }: MessagesManagementProps) {
  const isRtl = language === 'ar';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderName: 'Dr. Ahmed Al-Rashid',
      email: 'ahmed.rashid@university.edu',
      subject: 'Conference Schedule Inquiry',
      content: 'Dear Conference Committee, I would like to inquire about the detailed schedule for the conference sessions. Could you please provide information about the timing of presentations and breaks? Looking forward to your response.',
      date: '2026-01-30T14:30:00',
      isRead: false
    },
    {
      id: '2',
      senderName: 'Prof. Fatima Hassan',
      email: 'fatima.hassan@university.edu',
      subject: 'Accommodation Recommendations',
      content: 'Hello, I am traveling from Saudi Arabia to attend the conference. Could you recommend hotels near the conference venue? Also, are there any special rates for conference participants?',
      date: '2026-01-29T10:15:00',
      isRead: false
    },
    {
      id: '3',
      senderName: 'Mohammad Khalil',
      email: 'mohammad.khalil@student.edu',
      subject: 'Student Registration Discount',
      content: 'Greetings, I am a PhD student interested in attending the conference. I noticed there are different registration fees. Is there a student discount available? What documentation is required?',
      date: '2026-01-28T16:45:00',
      isRead: true
    },
    {
      id: '4',
      senderName: 'Dr. Sara Al-Mahmoud',
      email: 'sara.mahmoud@researcher.org',
      subject: 'Paper Submission Extension Request',
      content: 'Dear Organizing Committee, Due to unforeseen circumstances, I am requesting a brief extension for my paper submission. Would it be possible to get an additional week? The paper is nearly complete.',
      date: '2026-01-27T09:20:00',
      isRead: true
    },
    {
      id: '5',
      senderName: 'Ali Hassan',
      email: 'ali.hassan@institute.edu',
      subject: 'Partnership Opportunity',
      content: 'Hello, Our institute is interested in partnering with your conference for future events. We would like to discuss potential collaboration opportunities. Please let us know how we can proceed.',
      date: '2026-01-26T11:00:00',
      isRead: false
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const t = {
    en: {
      title: 'Contact Messages',
      subtitle: 'Manage inquiries and contact form submissions',
      search: 'Search messages...',
      filterByStatus: 'Filter by Status',
      all: 'All Messages',
      unread: 'Unread',
      read: 'Read',
      sender: 'Sender',
      subject: 'Subject',
      date: 'Date',
      status: 'Status',
      viewMessage: 'View Message',
      markAsRead: 'Mark as Read',
      markAsUnread: 'Mark as Unread',
      totalMessages: 'Total Messages',
      unreadMessages: 'Unread Messages',
      close: 'Close',
      from: 'From',
      email: 'Email',
      receivedOn: 'Received On'
    },
    ar: {
      title: 'رسائل التواصل',
      subtitle: 'إدارة الاستفسارات ونماذج الاتصال',
      search: 'البحث في الرسائل...',
      filterByStatus: 'تصفية حسب الحالة',
      all: 'جميع الرسائل',
      unread: 'غير مقروءة',
      read: 'مقروءة',
      sender: 'المرسل',
      subject: 'الموضوع',
      date: 'التاريخ',
      status: 'الحالة',
      viewMessage: 'عرض الرسالة',
      markAsRead: 'تعليم كمقروءة',
      markAsUnread: 'تعليم كغير مقروءة',
      totalMessages: 'إجمالي الرسائل',
      unreadMessages: 'الرسائل غير المقروءة',
      close: 'إغلاق',
      from: 'من',
      email: 'البريد الإلكتروني',
      receivedOn: 'استلمت في'
    }
  }[language];

  const filteredMessages = messages.filter(m => {
    const matchesSearch =
      m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'unread' && !m.isRead) ||
      (statusFilter === 'read' && m.isRead);

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const toggleReadStatus = (id: string) => {
    setMessages(messages.map(m =>
      m.id === id ? { ...m, isRead: !m.isRead } : m
    ));
  };

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      toggleReadStatus(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isRtl ? 'ar' : 'en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-950 mb-2">{t.title}</h1>
        <p className="text-neutral-500">{t.subtitle}</p>
        <div className="w-24 h-1 bg-emerald-600 rounded-full mt-4" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{messages.length}</div>
              <div className="text-blue-100">{t.totalMessages}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <MailOpen size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{unreadCount}</div>
              <div className="text-red-100">{t.unreadMessages}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-emerald-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-3.5 text-emerald-600`} size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none`}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="unread">{t.unread}</option>
              <option value="read">{t.read}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-3xl shadow-lg border border-emerald-50 overflow-hidden">
        <div className="divide-y divide-emerald-50">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => viewMessage(message)}
              className={`p-6 hover:bg-emerald-50/50 transition-all cursor-pointer ${
                !message.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0 ${
                  message.isRead ? 'bg-emerald-500' : 'bg-blue-600'
                }`}>
                  {message.isRead ? <MailOpen size={24} /> : <Mail size={24} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-bold text-emerald-950 truncate ${!message.isRead ? 'text-blue-900' : ''}`}>
                          {message.subject}
                        </h3>
                        {!message.isRead && (
                          <span className="shrink-0 w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <User size={14} />
                        <span className="truncate">{message.senderName}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="truncate">{message.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 shrink-0">
                      <Calendar size={14} />
                      <span>{formatDate(message.date)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-2 mt-2">
                    {message.content}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadStatus(message.id);
                    }}
                    className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {message.isRead ? t.markAsUnread : t.markAsRead}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-emerald-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedMessage.senderName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-950 mb-2">{selectedMessage.subject}</h2>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <User size={16} className="text-emerald-600" />
                        <span className="font-medium">{t.from}:</span>
                        <span>{selectedMessage.senderName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail size={16} className="text-emerald-600" />
                        <span className="font-medium">{t.email}:</span>
                        <span>{selectedMessage.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Calendar size={16} className="text-emerald-600" />
                        <span className="font-medium">{t.receivedOn}:</span>
                        <span>{formatDate(selectedMessage.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-3">
                  <MessageSquare size={16} />
                  <span>{isRtl ? 'محتوى الرسالة' : 'Message Content'}</span>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-6">
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 bg-emerald-900 text-white px-6 py-3 rounded-xl hover:bg-emerald-800 transition-all font-medium"
                >
                  {t.close}
                </button>
                <button
                  onClick={() => {
                    toggleReadStatus(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="flex-1 bg-neutral-100 text-neutral-700 px-6 py-3 rounded-xl hover:bg-neutral-200 transition-all font-medium"
                >
                  {selectedMessage.isRead ? t.markAsUnread : t.markAsRead}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
