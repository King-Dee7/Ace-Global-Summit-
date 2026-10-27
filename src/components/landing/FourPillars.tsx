"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

interface FourPillarsProps {
  onSecureSeatClick?: () => void;
}

const PILLARS = [
  {
    num: "01",
    tag: "THEME",
    title: "Wealth Creation, Entrepreneurship and Investment",
    description: "How wealth is built, and the institutional ideas behind it.",
    image: "/enterprenueship.png",
    gradient: "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(20, 2, 4, 0.35) 45%, rgba(10, 1, 2, 0.95) 100%)",
  },
  {
    num: "02",
    tag: "THEME",
    title: "Culture and Creative Economy",
    description: "The people and stories turning African culture into enduring industry.",
    image: "/culture.png",
    gradient: "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(20, 8, 4, 0.45) 45%, rgba(12, 4, 2, 0.95) 100%)",
  },
  {
    num: "03",
    tag: "THEME",
    title: "Hospitality and Logistics",
    description: "How people, goods and regional experiences move across borders.",
    image: "/logistics.png",
    gradient: "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(2, 12, 30, 0.4) 45%, rgba(1, 6, 18, 0.95) 100%)",
  },
  {
    num: "04",
    tag: "THEME",
    title: "Emerging Technology",
    description: "Next-gen fintech, foundational AI and tools reshaping how Africa builds.",
    image: "/tech.png",
    gradient: "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(6, 4, 20, 0.35) 45%, rgba(4, 2, 14, 0.95) 100%)",
  },
];

export default function FourPillars({ onSecureSeatClick }: FourPillarsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pillars" className="pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32 bg-white text-gray-900 relative overflow-hidden">
      {/* Smooth Faded Transition from previous winish background */}
      <div 
        className="absolute top-0 left-0 right-0 h-44 sm:h-60 md:h-72 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, rgba(98, 6, 14, 0.45) 0%, rgba(98, 6, 14, 0.25) 25%, rgba(98, 6, 14, 0.1) 55%, rgba(98, 6, 14, 0.02) 80%, rgba(255, 255, 255, 0) 100%)"
        }}
        aria-hidden="true"
      />

      {/* Section Heading Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-14">
        <div className="max-w-3xl">
          <GsapReveal direction="up">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.12]" 
              style={{ fontFamily: "'ModeCourt', sans-serif" }}
            >
              Four themes shaping <span className="text-[#FF6417]">what's next.</span>
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              A curated program exploring the structural forces, cultural capital, and frontier technologies defining Africa's economic trajectory.
            </p>
          </GsapReveal>
        </div>
      </div>

      {/* Full-Bleed Edge-to-Edge Cards Strip (Zero side margins/spaces, sharp non-rounded edges) */}
      <div className="w-full relative z-10">
        <GsapReveal direction="up" delay={0.15}>
          <div className="relative group/carousel w-full">
            {/* The Cards Row Container: Panoramic 4-column strip, 100% full-bleed width, sharp square edges */}
            <div 
              ref={scrollContainerRef}
              className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory scrollbar-none w-full bg-black divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-none shadow-2xl border-y border-black/10"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {PILLARS.map((pillar) => {
                return (
                  <div
                    key={pillar.num}
                    className="relative group w-[85vw] sm:w-[50vw] lg:w-full shrink-0 lg:shrink snap-center min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] p-7 sm:p-9 xl:p-11 flex flex-col justify-between overflow-hidden select-none rounded-none transition-all duration-500"
                  >
                    {/* Background Image with smooth zoom on hover */}
                    <div className="absolute inset-0 z-0 bg-neutral-900 rounded-none">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out rounded-none"
                      />
                    </div>

                    {/* Gradient Overlay tailored to each pillar */}
                    <div 
                      className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-500 group-hover:opacity-95"
                      style={{ background: pillar.gradient }}
                    />

                    {/* TOP: Tag + Giant Number (Exactly like TEDx) */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/80">
                          {pillar.tag}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-[#FF6417] group-hover:border-[#FF6417] transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="mt-1 text-6xl sm:text-7xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                        {pillar.num}
                      </div>
                    </div>

                    {/* BOTTOM: Clean Title in ModeCourt & Description */}
                    <div className="relative z-10 pt-10 sm:pt-14">
                      {/* Pillar Title in ModeCourt */}
                      <h3 
                        className="text-xl sm:text-2xl font-normal font-court text-white leading-snug mb-2 group-hover:text-[#FF6417] transition-colors duration-300"
                        style={{ fontFamily: "'ModeCourt', sans-serif" }}
                      >
                        {pillar.title}
                      </h3>

                      {/* Hook Description */}
                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrow on Right (TEDx style circular button for mobile/scroll) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:hidden flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500 font-medium">
                Swipe or tap to explore themes
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  aria-label="Previous theme"
                  className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#62060E] hover:border-[#62060E] transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  aria-label="Next theme"
                  className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#62060E] hover:border-[#62060E] transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
