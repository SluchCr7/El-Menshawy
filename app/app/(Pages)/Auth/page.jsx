'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const { user, login, register, loading, error: authError } = useAuth();
  const router = useRouter();

  // Active tab state: 'login' or 'register'
  const [activeTab, setActiveTab] = useState('login');
  
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Clear errors when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLocalError('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setName('');
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    // Basic Validation
    if (!email || !password) {
      setLocalError('يرجى ملء جميع الحقول المطلوبة.');
      setIsSubmitting(false);
      return;
    }

    if (activeTab === 'register' && !name) {
      setLocalError('يرجى إدخال الاسم الخاص بك.');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setLocalError('يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (activeTab === 'login') {
        const result = await login(email, password);
        if (result.success) {
          setSuccessMsg('تم تسجيل الدخول بنجاح! جاري تحويلك...');
          setTimeout(() => {
            router.push('/');
          }, 1500);
        } else {
          setLocalError(result.message);
        }
      } else {
        const result = await register(name, email, password);
        if (result.success) {
          setSuccessMsg('تم إنشاء الحساب بنجاح! جاري تحويلك...');
          setTimeout(() => {
            router.push('/');
          }, 1500);
        } else {
          setLocalError(result.message);
        }
      }
    } catch (err) {
      setLocalError('حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden py-32 px-6">
      {/* Background Decorative Patterns */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '240px' }}
      />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-primary-dark/95 backdrop-blur-xl border border-accent/20 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative z-10"
      >
        {/* Logo / Brand Name */}
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-3xl font-reem font-bold text-accent tracking-wide hover:opacity-90 transition-opacity">
              محمد صديق المنشاوي
            </span>
          </Link>
          <p className="text-sand/70 text-sm font-arabic mt-2">التراث الخالد للشيخ الجليل</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex bg-primary/40 p-1.5 rounded-2xl border border-accent/10 mb-8 relative">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-3 text-center font-reem font-bold text-lg rounded-xl transition-all duration-300 relative z-10 ${
              activeTab === 'login' ? 'text-primary-dark' : 'text-sand hover:text-white'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-3 text-center font-reem font-bold text-lg rounded-xl transition-all duration-300 relative z-10 ${
              activeTab === 'register' ? 'text-primary-dark' : 'text-sand hover:text-white'
            }`}
          >
            إنشاء حساب جديد
          </button>

          {/* Sliding Background Indicator */}
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute top-1.5 bottom-1.5 bg-accent rounded-xl"
            style={{
              width: 'calc(50% - 6px)',
              right: activeTab === 'login' ? '6px' : 'auto',
              left: activeTab === 'register' ? '6px' : 'auto',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Status Alerts */}
        <AnimatePresence mode="wait">
          {(localError || authError) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-4 py-3 rounded-2xl flex items-center gap-3 mb-6 font-arabic text-sm overflow-hidden"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{localError || authError}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-2xl flex items-center gap-3 mb-6 font-arabic text-sm overflow-hidden"
            >
              <CheckCircle2 size={18} className="flex-shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'register' && (
              <motion.div
                key="nameField"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sand font-reem text-sm">الاسم الكامل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sand/40">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-primary/20 border border-accent/20 rounded-2xl py-3.5 pr-12 pl-4 text-white placeholder-sand/30 font-arabic focus:outline-none focus:border-accent transition-colors text-right"
                    placeholder="أدخل اسمك الكريم"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="block text-sand font-reem text-sm">البريد الإلكتروني</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sand/40">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary/20 border border-accent/20 rounded-2xl py-3.5 pr-12 pl-4 text-white placeholder-sand/30 font-arabic focus:outline-none focus:border-accent transition-colors text-right"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sand font-reem text-sm">كلمة المرور</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sand/40">
                <Lock size={18} />
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pl-4 flex items-center text-sand/40 hover:text-sand/70 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary/20 border border-accent/20 rounded-2xl py-3.5 pr-12 pl-12 text-white placeholder-sand/30 font-sans focus:outline-none focus:border-accent transition-colors text-right"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-accent text-primary-dark font-reem font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-accent/20 hover:bg-accent-light transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isSubmitting || loading) ? (
              <span className="w-6 h-6 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
            ) : activeTab === 'login' ? (
              'تسجيل الدخول'
            ) : (
              'إنشاء حساب جديد'
            )}
          </motion.button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-8 border-t border-accent/10 pt-6">
          <Link href="/" className="text-sand/60 hover:text-accent font-arabic text-sm transition-colors flex items-center justify-center gap-1.5">
            ← العودة للرئيسية
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
