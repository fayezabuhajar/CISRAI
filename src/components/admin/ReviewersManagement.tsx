import { useState } from 'react';
import { Search, CheckCircle, XCircle, FileText, Mail, Phone, Building, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewersManagementProps {
  language: 'en' | 'ar';
}

interface ReviewerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  expertise: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ReviewersManagement({ language }: ReviewersManagementProps) {
  const isRtl = language === 'ar';
  const [requests, setRequests] = useState<ReviewerRequest[]>([
    {
      id: '1',
      name: 'Dr. Ahmed Al-Mansour',
      email: 'ahmed.mansour@university.edu',
      phone: '+962 79 111 2222',
      institution: 'University of Jordan',
      expertise: 'Islamic Jurisprudence & AI',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Prof. Fatima Al-Hassan',
      email: 'fatima.hassan@university.edu',
      phone: '+966 50 222 3333',
      institution: 'King Saud University',
      expertise: 'Sharia Law & Technology',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Dr. Mohammad Khalil',
      email: 'mohammad.khalil@azhar.edu',
      phone: '+20 10 333 4444',
      institution: 'Al-Azhar University',
      expertise: 'Islamic Ethics & Modern Sciences',
      status: 'approved'
    },
    {
      id: '4',
      name: 'Dr. Sara Al-Zahra',
      email: 'sara.zahra@university.edu',
      phone: '+971 52 444 5555',
      institution: 'UAE University',
      expertise: 'Islamic Education & Digital Learning',
      status: 'pending'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const t = {
    en: {
      title: 'Reviewer Requests',
      subtitle: 'Review and manage reviewer applications',
      search: 'Search reviewers...',
      filterByStatus: 'Filter by Status',
      all: 'All',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      institution: 'Institution',
      expertise: 'Field of Expertise',
      status: 'Status',
      actions: 'Actions',
      approve: 'Approve',
      reject: 'Reject',
      totalRequests: 'Total Requests',
      pendingRequests: 'Pending',
      approvedRequests: 'Approved'
    },
    ar: {
      title: 'طلبات التحكيم',
      subtitle: 'مراجعة وإدارة طلبات المحكمين',
      search: 'البحث عن المحكمين...',
      filterByStatus: 'تصفية حسب الحالة',
      all: 'الكل',
      pending: 'معلق',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      institution: 'المؤسسة',
      expertise: 'مجال الخبرة',
      status: 'الحالة',
      actions: 'الإجراءات',
      approve: 'الموافقة',
      reject: 'الرفض',
      totalRequests: 'إجمالي الطلبات',
      pendingRequests: 'معلق',
      approvedRequests: 'موافق عليه'
    }
  }[language];

  const filteredRequests = requests.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.expertise.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  const handleApprove = (id: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-amber-100 text-amber-700">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            {isRtl ? 'معلق' : 'Pending'}
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-700">
            <CheckCircle size={16} />
            {isRtl ? 'موافق عليه' : 'Approved'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-700">
            <XCircle size={16} />
            {isRtl ? 'مرفوض' : 'Rejected'}
          </span>
        );
      default:
        return null;
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
              <FileText size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{requests.length}</div>
              <div className="text-blue-100">{t.totalRequests}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{pendingCount}</div>
              <div className="text-amber-100">{t.pendingRequests}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{approvedCount}</div>
              <div className="text-emerald-100">{t.approvedRequests}</div>
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
              <option value="pending">{t.pending}</option>
              <option value="approved">{t.approved}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviewer Requests Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-emerald-50 hover:shadow-xl transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {request.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">{request.name}</h3>
                  <div className="mt-1">{getStatusBadge(request.status)}</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Mail size={16} className="text-emerald-600" />
                <span>{request.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Phone size={16} className="text-emerald-600" />
                <span>{request.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Building size={16} className="text-emerald-600" />
                <span>{request.institution}</span>
              </div>
              <div className="flex items-start gap-3">
                <Award size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-1">
                    {t.expertise}
                  </div>
                  <div className="text-sm font-medium text-emerald-950">{request.expertise}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            {request.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <CheckCircle size={18} />
                  <span>{t.approve}</span>
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <XCircle size={18} />
                  <span>{t.reject}</span>
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
