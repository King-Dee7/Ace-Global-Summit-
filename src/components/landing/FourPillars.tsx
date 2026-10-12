"use client";

import { Coins, Sparkles, Truck, Cpu, ArrowRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

interface FourPillarsProps {
  onSecureSeatClick: () => void;
}

const PILLARS = [
  {
    num: "01",
    title: "Wealth Creation, Entrepreneurship and Investment",
    subtitle: "Capital formation & long-term wealth",
    description: "How wealth is built, and the ideas behind it.",
    details:
      "Venture funding, private market opportunities, asset diversification, and the institutional strategies powering generational wealth creation across emerging markets.",
    icon: Coins,
  },
  {
    num: "02",
    title: "Culture and Creative Economy",
    subtitle: "Monetizing heritage & media",
    description: "The people and stories turning culture into industry.",
    details:
      "From music streaming and fashion exports to film distribution and IP protection—unlocking the commercial infrastructure of Africa's most influential export.",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Hospitality and Logistics",
    subtitle: "Cross-border mobility & infrastructure",
    description: "How people, goods and experiences move across borders.",
    details:
      "Exploring tourism infrastructure, aviation connectivity, modern warehousing, cold chains, and the supply lines connecting West Africa with global trade corridors.",
    icon: Truck,
  },
  {
    num: "04",
    title: "Emerging Technology",
    subtitle: "AI, Fintech & Digital Sovereignty",
    description: "Fintech, AI and the tools reshaping how Africa builds.",
    details:
      "Next-generation cross-border payment rails, foundational AI infrastructure, tech talent localization, and the regulatory frontiers transforming African commerce.",
    icon: Cpu,
  },
];

export default function FourPillars({ onSecureSeatClick }: FourPillarsProps) {
  return (
    <section id="pillars" className="py-24 sm:py-32 bg-[#62060E] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FF6417]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <GsapReveal direction="up">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FF6417] uppercase block mb-3">
                Strategic Focus Areas
              </span>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Four themes shaping <span className="text-gradient-orange">what's next.</span>
              </h2>
            </GsapReveal>
          </div>

          <GsapReveal direction="left" delay={0.2} className="mt-6 md:mt-0">
            <button
              onClick={onSecureSeatClick}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#E65100] hover:bg-[#FF6417] text-white font-bold text-sm shadow-xl shadow-[#E65100]/30 hover:scale-105 transition-all"
            >
              <span>Secure my seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </GsapReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <GsapReveal key={pillar.num} direction="up" delay={idx * 0.1}>
                <div className="relative group p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF6417]/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF6417]/15 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6417] to-[#E65100] flex items-center justify-center text-white shadow-lg shadow-[#FF6417]/25 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-3xl sm:text-4xl font-black text-white/20 group-hover:text-[#FF6417]/40 transition-colors">
                        {pillar.num}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#FF6417] mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-base text-white/90 font-medium mb-4">
                      {pillar.description}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {pillar.details}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <span className="font-semibold text-[#FF6417]">Featured Session Track</span>
                    <span className="text-white/40">Accra Marriott • Dec 23</span>
                  </div>
                </div>
              </GsapReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
