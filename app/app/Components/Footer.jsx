import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B3D2E] text-[#F7F6F2] pt-16 pb-10 overflow-hidden">
      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/patterns/mashrabiya.svg')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 grid md:grid-cols-4 gap-10">

        {/* 1. About Section */}
        <div>
          <h3 className="text-[#C8A64B] text-xl font-['Amiri'] font-bold mb-4">
            عن الشيخ
          </h3>
          <p className="text-[#F7F6F2] text-sm leading-relaxed">
            الشيخ محمد صديق المنشاوي، صوت خاشع يأسر القلوب وتلاوات خالدة بصوت من أرقى أصوات العالم الإسلامي.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-[#C8A64B] text-xl font-['Amiri'] font-bold mb-4">
            روابط سريعة
          </h3>
          <ul className="space-y-2 text-[#F7F6F2] text-sm">
            <li><a href="#" className="hover:text-[#D9C7A3] transition">الصفحة الرئيسية</a></li>
            <li><a href="#recitations" className="hover:text-[#D9C7A3] transition">التلاوات</a></li>
            <li><a href="#categories" className="hover:text-[#D9C7A3] transition">التصنيفات</a></li>
            <li><a href="#about" className="hover:text-[#D9C7A3] transition">عن الشيخ</a></li>
            <li><a href="#contact" className="hover:text-[#D9C7A3] transition">تواصل معنا</a></li>
          </ul>
        </div>

        {/* 3. Contact & Support */}
        <div>
          <h3 className="text-[#C8A64B] text-xl font-['Amiri'] font-bold mb-4">
            تواصل معنا
          </h3>
          <ul className="space-y-2 text-[#F7F6F2] text-sm">
            <li>البريد الإلكتروني: <a href="mailto:info@alshiekh.com" className="hover:text-[#D9C7A3] transition">info@alshiekh.com</a></li>
            <li>الهاتف: <a href="tel:+20123456789" className="hover:text-[#D9C7A3] transition">+20 123 456 789</a></li>
            <li>العنوان: القاهرة، مصر</li>
          </ul>

          {/* Social Icons */}
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-[#C8A64B] hover:text-[#D9C7A3] transition text-lg"><FaFacebookF /></a>
            <a href="#" className="text-[#C8A64B] hover:text-[#D9C7A3] transition text-lg"><FaTwitter /></a>
            <a href="#" className="text-[#C8A64B] hover:text-[#D9C7A3] transition text-lg"><FaYoutube /></a>
            <a href="#" className="text-[#C8A64B] hover:text-[#D9C7A3] transition text-lg"><FaInstagram /></a>
          </div>
        </div>

        {/* 4. Newsletter / Download */}
        <div>
          <h3 className="text-[#C8A64B] text-xl font-['Amiri'] font-bold mb-4">
            إشترك أو حمل
          </h3>
          <p className="text-[#F7F6F2] text-sm mb-4">
            اشترك لتصلك أحدث التلاوات أو حمل المصحف كاملاً بجودة عالية.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="px-3 py-2 rounded-lg text-black w-full sm:w-auto flex-1"
            />
            <button className="px-5 py-2 rounded-lg bg-[#C8A64B] text-[#0B3D2E] font-semibold hover:bg-[#D9C7A3] transition">
              اشترك
            </button>
          </form>
          <a href="#" className="mt-4 inline-block text-[#D9C7A3] text-sm hover:text-[#C8A64B] transition">
            تحميل المصحف الكامل
          </a>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#4A7856]/30 mt-10 pt-6 text-center text-sm text-[#D9C7A3]">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة للشيخ محمد صديق المنشاوي
      </div>
    </footer>
  );
}
