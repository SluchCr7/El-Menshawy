'use client'
import React, { useState } from 'react';
import { videos } from '../../utils/Data';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Youtube, Info, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    // Handle both youtu.be and youtube.com formats
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
            مجموعة من اللقاءات النادرة والتسجيلات المرئية التي توثق مسيرة واحد من أعظم قراء القرآن الكريم في التاريخ.
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-24 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-spiritual-shadow border border-accent/10 hover:shadow-2xl transition-all duration-500"
              >
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(video.youtubeUrl)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center shadow-2xl">
                      <Play fill="currentColor" size={28} />
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="font-reem font-bold text-xl text-primary mb-4 h-14 line-clamp-2 leading-relaxed">
                    {video.title}
                  </h2>
                  <div className="flex items-center justify-between border-t border-accent/5 pt-6">
                    <button
                      onClick={() => setActiveVideo(video.youtubeUrl)}
                      className="text-accent font-reem flex items-center gap-2 hover:underline"
                    >
                      <Info size={16} />
                      <span>تفاصيل اللقاء</span>
                    </button>
                    <button className="text-primary/30 hover:text-accent transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-dark/95 backdrop-blur-xl flex items-center justify-center z-[100] p-6"
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
