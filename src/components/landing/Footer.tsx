"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Who's in the Room", href: "#attend" },
  { label: "Four Pillars", href: "#pillars" },
  { label: "Programme", href: "#programme" },
  { label: "Speakers", href: "#speakers" },
  { label: "Tickets", href: "#tickets" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: lockup + contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <div className="flex items-center">
              <Image
                src="/reinvent-logo-white.png"
                alt="Reinvent Africa Network"
                width={150}
                height={38}
                className="h-8 w-auto object-contain"
              />
              <div className="h-7 w-px bg-white/30 mx-4" />
              <Image src="/Ace.png" alt="ACE Global Summit" width={150} height={27} className="h-6 w-auto object-contain" />
            </div>
            <p className="mt-8 max-w-md text-base text-white/60 leading-relaxed">
              A global summit series connecting capital, leadership and opportunity across markets.
            </p>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">Get in touch</span>
            <a
              href="mailto:info@reinventaf.com"
              className="group mt-4 flex items-center gap-4 lg:justify-end font-court text-3xl sm:text-5xl text-white hover:text-[#FF6417] transition-colors"
              style={{ fontFamily: "'ModeCourt', sans-serif" }}
            >
              info@reinventaf.com
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#FF6417] text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
            <a
              href="https://www.reinventaf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-white/60 hover:text-white transition-colors"
            >
              www.reinventaf.com
            </a>
          </div>
        </div>

        {/* Middle: links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-white/10">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#FF6417] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={scrollToTop}
            className="group inline-flex w-fit items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-[#FF6417] group-hover:bg-[#FF6417]">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 text-xs text-white/40">
          <span>© 2026 ACE GLOBAL SUMMIT. Powered by Reinvent Africa Network.</span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-court leading-[0.8] text-white/[0.06] text-[17vw] -mb-[3vw]"
        style={{ fontFamily: "'ModeCourt', sans-serif" }}
      >
        ACE Global
      </div>
    </footer>
  );
}
