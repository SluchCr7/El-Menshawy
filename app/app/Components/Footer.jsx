'use client'
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative bg-primary-dark text-cream pt-24 pb-12 overflow-hidden border-t border-accent/20">
      {/* Decorative Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/patterns/mashrabiya.svg')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="w-full mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-reem font-bold text-accent">محمد صديق المنشاوي</h3>
            <p className="text-sand/80 text-lg leading-relaxed font-arabic">
              صوتٌ من الجنة، وتلاوةٌ تخشع لها القلوب. نهدف إلى الحفاظ على تراث الشيخ وتقديمه للأجيال القادمة بأفضل حلة.
            </p>
            <div className="flex gap-5">
              {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-bold text-accent mb-8 border-b border-accent/20 pb-2 inline-block">روابط هامة</h4>
            <ul className="space-y-4">
              {['الرئيسية', 'المصحف المرتل', 'المصحف المجود', 'عن الشيخ', 'المكتبة المرئية'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sand/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group font-reem">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recitations */}
          <div>
            <h4 className="text-xl font-serif font-bold text-accent mb-8 border-b border-accent/20 pb-2 inline-block">تلاوات مختارة</h4>
            <ul className="space-y-4">
              {['سورة يوسف', 'سورة مريم', 'سورة الرحمن', 'سورة طه', 'سورة الحشر'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sand/70 hover:text-accent transition-colors duration-300 font-arabic text-lg">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-xl font-serif font-bold text-accent mb-8 border-b border-accent/20 pb-2 inline-block">ابق على تواصل</h4>
            <p className="text-sand/70 mb-6 font-arabic text-lg">اشترك في قائمتنا البريدية لتصلك أحدث التسجيلات النادرة لفضيلة الشيخ.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full bg-primary-light border border-accent/20 rounded-lg py-4 px-6 text-cream focus:outline-none focus:border-accent transition-colors font-sans"
              />
              <button className="absolute left-2 top-2 bottom-2 px-6 bg-accent text-primary font-bold rounded-md hover:bg-accent-light transition-all">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sand/50 text-sm font-sans tracking-wider uppercase">
            &copy; {new Date().getFullYear()} Mohamed Siddiq El-Minshawi Heritage. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-accent hover:text-accent-light transition-colors"
          >
            <span className="text-xs font-sans tracking-[0.2em] uppercase">Back to top</span>
            <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:border-accent group-hover:-translate-y-1 transition-all">
              <FaArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Subtle Bottom Ornament */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/patterns/ornament-bottom.svg')",
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </footer>
  );
}
