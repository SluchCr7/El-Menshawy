"use client";
import React from "react";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B3D2E] text-[#F7F6F2] p-6 text-center relative overflow-hidden">

      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/patterns/islamic-pattern.svg')] bg-cover bg-center"></div>

      {/* Card */}
      <div className="relative z-10 max-w-xl bg-[#1A1A1A]/70 backdrop-blur-lg p-10 rounded-3xl border border-[#C8A64B]/40 shadow-2xl">

        {/* Big 404 */}
        <h1 className="text-7xl md:text-8xl font-bold text-[#C8A64B] font-['El_Messiri'] drop-shadow-lg">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-['El_Messiri'] text-[#D9C7A3] font-semibold">
          الصفحة غير موجودة
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-[#F7F6F2]/80 leading-relaxed font-['Cairo']">
          عذرًا… يبدو أنك تبحث عن صفحة غير موجودة.
          <br />
          يمكنك العودة للصفحة الرئيسية والاستمرار في تصفح تلاوات الشيخ المنشاوي.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-[#C8A64B] text-[#1A1A1A] font-bold text-lg font-['Cairo'] hover:bg-[#D9C7A3] transition shadow-lg hover:scale-105"
        >
          العودة للرئيسية
          <ArrowRightCircle size={24} />
        </Link>
      </div>

      {/* Decorative Islamic Calligraphy SVG */}
      <div className="absolute bottom-6 opacity-20 w-64">
        <img src="/patterns/bismillah-gold.svg" alt="bismillah" />
      </div>
    </div>
  );
}