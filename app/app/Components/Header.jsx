'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Heart, Music } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', link: '/' },
    { label: 'عن الشيخ', link: '/About' },
    { label: 'المصحف المرتل', link: '/Murattal' },
    { label: 'المصحف المجود', link: '/Mojawwad' },
    { label: 'المكتبة المرئية', link: '/Videos' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-primary/90 backdrop-blur-md py-3 shadow-2xl border-b border-accent/20'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link href="/" className="relative group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className={`text-2xl md:text-3xl font-reem font-bold leading-tight transition-colors duration-300 ${scrolled ? 'text-accent' : 'text-accent'
              }`}>
              محمد صديق المنشاوي
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans text-sand/80 uppercase">
              The Timeless Legacy
            </span>
          </motion.div>
          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.link}
              href={item.link}
              className={`relative group px-2 py-1 transition-colors duration-300 font-reem text-lg ${pathname === item.link ? 'text-accent' : scrolled ? 'text-cream/90 hover:text-accent' : 'text-cream hover:text-accent'
                }`}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {item.label}
              </motion.span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${pathname === item.link ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/Search" className="p-2 rounded-full hover:bg-accent/10 transition-colors text-accent">
            <Search size={22} />
          </Link>
          <button
            className="lg:hidden p-2 text-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/95 backdrop-blur-xl border-b border-accent/20 overflow-hidden"
          >
            <div className="flex flex-col items-center py-10 gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-reem transition-colors ${pathname === item.link ? 'text-accent' : 'text-cream/80 hover:text-accent'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
