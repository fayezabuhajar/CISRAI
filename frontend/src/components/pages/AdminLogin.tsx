import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLoginProps {
  language: 'en' | 'ar';
}

export default function AdminLogin({ language }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const isRtl = language === 'ar';

  const t = {
    en: {
      title: 'Admin Dashboard Login',
      subtitle: 'Secure access to conference management',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      loginError: 'Login failed. Please check your credentials.',
      loading: 'Signing in...'
    },
    ar: {
      title: 'تسجيل دخول لوحة الإدارة',
      subtitle: 'الوصول الآمن لإدارة المؤتمر',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      loginError: 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.',
      loading: 'جاري تسجيل الدخول...'
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Error is already set in context
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="admin-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M100 60 L120 100 L100 140 L80 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-pattern)" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-[40px] p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-950 mb-2">{t.title}</h1>
            <p className="text-neutral-500">{t.subtitle}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                {t.email}
              </label>
              <div className="relative">
                <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-3.5 text-emerald-600`} size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900/50 uppercase tracking-widest mb-2">
                {t.password}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-3.5 text-emerald-600`} size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm flex items-gap-2"
              >
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck size={20} />
              <span>{isLoading ? t.loading : t.login}</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

