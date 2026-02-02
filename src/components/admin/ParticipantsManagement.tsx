import { useState } from 'react';
import { Search, Filter, UserCheck, ToggleLeft, ToggleRight, Mail, Phone, Building } from 'lucide-react';
import { motion } from 'motion/react';

interface ParticipantsManagementProps {
  language: 'en' | 'ar';
}

interface Participant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  type: 'Professor' | 'Student' | 'Guest';
  paymentStatus: boolean;
}

export default function ParticipantsManagement({ language }: ParticipantsManagementProps) {
  const isRtl = language === 'ar';
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      fullName: 'Dr. Ahmed Al-Rashid',
      email: 'ahmed.rashid@university.edu',
      phone: '+962 79 123 4567',
      institution: 'University of Jordan',
      type: 'Professor',
      paymentStatus: true
    },
    {
      id: '2',
      fullName: 'Sara Mohammad',
      email: 'sara.mohammad@student.edu',
      phone: '+962 78 234 5678',
      institution: 'Yarmouk University',
      type: 'Student',
      paymentStatus: false
    },
    {
      id: '3',
      fullName: 'Prof. Ali Hassan',
      email: 'ali.hassan@university.edu',
      phone: '+966 50 345 6789',
      institution: 'King Saud University',
      type: 'Professor',
      paymentStatus: true
    },
    {
      id: '4',
      fullName: 'Fatima Al-Zahra',
      email: 'fatima.zahra@guest.com',
      phone: '+971 52 456 7890',
      institution: 'Independent Researcher',
      type: 'Guest',
      paymentStatus: false
    },
    {
      id: '5',
      fullName: 'Mohammad Khalil',
      email: 'mohammad.khalil@student.edu',
      phone: '+962 77 567 8901',
      institution: 'Amman Arab University',
      type: 'Student',
      paymentStatus: true
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const t = {
    en: {
      title: 'Participants Management',
      subtitle: 'Manage registered conference participants',
      search: 'Search participants...',
      filterByType: 'Filter by Type',
      filterByPayment: 'Payment Status',
      all: 'All',
      professor: 'Professor',
      student: 'Student',
      guest: 'Guest',
      paid: 'Paid',
      unpaid: 'Unpaid',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      institution: 'Institution',
      type: 'Type',
      payment: 'Payment',
      totalParticipants: 'Total Participants',
      paidParticipants: 'Paid',
      unpaidParticipants: 'Unpaid'
    },
    ar: {
      title: 'إدارة المشاركين',
      subtitle: 'إدارة المشاركين المسجلين في المؤتمر',
      search: 'البحث عن المشاركين...',
      filterByType: 'تصفية حسب النوع',
      filterByPayment: 'حالة الدفع',
      all: 'الكل',
      professor: 'أستاذ',
      student: 'طالب',
      guest: 'ضيف',
      paid: 'مدفوع',
      unpaid: 'غير مدفوع',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      institution: 'المؤسسة',
      type: 'النوع',
      payment: 'الدفع',
      totalParticipants: 'إجمالي المشاركين',
      paidParticipants: 'مدفوع',
      unpaidParticipants: 'غير مدفوع'
    }
  }[language];

  const filteredParticipants = participants.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesPayment = 
      paymentFilter === 'all' ||
      (paymentFilter === 'paid' && p.paymentStatus) ||
      (paymentFilter === 'unpaid' && !p.paymentStatus);

    return matchesSearch && matchesType && matchesPayment;
  });

  const totalPaid = participants.filter(p => p.paymentStatus).length;
  const totalUnpaid = participants.filter(p => !p.paymentStatus).length;

  const togglePayment = (id: string) => {
    setParticipants(participants.map(p =>
      p.id === id ? { ...p, paymentStatus: !p.paymentStatus } : p
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Professor':
        return 'bg-purple-100 text-purple-700';
      case 'Student':
        return 'bg-blue-100 text-blue-700';
      case 'Guest':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'Professor':
        return isRtl ? 'أستاذ' : 'Professor';
      case 'Student':
        return isRtl ? 'طالب' : 'Student';
      case 'Guest':
        return isRtl ? 'ضيف' : 'Guest';
      default:
        return type;
    }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{participants.length}</div>
              <div className="text-blue-100">{t.totalParticipants}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{totalPaid}</div>
              <div className="text-emerald-100">{t.paidParticipants}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{totalUnpaid}</div>
              <div className="text-amber-100">{t.unpaidParticipants}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-emerald-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
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

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="Professor">{t.professor}</option>
              <option value="Student">{t.student}</option>
              <option value="Guest">{t.guest}</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              <option value="all">{t.all}</option>
              <option value="paid">{t.paid}</option>
              <option value="unpaid">{t.unpaid}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-emerald-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.name}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.email}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.phone}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.institution}
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.type}
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.payment}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {filteredParticipants.map((participant) => (
                <motion.tr
                  key={participant.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-emerald-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {participant.fullName.charAt(0)}
                      </div>
                      <div className="font-medium text-emerald-950">{participant.fullName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Mail size={16} className="text-emerald-600" />
                      <span className="text-sm">{participant.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Phone size={16} className="text-emerald-600" />
                      <span className="text-sm">{participant.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Building size={16} className="text-emerald-600" />
                      <span className="text-sm">{participant.institution}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getTypeColor(participant.type)}`}>
                      {getTypeLabel(participant.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => togglePayment(participant.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        participant.paymentStatus
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {participant.paymentStatus ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      <span>{participant.paymentStatus ? t.paid : t.unpaid}</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
