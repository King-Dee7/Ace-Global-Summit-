"use client";

import { ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function Venue() {
  return (
    <section id="venue" className="relative isolate overflow-hidden bg-[#250104] text-white">
      {/* Full-bleed hotel photo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/marriot.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[75svh] flex flex-col pt-16 pb-10 sm:pb-12 [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
        {/* Headline */}
        <div className="my-auto py-10">
          <GsapReveal direction="up" delay={0.1}>
            <h2
              className="font-court font-normal leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              style={{ fontFamily: "'ModeCourt', sans-serif" }}
            >
              Accra
              <br />
              Marriott Hotel
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80 font-light">
              Five-star hospitality in the heart of Airport City. Grand ballroom, private dealroom suites, and
              connectivity built for an international room.
            </p>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.3}>
            <a
              href="https://maps.google.com/?q=Accra+Marriott+Hotel"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 pl-6 pr-2 py-2 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white hover:text-[#62060E]"
            >
              Get Directions
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6417] text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
