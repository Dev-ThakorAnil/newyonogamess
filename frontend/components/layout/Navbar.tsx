"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const topCategories = [
    { href: "/", label: "Home" },
    { href: "/?tab=all", label: "All Yono Games" },
    { href: "/?tab=yono", label: "All Yono Apps" },
    { href: "/category/slots", label: "All Slots Games" },
    { href: "/category/rummy", label: "Rummy Games" },
    { href: "/?tab=diwa", label: "Diwa Games" },
    { href: "/about", label: "About Us" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      {/* Top Green Category Navigation Ribbon */}
      <div className="bg-[#15803d] text-white text-[13px] font-medium border-b border-green-800">
        <div className="container-main">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap py-1.5 scrollbar-none">
            {topCategories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/95 hover:text-white hover:underline transition-colors py-0.5 shrink-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main White Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-main">
          <div className="flex items-center justify-between h-14">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-800 hover:text-green-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>

            {/* Centered Brand Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo1.png"
                alt="NewYonoGamess Logo"
                width={38}
                height={38}
                className="h-9 w-9 object-contain rounded-lg"
                priority
              />
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                NewYono<span className="text-green-700">Gamess</span>
              </span>
            </Link>

            {/* Search Icon Link */}
            <Link
              href="/search"
              className="p-2 text-slate-800 hover:text-green-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Search games"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white py-3 px-4 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                🏠 Home
              </Link>
              <Link
                href="/?tab=all"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                🎮 All Yono Games
              </Link>
              <Link
                href="/?tab=yono"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                📱 All Yono Apps
              </Link>
              <Link
                href="/category/rummy"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                🃏 Rummy Games
              </Link>
              <Link
                href="/category/slots"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                🎰 All Slots Games
              </Link>
              <Link
                href="/?tab=diwa"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
              >
                🔥 Diwa Games
              </Link>
              <div className="pt-2 border-t border-slate-100 flex flex-col space-y-1">
                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-green-700"
                >
                  About Us
                </Link>
                <Link
                  href="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-green-700"
                >
                  Contact Us
                </Link>
                <Link
                  href="/disclaimer"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-green-700"
                >
                  Disclaimer & 18+ Notice
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
