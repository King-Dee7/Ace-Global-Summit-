"use client";

import Link from "next/link";
import { Mail, Globe, Shield, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#3B0207] text-white/80 border-t border-[#FF6417]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#FF6417] flex items-center justify-center font-black text-white text-base">
                ACE
              </div>
              <span className="font-extrabold text-white text-lg tracking-wider">
                ACE GLOBAL SUMMIT
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-sm font-light leading-relaxed mb-6">
              A global summit series connecting capital, leadership, and opportunity across markets. Inaugural edition in Accra, Ghana on December 23, 2026.
            </p>
            <div className="text-xs font-semibold text-[#FF6417]">
              Powered by Reinvent Africa Network (RAN)
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Summit
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#attend" className="hover:text-[#FF6417] transition-colors">
                  Who's in the Room
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-[#FF6417] transition-colors">
                  Four Pillars
                </a>
              </li>
              <li>
                <a href="#programme" className="hover:text-[#FF6417] transition-colors">
                  Programme & Schedule
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-[#FF6417] transition-colors">
                  Speakers Lineup
                </a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-[#FF6417] transition-colors">
                  Tickets & Passes
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-[#FF6417] transition-colors">
                  Accra Marriott Hotel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Inquiries & Network
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@reinventaf.com"
                className="flex items-center space-x-2 text-white/80 hover:text-[#FF6417] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF6417]" />
                <span>info@reinventaf.com</span>
              </a>
              <a
                href="https://www.reinventaf.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/80 hover:text-[#FF6417] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#FF6417]" />
                <span>www.reinventaf.com</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-4">
              <Link
                href="/admin/login"
                className="inline-flex items-center space-x-1.5 text-xs text-white/60 hover:text-white transition-colors py-1 px-2.5 rounded bg-white/5 border border-white/10"
              >
                <Shield className="w-3.5 h-3.5 text-[#FF6417]" />
                <span>Staff & Admin Portal</span>
              </Link>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors ml-auto"
                title="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <div>
            © 2026 ACE GLOBAL SUMMIT. All rights reserved. Powered by Reinvent Africa Network.
          </div>
          <div className="flex items-center space-x-6">
            <span>Accra Marriott Hotel</span>
            <span>•</span>
            <span>December 23, 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
