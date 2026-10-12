"use client";

import { Handshake, Mail, ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-[#62060E] text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GsapReveal direction="down">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FF6417] uppercase block mb-3">
            Ecosystem Collaborators
          </span>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.1}>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Founding partners
          </h2>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.2}>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-12 font-light">
            Founding partners are announced soon. This is the inaugural edition of ACE GLOBAL SUMMIT.
          </p>
        </GsapReveal>

        {/* Placeholder partner tier grid */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-4 hover:border-[#FF6417]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Handshake className="w-4 h-4 text-[#FF6417]" />
                </div>
                <span className="text-xs font-semibold text-white/50 tracking-wider">
                  Partner Spotlight {i}
                </span>
              </div>
            ))}
          </div>
        </GsapReveal>

        {/* Become a partner CTA card */}
        <GsapReveal direction="up" delay={0.4}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:px-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-sm font-medium text-white/90">
              Interested in partnering? Join global brands & institutions shaping West Africa's future.
            </span>
            <a
              href="mailto:info@reinventaf.com?subject=ACE%20Global%20Summit%20Partnership%20Inquiry"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#FF6417] hover:text-white px-5 py-2.5 rounded-full bg-[#FF6417]/15 hover:bg-[#FF6417] transition-all border border-[#FF6417]/30"
            >
              <Mail className="w-4 h-4" />
              <span>Become a partner (info@reinventaf.com)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
