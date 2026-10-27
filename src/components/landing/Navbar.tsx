"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 py-3.5 sm:py-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name - Co-Branded Lockup with Accent Divider */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/reinvent-logo-white.png"
              alt="Reinvent Africa Network"
              width={150}
              height={38}
              className="h-7 sm:h-8.5 md:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
              priority
            />
            <div className="h-6 sm:h-7 md:h-7.5 w-[1.5px] bg-gradient-to-b from-[#FF6417] via-white/40 to-transparent mx-3 sm:mx-4" />
            <Image
              src="/Ace.png"
              alt="ACE Global Summit"
              width={150}
              height={27}
              className="h-5 sm:h-6 md:h-6.5 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,100,23,0.25)] transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-normal text-white/80">
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
            {/* Sticky CTA Button */}
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
              className="relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6417] to-[#E65100] rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all duration-200 group border border-white/20"
            >
              <span>GET MY PASS</span>
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
        <div className="md:hidden bg-[#0A0A0A] px-6 py-5 shadow-2xl">
          <div className="flex flex-col space-y-4 text-base font-normal text-white/90">
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
