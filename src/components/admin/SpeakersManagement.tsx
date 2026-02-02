import { useState } from 'react';
import { Plus, Edit2, Trash2, Mic2, Search, Upload, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SpeakersManagementProps {
  language: 'en' | 'ar';
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  topic: string;
  photo: string;
  isActive: boolean;
}

export default function SpeakersManagement({ language }: SpeakersManagementProps) {
  const isRtl = language === 'ar';
  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: '1',
      name: 'Dr. Ahmed Al-Mansour',
      title: 'Professor of Islamic Studies',
      affiliation: 'King Saud University',
      topic: 'AI in Islamic Jurisprudence',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      isActive: true
    },
    {
      id: '2',
      name: 'Prof. Fatima Al-Zahra',
      title: 'Dean of Sharia Faculty',
      affiliation: 'Al-Azhar University',
      topic: 'Modern Challenges in Islamic Education',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isActive: true
    },
    {
      id: '3',
      name: 'Dr. Mohammad Hassan',
      title: 'Research Scholar',
      affiliation: 'University of Jordan',
      topic: 'Digital Transformation in Religious Studies',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isActive: false
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    affiliation: '',
    topic: '',
    photo: '',
    isActive: false
  });

  const t = {
    en: {
      title: 'Keynote Speakers Management',
      subtitle: 'Manage conference speakers and their presentations',
      addSpeaker: 'Add Speaker',
      search: 'Search speakers...',
      name: 'Name',
      titleLabel: 'Title',
      affiliation: 'Affiliation',
      topic: 'Keynote Topic',
      photo: 'Photo URL',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      addNew: 'Add New Speaker',
      editSpeaker: 'Edit Speaker',
      totalSpeakers: 'Total Speakers',
      activeSpeakers: 'Active Speakers'
    },
    ar: {
      title: 'إدارة المتحدثين الرئيسيين',
      subtitle: 'إدارة متحدثي المؤتمر وعروضهم التقديمية',
      addSpeaker: 'إضافة متحدث',
      search: 'البحث عن المتحدثين...',
      name: 'الاسم',
      titleLabel: 'اللقب',
      affiliation: 'الانتماء',
      topic: 'موضوع الكلمة',
      photo: 'رابط الصورة',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      cancel: 'إلغاء',
      addNew: 'إضافة متحدث جديد',
      editSpeaker: 'تعديل المتحدث',
      totalSpeakers: 'إجمالي المتحدثين',
      activeSpeakers: 'المتحدثون النشطون'
    }
  }[language];

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSpeakersCount = speakers.filter(s => s.isActive).length;

  const handleAdd = () => {
    if (formData.name && formData.title && formData.affiliation && formData.topic) {
      setSpeakers([...speakers, { ...formData, id: Date.now().toString() }]);
      setFormData({ name: '', title: '', affiliation: '', topic: '', photo: '', isActive: false });
      setShowAddForm(false);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      name: speaker.name,
      title: speaker.title,
      affiliation: speaker.affiliation,
      topic: speaker.topic,
      photo: speaker.photo,
      isActive: speaker.isActive
    });
  };

  const handleUpdate = () => {
    if (editingSpeaker && formData.name && formData.title && formData.affiliation && formData.topic) {
      setSpeakers(speakers.map(s => s.id === editingSpeaker.id ? { ...s, ...formData } : s));
      setEditingSpeaker(null);
      setFormData({ name: '', title: '', affiliation: '', topic: '', photo: '', isActive: false });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm(isRtl ? 'هل أنت متأكد من حذف هذا المتحدث؟' : 'Are you sure you want to delete this speaker?')) {
      setSpeakers(speakers.filter(s => s.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setSpeakers(speakers.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-emerald-950 mb-2">{t.title}</h1>
          <p className="text-neutral-500">{t.subtitle}</p>
          <div className="w-24 h-1 bg-emerald-600 rounded-full mt-4" />
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-900 text-white px-6 py-3 rounded-xl hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-lg w-fit"
        >
          <Plus size={20} />
          <span className="font-medium">{t.addSpeaker}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mic2 size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{speakers.length}</div>
              <div className="text-purple-100">{t.totalSpeakers}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mic2 size={32} />
            </div>
            <div>
              <div className="text-4xl font-black">{activeSpeakersCount}</div>
              <div className="text-emerald-100">{t.activeSpeakers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(showAddForm || editingSpeaker) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-emerald-100"
          >
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">
              {editingSpeaker ? t.editSpeaker : t.addNew}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.titleLabel}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.affiliation}
                </label>
                <input
                  type="text"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.photo}
                </label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.topic}
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-emerald-950">{t.active}</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={editingSpeaker ? handleUpdate : handleAdd}
                className="bg-emerald-900 text-white px-8 py-3 rounded-xl hover:bg-emerald-800 transition-all font-medium"
              >
                {t.save}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingSpeaker(null);
                  setFormData({ name: '', title: '', affiliation: '', topic: '', photo: '', isActive: false });
                }}
                className="bg-neutral-100 text-neutral-700 px-8 py-3 rounded-xl hover:bg-neutral-200 transition-all font-medium"
              >
                {t.cancel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-emerald-50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <img
                src={speaker.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                alt={speaker.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <button
                onClick={() => toggleStatus(speaker.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  speaker.isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {speaker.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                <span>{speaker.isActive ? t.active : t.inactive}</span>
              </button>
            </div>

            <h3 className="text-lg font-bold text-emerald-950 mb-1">{speaker.name}</h3>
            <p className="text-sm text-emerald-600 mb-2">{speaker.title}</p>
            <p className="text-sm text-neutral-600 mb-3">{speaker.affiliation}</p>
            <div className="bg-emerald-50 px-3 py-2 rounded-lg mb-4">
              <p className="text-sm text-emerald-900 font-medium">{speaker.topic}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(speaker)}
                className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                <span className="text-sm font-medium">{t.edit}</span>
              </button>
              <button
                onClick={() => handleDelete(speaker.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                <span className="text-sm font-medium">{t.delete}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
