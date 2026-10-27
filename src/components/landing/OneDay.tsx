"use client";

import Image from "next/image";
import GsapReveal from "../motion/GsapReveal";

export default function OneDay() {
  return (
    <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-24 sm:pb-36 lg:pb-44 bg-white text-gray-900 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Editorial Manifesto & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <GsapReveal direction="up">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#FF6417] tracking-tight leading-[1.08] mb-8"
                style={{ fontFamily: "'ModeCourt', sans-serif" }}
              >
                Every great connection starts with a conversation.
              </h2>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.1}>
              <div className="space-y-6 text-gray-700 font-light text-base sm:text-[17px] md:text-[18px] leading-relaxed max-w-xl">
                <p>
                  Africa has never been closer to its defining moment. Economically, creatively, and technologically, the continent is rewriting its own narrative — and the world is finally paying full attention.
                </p>

                <p>
                  But meaningful progress doesn’t move on its own. It advances only when the right people share the same room — founders meeting capital, operators sharing hard-won playbooks, and the diaspora reconnecting with home to build lasting value.
                </p>

                <p>
                  For ACE Global Summit 2026, we have raised our ambition and assembled the most forward-thinking voices across wealth creation, culture, technology, and trade for a single day in Accra. One room, one shared table, and one decisive gathering in Ghana’s most electric month of the year.
                </p>

                <p>
                  They will share actionable ideas and forge partnerships across four strategic pillars shaping the continent’s tomorrow.
                </p>
              </div>
            </GsapReveal>
          </div>

          {/* Right Column: Polaroid-style Tilted Photo with Tilted Orange Accent Blocks */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <GsapReveal direction="up" delay={0.15} className="w-full max-w-lg lg:max-w-none">
              <div className="relative mx-auto lg:mr-0 max-w-[500px] sm:max-w-[540px] xl:max-w-[570px] -rotate-[2.5deg] transition-transform duration-500 hover:-rotate-1">
                {/* Top-Right Solid Orange Block Layered Beneath Image (Tilted with Card) */}
                <div
                  className="absolute -top-4 -right-4 sm:-top-5 sm:-right-6 lg:-top-6 lg:-right-7 w-48 sm:w-60 md:w-72 lg:w-80 h-32 sm:h-40 md:h-48 bg-[#FF6417] pointer-events-none z-0"
                  aria-hidden="true"
                />

                {/* Bottom-Left Solid Orange Block Layered Beneath Image (Tilted with Card) */}
                <div
                  className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 lg:-bottom-6 lg:-left-7 w-48 sm:w-60 md:w-72 lg:w-80 h-32 sm:h-40 md:h-48 bg-[#FF6417] pointer-events-none z-0"
                  aria-hidden="true"
                />

                {/* Photo with white border */}
                <div className="relative z-10 bg-white p-2.5 sm:p-3 md:p-3.5 shadow-2xl">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src="/GOTOGOAL(16).jpg"
                      alt="ACE Global Summit In Accra"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </GsapReveal>
          </div>

        </div>
      </div>

      {/* Decorative Spiral / Concentric Rings: Aligned flush with the section borderline */}
      <div className="absolute bottom-[26px] translate-y-[57.5%] right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 z-30 pointer-events-none select-none">
        <div className="relative w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-square">
          <Image
            src="/round.png"
            alt="Concentric circle design accent"
            fill
            sizes="(max-width: 768px) 280px, 400px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
