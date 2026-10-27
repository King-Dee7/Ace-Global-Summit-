"use client";

import { Handshake, Mail } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-white text-gray-900 relative border-t border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GsapReveal direction="down">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
            Ecosystem Collaborators
          </span>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.12] mb-4" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
            Founding partners
          </h2>
        </GsapReveal>

        <GsapReveal direction="up" delay={0.2}>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-normal">
            Founding partners are announced soon. This is the inaugural edition of ACE GLOBAL SUMMIT.
          </p>
        </GsapReveal>

        {/* Placeholder partner tier grid */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF7F5] flex flex-col items-center justify-center p-4 hover:border-[#FF6417] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                  <Handshake className="w-4 h-4 text-[#FF6417]" />
                </div>
                <span className="text-xs font-semibold text-gray-400 tracking-wider">
                  Partner Spotlight {i}
                </span>
              </div>
            ))}
          </div>
        </GsapReveal>

        {/* Become a partner CTA card */}
        <GsapReveal direction="up" delay={0.4}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:px-8 rounded-full bg-[#FAF7F5] border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              Interested in partnering? Join global brands & institutions shaping West Africa's future.
            </span>
            <a
              href="mailto:info@reinventaf.com?subject=ACE%20Global%20Summit%20Partnership%20Inquiry"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-white px-5 py-2.5 rounded-full bg-[#62060E] hover:bg-[#7D0A13] transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#FF6417]" />
              <span>Become a partner (info@reinventaf.com)</span>
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
