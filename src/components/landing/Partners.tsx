"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";
import { PARTNERS } from "@/lib/data/partners";

export default function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GsapReveal direction="up">
          <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.08]">
            2026 Sponsors <span className="text-[#FF6417]">&amp; partners</span>
          </h2>
        </GsapReveal>

        {/* Logo wall */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-14 sm:gap-y-20">
          {PARTNERS.map((partner, i) => (
            <GsapReveal key={i} direction="up" delay={(i % 5) * 0.05}>
              <div className="h-20 flex items-center justify-center">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={80}
                    className={`max-h-16 w-auto max-w-[180px] object-contain transition-transform duration-300 hover:scale-105 ${
                      partner.invert ? "invert" : ""
                    }`}
                  />
                ) : (
                  <span className="text-center text-xl sm:text-2xl font-court text-gray-900 leading-tight">
                    {partner.name}
                  </span>
                )}
              </div>
            </GsapReveal>
          ))}
        </div>

        {/* Become a partner */}
        <GsapReveal direction="up">
          <div className="mt-20 sm:mt-28 text-center">
            <a
              href="mailto:info@reinventaf.com?subject=ACE%20Global%20Summit%20Partnership%20Inquiry"
              className="group inline-flex items-center gap-4 rounded-full border border-gray-200 py-2 pl-6 pr-2 text-sm font-semibold text-gray-900 transition-colors hover:border-[#FF6417]"
            >
              Want your brand here? Become a partner
              <span className="w-9 h-9 rounded-full bg-[#62060E] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF6417] group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
