"use client";

import { MessageSquareQuote } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function OneDay() {
  return (
    <section className="relative py-24 sm:py-32 bg-white text-gray-900 overflow-hidden border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapReveal direction="up">
          <div className="flex items-center space-x-2 text-[#E65100] text-xs font-bold tracking-widest uppercase mb-4">
            <span>The Mandate</span>
          </div>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#62060E] tracking-tight leading-tight mb-8">
            One day. Four pillars. <br />
            <span className="text-[#FF6417]">
              Every great connection starts with a conversation.
            </span>
          </h2>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.2}>
          <div className="relative pl-6 sm:pl-10 border-l-4 border-[#FF6417] py-2 my-6">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 font-semibold leading-relaxed">
              On December 23, creatives, professionals, founders, investors and the diaspora share one room in Accra.
            </p>
          </div>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.3}>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-4xl font-normal mt-6">
            Come to learn, to meet people you would not otherwise meet, and to leave with ideas and relationships worth keeping. You do not need an agenda. You just need to be in the room.
          </p>
        </GsapReveal>

        {/* Proximity Principle Callout */}
        <GsapReveal direction="up" delay={0.4}>
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FAF7F5] border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-[#62060E] text-[#FF6417] shadow-md shadow-[#62060E]/20">
                <MessageSquareQuote className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#62060E]">The Principle of Proximity</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  Proximity to capital, decision-makers, and market leaders shaping the next global growth cycle.
                </p>
              </div>
            </div>
            <div className="text-xs font-bold px-4 py-2 rounded-full bg-[#FF6417]/10 text-[#E65100] border border-[#FF6417]/20 whitespace-nowrap">
              Accra Marriott Hotel • Dec 23
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
