"use client";

import Image from "next/image";
import GsapReveal from "../motion/GsapReveal";

interface HeroProps {
  onSecureSeatClick: () => void;
}

export default function Hero({ onSecureSeatClick }: HeroProps) {
  const scrollToProgramme = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("programme");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full min-h-[calc(100vh+60px)] min-h-[calc(100dvh+60px)] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#62060E]"
      style={{ minHeight: "calc(100vh + 60px)" }}
    >
      {/* Background Hero Audience Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/GOTOGOAL(16).jpg"
          alt="ACE Global Summit Audience"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full pt-4 sm:pt-6">
        <div className="w-full text-left">
          {/* Row 1: [ ACE ] (Orange Rectangle Box on Top Left) */}
          <GsapReveal direction="up" delay={0.1}>
            <div
              className="inline-block bg-[#FF6417] px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 relative top-[1px] ml-4 sm:ml-6 md:ml-7"
              style={{ top: "1px" }}
            >
              <h1
                className="text-white text-[clamp(4.25rem,11.5vw,10.5rem)] leading-[0.86] font-normal tracking-[0.02em]"
                style={{ fontFamily: "'ModeCourt', sans-serif" }}
              >
                ACE
              </h1>
            </div>
          </GsapReveal>

          {/* Row 2: GLOBAL (Shifted Center-Right) */}
          <GsapReveal direction="up" delay={0.15}>
            <div
              className="flex items-center pl-6 sm:pl-16 md:pl-28 lg:pl-36 mt-1 sm:mt-1.5 md:mt-2 leading-none relative z-20 left-[58px]"
              style={{ left: "58px" }}
            >
              <span
                className="text-white text-[clamp(4.25rem,11.5vw,10.5rem)] leading-none font-normal tracking-[0.02em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
                style={{ fontFamily: "'ModeCourt', sans-serif" }}
              >
                GLOBAL
              </span>
            </div>
          </GsapReveal>

          {/* Row 3: Split Grid */}
          <div className="mt-3 sm:mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
            {/* Left Column: Narrative Paragraph & Action Buttons */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-5 relative z-20 pl-4 sm:pl-6 md:pl-7 -top-4 sm:-top-6 md:-top-7">
              <GsapReveal direction="up" delay={0.2}>
                <p className="text-white text-base sm:text-[17px] md:text-[18px] font-light leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Meet the people building what’s next across a full day of high-impact conversations, breakthrough ideas, and strategic connections.
                </p>
              </GsapReveal>

              <GsapReveal direction="up" delay={0.25}>
                <div className="flex items-center gap-5 sm:gap-6 -mt-1 sm:-mt-1.5">
                  <button
                    onClick={onSecureSeatClick}
                    className="px-6 sm:px-8 py-3.5 bg-white text-[#FF6417] hover:bg-white/90 font-medium text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-md active:scale-95 transition-all"
                  >
                    GET MY PASS
                  </button>
                  <a
                    href="#programme"
                    onClick={scrollToProgramme}
                    className="text-white hover:text-[#FF6417] font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors py-3 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  >
                    LEARN MORE
                  </a>
                </div>
              </GsapReveal>
            </div>

            {/* Right Column: SUMMIT with Orange Square Layer behind S and half of U */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col lg:items-end relative lg:-mt-10 xl:-mt-14">
              <GsapReveal direction="up" delay={0.2}>
                <div
                  className="flex flex-col items-start lg:mr-10 xl:mr-14 relative -top-6 left-[5px]"
                  style={{ top: "-24px", left: "5px" }}
                >
                  <div
                    className="relative inline-block leading-none text-[clamp(4.25rem,11.5vw,10.5rem)]"
                    style={{ fontFamily: "'ModeCourt', sans-serif" }}
                  >
                    {/* Floating Orange Square: top edge falls on A and a bit of L in GLOBAL, bottom overlaps behind S and half of U in SUMMIT */}
                    <div
                      className="absolute -top-[0.11em] left-[-0.05em] w-[0.90em] h-[0.93em] bg-[#FF6417] z-0 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Foreground SUMMIT typography */}
                    <span className="relative z-10 text-white leading-none font-normal tracking-[0.02em] block">
                      SUMMIT
                    </span>
                  </div>

                  {/* Date & Location directly beneath SUMMIT on the right */}
                  <div className="-mt-2 sm:-mt-3 md:-mt-4 w-full flex items-center justify-between gap-6 sm:gap-10 text-sm sm:text-base md:text-lg font-light text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pr-6 sm:pr-8 md:pr-10 lg:pr-12">
                    <span>23rd December, 2026.</span>
                    <span style={{ position: "relative", left: "16px" }}>Accra Marriot Hotel</span>
                  </div>
                </div>
              </GsapReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
