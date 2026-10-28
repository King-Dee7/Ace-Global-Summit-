"use client";

import Image from "next/image";
import GsapReveal from "../motion/GsapReveal";

const PAST_EVENT_FACTS = [
  { value: "17 July", label: "2026" },
  { value: "Accra", label: "Ghana" },
  { value: "Google", label: "AI Community Center" },
];

export default function TrackRecord() {
  return (
    <section className="py-24 sm:py-32 bg-white text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-16 lg:gap-24 items-center">
          {/* Copy */}
          <div>
            <GsapReveal direction="up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.05]">
                From the team behind <span className="text-[#FF6417]">From Go To Goal.</span>
              </h2>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.1}>
              <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                ACE GLOBAL SUMMIT is powered by{" "}
                <strong className="font-semibold text-gray-900">Reinvent Africa Network (RAN)</strong>, the team
                behind From Go To Goal Summit 2026: The Architecture of Ambition. Same team, bigger room.
              </p>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.2}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-gray-200 max-w-xl">
                {PAST_EVENT_FACTS.map((fact) => (
                  <div key={fact.value} className="px-4 sm:px-6 first:pl-0 flex flex-col-reverse">
                    <dt className="mt-2 text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold">
                      {fact.label}
                    </dt>
                    <dd className="text-2xl sm:text-3xl font-court text-[#62060E] leading-none">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.3}>
              <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
                <span>Powered by</span>
                <Image
                  src="/reinvent-logo-white.png"
                  alt="Reinvent Africa Network"
                  width={140}
                  height={40}
                  className="h-7 w-auto invert"
                />
              </div>
            </GsapReveal>
          </div>

          {/* Poster */}
          <GsapReveal direction="up" delay={0.15}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              {/* Offset brand card for depth */}
              <div aria-hidden className="absolute inset-0 rounded-3xl bg-[#62060E] -rotate-6 translate-x-3 translate-y-3" />

              <div className="group relative rounded-3xl overflow-hidden shadow-2xl rotate-2 transition-transform duration-500 hover:rotate-0">
                <Image
                  src="/from-go-to-goal-poster.jpg"
                  alt="From Go To Goal Summit 2026 poster"
                  width={1024}
                  height={1280}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="w-full h-auto"
                />
              </div>

              {/* Past-edition badge */}
              <div className="absolute -top-5 -left-5 sm:-top-6 sm:-left-6 w-24 h-24 rounded-full bg-[#FF6417] text-white flex flex-col items-center justify-center text-center shadow-xl -rotate-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Past</span>
                <span className="text-lg font-court leading-none">Edition</span>
              </div>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
