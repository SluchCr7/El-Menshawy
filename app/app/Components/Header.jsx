'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Heart, Music, User, LogOut } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { label: 'المكتبة المرئية', link: '/Videos' },
    { label: 'المصحف الشريف', link: '/Mushaf' },
    { label: 'المفضلة', link: '/Favorites' },
    { label: 'اتصل بنا', link: '/Contact' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-primary/95 backdrop-blur-md py-3 shadow-2xl border-b border-accent/20'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link href="/" className="relative group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className={`text-xl md:text-2xl lg:text-3xl font-reem font-bold leading-tight transition-colors duration-300 ${scrolled ? 'text-accent' : 'text-accent'
              }`}>
              محمد صديق المنشاوي
            </span>
            <span className="text-[9px] md:text-xs tracking-[0.2em] font-sans text-sand/80 uppercase">
              The Timeless Legacy
            </span>
          </motion.div>
          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navItems.map((item, idx) => (
            <Link
              key={item.link}
              href={item.link}
              className={`relative group px-1 py-1 transition-colors duration-300 font-reem text-base xl:text-lg ${pathname === item.link ? 'text-accent' : scrolled ? 'text-cream/90 hover:text-accent' : 'text-cream hover:text-accent'
                }`}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
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

          {/* User Auth Dropdown */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-accent/20 hover:border-accent/40 bg-primary-light/40 text-cream transition-all duration-300 font-reem text-sm"
                >
                  <User size={16} className="text-accent" />
                  <span>{user?.name}</span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-48 bg-primary-dark/95 border border-accent/20 rounded-2xl shadow-2xl py-2 z-50 text-right font-reem"
                    >
                      <div className="px-4 py-2 border-b border-accent/10 text-xs text-sand/60 font-sans">
                        {user?.email}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-rose-400 hover:bg-primary-light/50 transition-colors text-sm hover:text-rose-300"
                      >
                        <span>تسجيل الخروج</span>
                        <LogOut size={14} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href="/Auth"
                className="px-5 py-2 rounded-xl bg-accent text-primary-dark font-reem font-bold text-sm hover:bg-accent-light shadow-lg hover:shadow-accent/10 transition-all"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

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
            <div className="flex flex-col items-center py-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-reem transition-colors ${pathname === item.link ? 'text-accent' : 'text-cream/80 hover:text-accent'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Auth Button */}
              <div className="w-full border-t border-accent/10 mt-4 pt-4 px-8 flex flex-col items-center">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sand font-reem text-sm">مرحباً، {user?.name}</span>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-reem py-2 px-4 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/Auth"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 bg-accent text-primary-dark font-reem font-bold rounded-xl shadow-lg"
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
