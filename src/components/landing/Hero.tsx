"use client";

import { Calendar, MapPin, ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#62060E]">
      {/* Dynamic ambient lighting / glowing mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF6417]/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E65100]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF6417]/10 blur-[100px] pointer-events-none rounded-full" />

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
        {/* Top Tagline / Summit pill */}
        <GsapReveal direction="down" delay={0.1}>
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#FF6417]/40 backdrop-blur-md mb-8 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6417] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase">
              Inaugural Edition • Accra, Ghana
            </span>
          </div>
        </GsapReveal>

        {/* Main Event Title */}
        <GsapReveal direction="up" delay={0.2}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6">
            ACE GLOBAL <br className="hidden sm:inline" />
            <span className="text-gradient-orange">SUMMIT</span>
          </h1>
        </GsapReveal>

        {/* Date & Venue Badge */}
        <GsapReveal direction="up" delay={0.3}>
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
        <GsapReveal direction="up" delay={0.4}>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10">
            Meet the people building what’s next across a full day of high-impact
            conversations, breakthrough ideas, and strategic connections.
          </p>
        </GsapReveal>

        {/* Action Buttons */}
        <GsapReveal direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onSecureSeatClick}
              className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#FF6417] via-[#E65100] to-[#FF6417] bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-full shadow-2xl shadow-[#FF6417]/40 hover:scale-105 active:scale-95 border border-white/20 flex items-center justify-center space-x-2 group"
            >
              <span>Secure my seat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="#programme"
              onClick={scrollToProgramme}
              className="w-full sm:w-auto px-7 py-4 text-base sm:text-lg font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#FF6417]/50 rounded-full transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>See the programme</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </GsapReveal>

        {/* Trust & Key Highlights bar */}
        <GsapReveal direction="up" delay={0.65}>
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center space-x-2 text-[#FF6417] mb-1 font-bold text-lg">
                <Zap className="w-4 h-4" />
                <span>1 Full Day</span>
              </div>
              <p className="text-xs text-white/70">Curated, high-octane focus on deal-making & capital.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center space-x-2 text-[#FF6417] mb-1 font-bold text-lg">
                <Users className="w-4 h-4" />
                <span>4 Pillars</span>
              </div>
              <p className="text-xs text-white/70">Wealth, Culture, Logistics & Emerging Tech.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center space-x-2 text-[#FF6417] mb-1 font-bold text-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Dealroom</span>
              </div>
              <p className="text-xs text-white/70">Closed, curated sessions for founders & investors.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center space-x-2 text-[#FF6417] mb-1 font-bold text-lg">
                <MapPin className="w-4 h-4" />
                <span>Accra Marriott</span>
              </div>
              <p className="text-xs text-white/70">5-star luxury host venue in Airport City.</p>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
