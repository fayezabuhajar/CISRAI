import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommitteesManagementProps {
  language: 'en' | 'ar';
}

interface CommitteeMember {
  id: string;
  name: string;
  committee: string;
  position: string;
}

export default function CommitteesManagement({ language }: CommitteesManagementProps) {
  const isRtl = language === 'ar';
  const [members, setMembers] = useState<CommitteeMember[]>([
    { id: '1', name: 'Dr. Ahmed Al-Rashid', committee: 'Scientific Committee', position: 'Chairman' },
    { id: '2', name: 'Prof. Sarah Al-Mahmoud', committee: 'Scientific Committee', position: 'Member' },
    { id: '3', name: 'Dr. Mohammad Khalil', committee: 'Organizing Committee', position: 'Coordinator' },
    { id: '4', name: 'Dr. Fatima Hassan', committee: 'Review Committee', position: 'Lead Reviewer' },
    { id: '5', name: 'Prof. Ali Al-Zahra', committee: 'Scientific Committee', position: 'Member' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', committee: '', position: '' });

  const t = {
    en: {
      title: 'Committees Management',
      subtitle: 'Manage committee members and their roles',
      addMember: 'Add Member',
      search: 'Search members...',
      name: 'Member Name',
      committee: 'Committee',
      position: 'Position/Role',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      addNew: 'Add New Member',
      editMember: 'Edit Member',
      totalMembers: 'Total Members'
    },
    ar: {
      title: 'إدارة اللجان',
      subtitle: 'إدارة أعضاء اللجان وأدوارهم',
      addMember: 'إضافة عضو',
      search: 'البحث عن الأعضاء...',
      name: 'اسم العضو',
      committee: 'اللجنة',
      position: 'المنصب/الدور',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      cancel: 'إلغاء',
      addNew: 'إضافة عضو جديد',
      editMember: 'تعديل العضو',
      totalMembers: 'إجمالي الأعضاء'
    }
  }[language];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.committee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (formData.name && formData.committee && formData.position) {
      setMembers([...members, { ...formData, id: Date.now().toString() }]);
      setFormData({ name: '', committee: '', position: '' });
      setShowAddForm(false);
    }
  };

  const handleEdit = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, committee: member.committee, position: member.position });
  };

  const handleUpdate = () => {
    if (editingMember && formData.name && formData.committee && formData.position) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
      setEditingMember(null);
      setFormData({ name: '', committee: '', position: '' });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm(isRtl ? 'هل أنت متأكد من حذف هذا العضو؟' : 'Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
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
          <span className="font-medium">{t.addMember}</span>
        </button>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Users size={32} />
          </div>
          <div>
            <div className="text-4xl font-black">{members.length}</div>
            <div className="text-emerald-100">{t.totalMembers}</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(showAddForm || editingMember) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-emerald-100"
          >
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">
              {editingMember ? t.editMember : t.addNew}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                  {t.committee}
                </label>
                <input
                  type="text"
                  value={formData.committee}
                  onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                  {t.position}
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={editingMember ? handleUpdate : handleAdd}
                className="bg-emerald-900 text-white px-8 py-3 rounded-xl hover:bg-emerald-800 transition-all font-medium"
              >
                {t.save}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingMember(null);
                  setFormData({ name: '', committee: '', position: '' });
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

      {/* Members Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-emerald-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.name}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.committee}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.position}
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-6 py-4 text-emerald-950 font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{member.committee}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {member.position}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title={t.edit}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title={t.delete}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
