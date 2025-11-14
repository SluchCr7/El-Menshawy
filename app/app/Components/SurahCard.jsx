// components/SurahCard.jsx
import React from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';
// الألوان المخصصة: textGold: #C8A64B, sandBeige: #D9C7A3, lightGreen: #4A7856, Black: #1A1A1A

const SurahCard = ({ surah, reciterType }) => {
  // استخدام "reciterType" لتمييز نوع القراءة
  const label = reciterType === 'murattal' ? 'مرتل' : 'مجود';

  return (
    // هنا نستخدم sandBeige كخلفية للبطاقة
    <Link
      href={`/Play/${surah.id}?type=${reciterType}`}
      className="bg-[#D9C7A3] text-[#1A1A1A] p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-between border-b-4 border-b-[#C8A64B] cursor-pointer"
    >
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* رقم السورة بدائرة بلون lightGreen */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A7856] text-[#F7F6F2] font-bold text-lg">
          {surah.id}
        </div>
        
        {/* اسم السورة */}
        <div className="text-right">
          <h3 className="text-xl font-extrabold text-[#1A1A1A]">{surah.name}</h3>
          {/* نوع القراءة بلون ذهبي فاتح */}
          <p className="text-sm text-[#C8A64B] font-semibold">
            قراءة الشيخ المنشاوي - {label}
          </p>
        </div>
      </div>

      {/* أيقونة التشغيل بلون textGold */}
      <div className="p-2 rounded-full bg-white/50 text-[#C8A64B] hover:bg-[#C8A64B] hover:text-[#F7F6F2] transition">
        <Play size={20} fill="currentColor" />
      </div>
    </Link>
  );
};

export default SurahCard;