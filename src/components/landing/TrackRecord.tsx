"use client";

import { Award, History, Globe2, CheckCircle2 } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function TrackRecord() {
  return (
    <section className="py-20 sm:py-28 bg-[#4A040A] text-white border-t border-b border-[#FF6417]/15 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#62060E] to-[#3B0207] border border-[#FF6417]/25 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <GsapReveal direction="up">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#FF6417] uppercase tracking-wider mb-4 border border-[#FF6417]/30">
                  <Award className="w-4 h-4" />
                  <span>Proven Execution Track Record</span>
                </div>
              </GsapReveal>

              <GsapReveal direction="up" delay={0.1}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal font-court text-white leading-tight mb-4" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
                  From the team behind the <br />
                  <span className="text-[#FF6417]">From Go To Goal Summit.</span>
                </h3>
              </GsapReveal>

              <GsapReveal direction="up" delay={0.2}>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                  ACE GLOBAL SUMMIT is powered by{" "}
                  <strong className="text-white font-semibold">Reinvent Africa Network (RAN)</strong>, the team
                  behind the successful <em>From Go To Goal Summit</em>, held in Accra in July 2026.
                </p>
              </GsapReveal>

              <GsapReveal direction="up" delay={0.3}>
                <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6417]" />
                    <span>Cross-Border Investor Networks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6417]" />
                    <span>Curated Diaspora Returnees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6417]" />
                    <span>Institutional Alignment</span>
                  </div>
                </div>
              </GsapReveal>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-[#FF6417]/20 text-[#FF6417]">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">July 2026</div>
                  <div className="text-xs text-white/60">From Go To Goal Summit, Accra</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-[#FF6417]/20 text-[#FF6417]">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">RAN Global</div>
                  <div className="text-xs text-white/60">Reinvent Africa Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
