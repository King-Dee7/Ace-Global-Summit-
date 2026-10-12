"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onSecureSeatClick?: () => void;
}

export default function Navbar({ onSecureSeatClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#62060E]/90 backdrop-blur-md border-b border-[#FF6417]/20 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6417] to-[#E65100] flex items-center justify-center font-bold text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="tracking-tighter text-lg font-black">ACE</span>
            </div>
            <div>
              <span className="font-extrabold text-white text-base sm:text-lg tracking-wider block">
                ACE GLOBAL SUMMIT
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#FF6417] font-semibold block">
                Accra 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
            <a
              href="#attend"
              onClick={(e) => handleNavClick(e, "attend")}
              className="hover:text-[#FF6417] transition-colors"
            >
              ATTEND
            </a>
            <a
              href="#programme"
              onClick={(e) => handleNavClick(e, "programme")}
              className="hover:text-[#FF6417] transition-colors"
            >
              PROGRAMME
            </a>
            <a
              href="#speakers"
              onClick={(e) => handleNavClick(e, "speakers")}
              className="hover:text-[#FF6417] transition-colors"
            >
              SPEAKERS
            </a>
            <a
              href="#partners"
              onClick={(e) => handleNavClick(e, "partners")}
              className="hover:text-[#FF6417] transition-colors"
            >
              PARTNERS
            </a>
          </nav>

          {/* Action Area: Sticky CTA */}
          <div className="flex items-center space-x-3">
            {/* Sticky "Secure my seat" Button */}
            <a
              href="#tickets"
              onClick={(e) => {
                if (onSecureSeatClick) {
                  e.preventDefault();
                  onSecureSeatClick();
                } else {
                  handleNavClick(e, "tickets");
                }
              }}
              className="relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF6417] to-[#E65100] rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all duration-200 group border border-white/20"
            >
              <span>Secure my seat</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#FF6417] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#62060E] border-b border-[#FF6417]/30 px-6 py-5 shadow-2xl">
          <div className="flex flex-col space-y-4 text-base font-medium text-white">
            <a
              href="#attend"
              onClick={(e) => handleNavClick(e, "attend")}
              className="hover:text-[#FF6417] py-1 border-b border-white/10"
            >
              ATTEND
            </a>
            <a
              href="#programme"
              onClick={(e) => handleNavClick(e, "programme")}
              className="hover:text-[#FF6417] py-1 border-b border-white/10"
            >
              PROGRAMME
            </a>
            <a
              href="#speakers"
              onClick={(e) => handleNavClick(e, "speakers")}
              className="hover:text-[#FF6417] py-1 border-b border-white/10"
            >
              SPEAKERS
            </a>
            <a
              href="#partners"
              onClick={(e) => handleNavClick(e, "partners")}
              className="hover:text-[#FF6417] py-1 border-b border-white/10"
            >
              PARTNERS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
