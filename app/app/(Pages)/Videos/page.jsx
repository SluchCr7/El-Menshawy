// app/pages/videos.jsx
'use client'

import { useState } from 'react';
import { videos } from '../../utils/Data';

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="min-h-screen bg-[#0A2F24] text-white p-6">
      {/* Hero Section صغير */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">مقابلات ولقاءات الشيخ المنشاوي</h1>
        <p className="text-[#C8A64B] text-lg md:text-xl">
          مجموعة نادرة من اللقاءات والتلاوات الخالدة
        </p>
      </header>

      {/* Grid الفيديوهات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="bg-[#0B3D2E] rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="cursor-pointer" onClick={() => setActiveVideo(video.youtubeUrl)}>
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-52 object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg md:text-xl mb-3">{video.title}</h2>
              <button
                onClick={() => setActiveVideo(video.youtubeUrl)}
                className="px-4 py-2 bg-[#C8A64B] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                مشاهدة الفيديو
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal لتشغيل الفيديو */}
      {activeVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              src={activeVideo.replace("watch?v=", "embed/")}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-lg"
            ></iframe>
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white bg-red-600 rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
