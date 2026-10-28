"use client";

import { ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

interface FinalCtaProps {
  onSecureSeatClick: () => void;
}

export default function FinalCta({ onSecureSeatClick }: FinalCtaProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#250104] text-white">
      {/* Full-bleed crowd photo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/GOTOGOAL%2816%29.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-[#250104]/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80svh] flex flex-col justify-center py-24 [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
        <GsapReveal direction="up">
          <h2
            className="font-court font-normal leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] max-w-5xl"
            style={{ fontFamily: "'ModeCourt', sans-serif" }}
          >
            Come meet the people building <span className="text-[#FF6417]">what&apos;s next.</span>
          </h2>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.15}>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 border-t border-white/25 pt-8">
            <button
              onClick={onSecureSeatClick}
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#FF6417] pl-8 pr-2 py-2 text-base sm:text-lg font-semibold [text-shadow:none] transition-colors hover:bg-[#FF7B39]"
            >
              Secure my seat
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#62060E] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
