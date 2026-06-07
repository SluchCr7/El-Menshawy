'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Star, Music, Mic2, Play, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
      setFavorites(saved);
    }
  };

  useEffect(() => {
    loadFavorites();
    window.addEventListener('mensh_favorites_updated', loadFavorites);
    return () => {
      window.removeEventListener('mensh_favorites_updated', loadFavorites);
    };
  }, []);

  const removeFavorite = (id, type) => {
    const updated = favorites.filter(fav => !(fav.id === id && fav.type === type));
    localStorage.setItem('mensh_favorites', JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new Event('mensh_favorites_updated'));
  };

  const clearAll = () => {
    if (confirm('هل أنت متأكد من رغبتك في مسح جميع المفضلة؟')) {
      localStorage.setItem('mensh_favorites', '[]');
      setFavorites([]);
      window.dispatchEvent(new Event('mensh_favorites_updated'));
    }
  };

  const mojawwadFavs = favorites.filter(f => f.type === 'mojawwad');
  const murattalFavs = favorites.filter(f => f.type === 'murattal');

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
            className="inline-block p-4 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8 text-rose-500"
          >
            <Heart size={40} fill="currentColor" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-reem font-bold text-white mb-6"
          >
            المفضلات الخاصة بك
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed"
          >
            تلاواتك المفضلة والمحفوظة لسهولة الوصول إليها والاستماع إليها في أي وقت.
          </motion.p>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-20 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          {favorites.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-12 bg-white/85 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-accent/10">
                <div className="flex items-center gap-3">
                  <Star className="text-accent" size={20} />
                  <span className="text-lg font-reem font-bold text-primary">
                    لديك {favorites.length} سورة في المفضلة
                  </span>
                </div>
                <button
                  onClick={clearAll}
                  className="px-6 py-3 border border-rose-200 text-rose-500 rounded-xl hover:bg-rose-50 transition-colors font-reem text-sm"
                >
                  مسح الكل
                </button>
              </div>

              {/* Grid sections by type */}
              <div className="space-y-16">
                {/* Mojawwad favorites */}
                {mojawwadFavs.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-reem font-bold text-primary mb-8 flex items-center gap-3">
                      <Mic2 className="text-accent" /> المصحف المجود
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <AnimatePresence>
                        {mojawwadFavs.map((fav) => (
                          <motion.div
                            key={`mojawwad-${fav.id}`}
                            layout
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] p-6 shadow-spiritual-shadow border border-accent/10 relative group hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                                  {fav.id}
                                </div>
                                <div className="text-right">
                                  <h3 className="text-xl font-reem font-bold text-primary">
                                    سورة {fav.name}
                                  </h3>
                                  <span className="text-xs text-primary/40 font-sans tracking-wide uppercase">المصحف المجود</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFavorite(fav.id, 'mojawwad')}
                                  className="w-10 h-10 rounded-full border border-rose-100 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors"
                                  title="إزالة من المفضلة"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <Link
                                  href={`/Play/${fav.id}?type=mojawwad`}
                                  className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                  <Play size={16} fill="currentColor" className="translate-x-0.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Murattal favorites */}
                {murattalFavs.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-reem font-bold text-primary mb-8 flex items-center gap-3">
                      <Music className="text-accent" /> المصحف المرتل
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <AnimatePresence>
                        {murattalFavs.map((fav) => (
                          <motion.div
                            key={`murattal-${fav.id}`}
                            layout
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] p-6 shadow-spiritual-shadow border border-accent/10 relative group hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                                  {fav.id}
                                </div>
                                <div className="text-right">
                                  <h3 className="text-xl font-reem font-bold text-primary">
                                    سورة {fav.name}
                                  </h3>
                                  <span className="text-xs text-primary/40 font-sans tracking-wide uppercase">المصحف المرتل</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFavorite(fav.id, 'murattal')}
                                  className="w-10 h-10 rounded-full border border-rose-100 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors"
                                  title="إزالة من المفضلة"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <Link
                                  href={`/Play/${fav.id}?type=murattal`}
                                  className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                  <Play size={16} fill="currentColor" className="translate-x-0.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-white/60 backdrop-blur-md rounded-[3rem] border border-accent/15 max-w-2xl mx-auto shadow-2xl p-12"
            >
              <Heart size={64} className="text-primary/20 mx-auto mb-6" />
              <h3 className="text-2xl font-reem font-bold text-primary mb-4">قائمتك المفضلة فارغة حالياً</h3>
              <p className="text-primary/60 font-arabic text-lg mb-8 leading-relaxed">
                يمكنك إضافة السور المفضلة لديك بالضغط على أيقونة القلب في بطاقة السورة أو في صفحة مشغل الصوت.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/Murattal"
                  className="px-8 py-4 bg-accent text-primary font-bold rounded-2xl font-reem shadow-lg hover:scale-105 transition-transform text-center"
                >
                  تصفح المصحف المرتل
                </Link>
                <Link
                  href="/Mojawwad"
                  className="px-8 py-4 border-2 border-accent/40 text-accent font-bold rounded-2xl font-reem hover:bg-accent/5 transition-all text-center"
                >
                  تصفح المصحف المجود
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="py-20 flex justify-center opacity-10">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}
