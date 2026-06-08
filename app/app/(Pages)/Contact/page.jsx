'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Link, Info, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '@/app/utils/MessageContext';

export default function ContactPage() {
  const { sendMessage, loading } = useMessages();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    link: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // استدعاء دالة الإرسال من الـ Context
    const result = await sendMessage(formData.name, formData.email, formData.message, formData.link);
    
    if (result.success) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        link: '',
        message: ''
      });
    } else {
      // عرض الخطأ القادم من السيرفر أو الـ Validation الخاص بـ Joi
      setServerError(result.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Page Header */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '300px' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8 text-accent"
          >
            <Mail size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-reem font-bold text-white mb-6"
          >
            اتصل بنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed"
          >
            شاركونا آرائكم واقتراحاتكم، أو أرسلوا لنا تسجيلات نادرة للشيخ المنشاوي لنقوم بضمها للموقع ونشرها.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-primary text-cream p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-accent/20">
                <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none">
                  <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full" />
                </div>

                <h3 className="text-2xl font-reem font-bold text-accent mb-6 flex items-center gap-3">
                  <Info size={24} /> مشروع توثيق التراث
                </h3>
                <p className="text-sand/80 font-arabic text-lg leading-loose mb-8">
                  هذا الموقع هو عمل تطوعي غير ربحي يهدف لجمع وحفظ ونشر التلاوات القرآنية النادرة والتراث الخالد لفضيلة القارئ الشيخ محمد صديق المنشاوي رحمة الله عليه بأفضل جودة صوتية ممكنة.
                </p>

                <div className="space-y-6 border-t border-white/10 pt-8 font-arabic">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-sand/50 font-sans">البريد الإلكتروني المباشر</p>
                      <p className="text-lg font-sans">contact@menshawi-heritage.org</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-sand/50 font-sans">لتقديم الاقتراحات</p>
                      <p className="text-lg">يسعدنا تلقي آرائكم لتطوير خدمات الاستماع للمصحف الشريف.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-[2.5rem] p-10">
                <h4 className="text-xl font-reem font-bold text-primary mb-4">هل تمتلك تسجيلاً نادراً؟</h4>
                <p className="text-primary/70 font-arabic text-base leading-relaxed">
                  إذا كان لديك أي تلاوة صوتية أو مرئية للشيخ المنشاوي غير متوفرة على الموقع، يرجى رفعها على أي مركز رفع ملفات (مثل Google Drive أو Dropbox) ومشاركتنا الرابط وسنتكفل بتحسينها صوتياً ونشرها باسمك.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-accent/10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 text-right font-arabic"
                  >
                    <div>
                      <h3 className="text-2xl font-reem font-bold text-primary mb-2">أرسل رسالتك الآن</h3>
                      <p className="text-primary/40 text-sm leading-relaxed">يرجى ملء الحقول التالية وسيقوم فريق العمل بالرد عليك في أقرب وقت.</p>
                    </div>

                    {/* Server Error Alert */}
                    <AnimatePresence>
                      {serverError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm"
                        >
                          <AlertCircle size={18} className="shrink-0" />
                          <span>{serverError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name */}
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-primary font-bold text-base block pr-1">الاسم الكامل *</label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="اكتب اسمك الكريم"
                            className="w-full bg-cream/30 border border-accent/20 rounded-2xl py-4 px-6 text-primary focus:outline-none focus:border-accent focus:bg-white transition-all text-right"
                          />
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-primary font-bold text-base block pr-1">البريد الإلكتروني *</label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            className="w-full bg-cream/30 border border-accent/20 rounded-2xl py-4 px-6 text-primary focus:outline-none focus:border-accent focus:bg-white transition-all text-left font-sans"
                            dir="ltr"
                          />
                          <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent" />
                        </div>
                      </div>
                    </div>

                    {/* File Link (Optional & Professional Integration) */}
                    <div className="space-y-3">
                      <label htmlFor="link" className="text-primary font-bold text-base block pr-1">رابط ملف التلاوة النادرة <span className="text-primary/40 text-xs font-normal">(اختياري)</span></label>
                      <div className="relative">
                        <input
                          type="url"
                          id="link"
                          name="link"
                          value={formData.link}
                          onChange={handleChange}
                          placeholder="https://drive.google.com/..."
                          className="w-full bg-cream/30 border border-accent/20 rounded-2xl py-4 px-6 text-primary focus:outline-none focus:border-accent focus:bg-white transition-all text-left font-sans"
                          dir="ltr"
                        />
                        <Link size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent" />
                      </div>
                      <span className="text-xs text-primary/40 block pr-1">يرجى رفع الملف على Google Drive أو Dropbox ومشاركتنا الرابط المفتوح.</span>
                    </div>

                    {/* Message */}
                    <div className="space-y-3">
                      <label htmlFor="message" className="text-primary font-bold text-base block pr-1">نص الرسالة أو تفاصيل التسجيل *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك أو تفاصيل التلاوة والمسجد والتاريخ إن وجد (20 حرفاً على الأقل)..."
                        className="w-full bg-cream/30 border border-accent/20 rounded-2xl py-4 px-6 text-primary focus:outline-none focus:border-accent focus:bg-white transition-all text-right resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-5 bg-primary hover:bg-accent hover:text-primary disabled:bg-primary/50 text-white font-reem font-bold text-xl rounded-2xl shadow-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span>جاري إرسال رسالتكم...</span>
                      ) : (
                        <>
                          <span>إرسال الرسالة</span>
                          <Send size={18} className="rotate-180" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-3xl font-reem font-bold text-primary">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-primary/70 font-arabic text-lg max-w-md mx-auto leading-relaxed">
                      نشكرك جزيل الشكر على تواصلك ومساهمتك الكريمة في خدمة تراث الشيخ. سيقوم فريق العمل بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-4 bg-accent text-primary font-bold font-reem text-lg rounded-2xl shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Ornament Bottom */}
      <div className="py-20 flex justify-center opacity-20">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}