'use client'
import React, { useState } from 'react';
import { videos } from '../../utils/Data';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Youtube, Film, Clock, Tag, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'المكتبة الكاملة' },
    { id: 'rare', label: 'تلاوات نادرة' },
    { id: 'mosque', label: 'تلاوات المحافل' },
    { id: 'documentary', label: 'لقاءات ووثائقيات' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    } else {
      // Direct ID support if only ID is provided
      videoId = url;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const getCategoryLabel = (cat) => {
    switch(cat) {
      case 'rare': return 'تلاوة نادرة';
      case 'mosque': return 'تلاوة محفلية';
      case 'documentary': return 'وثائقي / لقاء';
      default: return 'تسجيل مرئي';
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '300px' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Youtube size={40} className="text-accent" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-reem font-bold text-white mb-6">المكتبة المرئية</h1>
          <p className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed">
            مجموعة مصنفة من اللقاءات النادرة والتسجيلات المرئية وتلاوات المحافل للشيخ محمد صديق المنشاوي رحمة الله عليه.
          </p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-accent/10 max-w-3xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-reem text-base transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-accent shadow-md border-b-2 border-accent'
                    : 'text-primary/70 hover:bg-cream-dark hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.youtubeUrl}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-spiritual-shadow border border-accent/10 hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  {/* Thumbnail and badges */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer bg-black"
                    onClick={() => setActiveVideo(video.youtubeUrl)}
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized // to handle direct youtube link thumbnails smoothly
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-accent border border-accent/30 text-[10px] md:text-xs font-reem px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Tag size={12} />
                      <span>{getCategoryLabel(video.category)}</span>
                    </div>

                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-sans px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                        <Clock size={12} className="text-accent" />
                        <span>{video.duration}</span>
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center shadow-2xl relative">
                        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-25" />
                        <Play fill="currentColor" size={24} className="translate-x-0.5 relative z-10" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="font-reem font-bold text-xl text-primary mb-6 flex-grow leading-relaxed line-clamp-2 hover:text-accent transition-colors cursor-pointer"
                        onClick={() => setActiveVideo(video.youtubeUrl)}>
                      {video.title}
                    </h2>
                    
                    <div className="flex items-center justify-between border-t border-accent/5 pt-5 mt-auto">
                      <button
                        onClick={() => setActiveVideo(video.youtubeUrl)}
                        className="text-accent font-reem flex items-center gap-2 hover:underline text-sm font-bold"
                      >
                        <Film size={16} />
                        <span>تشغيل المقطع</span>
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(video.youtubeUrl);
                          alert('تم نسخ رابط اليوتيوب بنجاح!');
                        }}
                        className="text-primary/40 hover:text-accent transition-colors p-2 hover:bg-cream-dark rounded-xl"
                        title="نسخ الرابط"
                      >
                        <Youtube size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-accent/10"
            >
              <Sparkles size={48} className="text-accent/60 mx-auto mb-4 animate-pulse" />
              <p className="text-xl font-reem text-primary/60">عذرًا، لم نجد أي مقاطع في هذا التصنيف حاليًا.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-dark/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] border border-accent/20"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={getEmbedUrl(activeVideo)}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-accent transition-colors font-sans uppercase tracking-[0.2em] text-xs"
              >
                Close <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-20 flex justify-center opacity-10">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}
