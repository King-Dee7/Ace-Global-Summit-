"use client";

import { Calendar, MapPin } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

interface HeroProps {
  onSecureSeatClick: () => void;
}

export default function Hero({ onSecureSeatClick }: HeroProps) {
  const scrollToProgramme = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("programme");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#62060E]">
      {/* Subtle geometric grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Main Event Title */}
        <GsapReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6">
            ACE GLOBAL <br className="hidden sm:inline" />
            <span className="text-gradient-orange">SUMMIT</span>
          </h1>
        </GsapReveal>

        {/* Date & Venue Badge */}
        <GsapReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-semibold text-white/95 mb-8">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-[#FF6417]" />
              <span>December 23, 2026</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-[#FF6417]" />
              <span>Accra Marriott Hotel, Ghana</span>
            </div>
          </div>
        </GsapReveal>

        {/* Hero Narrative / Core Mandate */}
        <GsapReveal direction="up" delay={0.3}>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10">
            Meet the people building what’s next across a full day of high-impact
            conversations, breakthrough ideas, and strategic connections.
          </p>
        </GsapReveal>

        {/* Action Buttons */}
        <GsapReveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onSecureSeatClick}
              className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#FF6417] via-[#E65100] to-[#FF6417] bg-[length:200%_auto] hover:bg-right transition-all duration-300 rounded-full shadow-md hover:scale-105 active:scale-95 border border-white/20 flex items-center justify-center"
            >
              <span>Secure my seat</span>
            </button>

            <a
              href="#programme"
              onClick={scrollToProgramme}
              className="w-full sm:w-auto px-7 py-4 text-base sm:text-lg font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#FF6417]/50 rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <span>See the programme</span>
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
