// pages/MurattalQuranPage.jsx (مثال لصفحة)
import React from 'react';
import { menshQuranMurattal } from '../../utils/Data'; // تأكد من المسار الصحيح
import SurahCard from '../../Components/SurahCard'; // تأكد من المسار الصحيح
import { BookOpen, Disc3 } from 'lucide-react';

// الألوان المخصصة: bg: #0B3D2E, textGold: #C8A64B, text2: #F7F6F2

const MurattalQuranPage = () => {
  return (
    <div className="min-h-screen bg-[#0B3D2E] p-6 sm:p-10 lg:p-16">
      <div className="max-w-4xl mx-auto">
        
        {/* رأس الصفحة - تصميم مميز باللون الذهبي */}
        <header className="text-center mb-12 border-b-2 border-b-[#C8A64B] pb-6">
          <Disc3 className="w-12 h-12 text-[#C8A64B] mx-auto mb-3" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F7F6F2] mb-2">
            المصحف المرتل (غير المجوّد)
          </h1>
          <p className="text-lg text-[#C8A64B] font-medium">
            بصوت القارئ الشيخ محمد صديق المنشاوي - رحمه الله
          </p>
        </header>

        {/* شبكة عرض السور */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menshQuranMurattal.map(surah => (
            <SurahCard 
              key={surah.id} 
              surah={surah} 
              reciterType="murattal" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MurattalQuranPage;