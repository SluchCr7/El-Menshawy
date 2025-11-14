'use client'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0B3D2E] text-[#C8A64B] border-b border-[#C8A64B]/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">

        {/* Logo / Title */}
        <div className="flex items-center gap-3 select-none">
          <Link href={"/"} className="text-2xl md:text-3xl font-bold tracking-wide text-[#C8A64B]">
            محمد صديق المنشاوي
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-lg">
          {[
            { label: 'عن الشيخ', link: '/About' },
            { label: 'المرتل', link: '/Murattal' },
            { label: 'المجود', link: '/Mojawwad' },
            { label: 'مقالات', link: '/Articles' },
            { label: 'لقائات', link: '/Videos' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="relative group transition text-[#C8A64B] hover:text-white"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C8A64B] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#C8A64B] focus:outline-none"
          aria-label="menu"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0B3D2E] text-[#C8A64B] overflow-hidden transition-all duration-500 font-['Cairo'] ${
          open ? 'max-h-[300px] py-4' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg">
          <a href="/About" className="hover:text-white transition" onClick={() => setOpen(false)}>عن الشيخ</a>
          <a href="/Murattal" className="hover:text-white transition" onClick={() => setOpen(false)}>المرتل</a>
          <a href="/Mojawwad" className="hover:text-white transition" onClick={() => setOpen(false)}>المجود</a>
          <a href="/Articles" className="hover:text-white transition" onClick={() => setOpen(false)}>مقالات</a>
          <a href="/Videos" className="hover:text-white transition" onClick={() => setOpen(false)}>لقائات</a>
        </nav>
      </div>
    </header>
  );
}
