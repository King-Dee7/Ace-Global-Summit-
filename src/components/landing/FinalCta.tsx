"use client";

import { Calendar, MapPin } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

interface FinalCtaProps {
  onSecureSeatClick: () => void;
}

export default function FinalCta({ onSecureSeatClick }: FinalCtaProps) {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#62060E] to-[#3B0207] text-white relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapReveal direction="down">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-[#FF6417]/40 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-8">
            <span>December 23, 2026 • Accra, Ghana</span>
          </div>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.1}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            One day in Accra. <br />
            <span className="text-gradient-orange">
              Come meet the people building what's next.
            </span>
          </h2>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-base sm:text-lg text-white/90 mb-10 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#FF6417]" />
              <span>December 23, 2026</span>
            </div>
            <span className="text-[#FF6417]">•</span>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#FF6417]" />
              <span>Accra Marriott Hotel</span>
            </div>
          </div>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.3}>
          <button
            onClick={onSecureSeatClick}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-[#FF6417] via-[#E65100] to-[#FF6417] text-white font-black text-lg sm:text-xl shadow-md hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
          >
            <span>Secure my seat</span>
          </button>
        </GsapReveal>
      </div>
    </section>
  );
}
