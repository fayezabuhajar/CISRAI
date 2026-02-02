import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginProps {
  language: 'en' | 'ar';
  onLogin: () => void;
}

export default function AdminLogin({ language, onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isRtl = language === 'ar';

  const t = {
    en: {
      title: 'Admin Dashboard Login',
      subtitle: 'Secure access to conference management',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      error: 'Invalid credentials. Please try again.',
      demo: 'Demo credentials: admin / admin123'
    },
    ar: {
      title: 'تسجيل دخول لوحة الإدارة',
      subtitle: 'الوصول الآمن لإدارة المؤتمر',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      error: 'بيانات الاعتماد غير صحيحة. يرجى المحاولة مرة أخرى.',
      demo: 'بيانات تجريبية: admin / admin123'
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/admin/dashboard');
    } else {
      setError(t.error);
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
                {t.username}
              </label>
              <div className="relative">
                <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-3.5 text-emerald-600`} size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  required
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
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
            >
              <ShieldCheck size={20} />
              <span>{t.login}</span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 text-center">
            <div className="text-xs text-neutral-400 bg-neutral-50 px-4 py-3 rounded-xl">
              {t.demo}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
