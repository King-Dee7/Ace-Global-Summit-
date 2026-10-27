"use client";

import Image from "next/image";
import GsapReveal from "../motion/GsapReveal";

const COHORTS = [
  {
    title: "Creatives and professionals",
    description:
      "Turn talent into industry. Meet the cultural curators, media leaders, designers, and executive talent transforming African creative capital into enduring business.",
  },
  {
    title: "Founders and SME owners",
    description:
      "Scale ventures across borders. Exchange battle-tested playbooks, connect with strategic collaborators, and learn from founders building sustainable regional scale.",
  },
  {
    title: "The diaspora",
    description:
      "Connect with the future of home. Reconnect with high-traction ventures, innovative operators, and institutional networks shaping what comes next.",
  },
  {
    title: "Investors and fund managers",
    description:
      "Deploy capital into real traction. Discover qualified investment deal flow across venture capital, private equity, angel syndicates, and high-growth African assets.",
  },
];

export default function WhosInTheRoom() {
  return (
    <section id="attend" className="py-20 sm:py-28 lg:py-32 bg-[#62060E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full-width Section Title */}
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
          <GsapReveal direction="up">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-white tracking-tight leading-[1.12]"
              style={{ fontFamily: "'ModeCourt', sans-serif" }}
            >
              If you build it, create it, fund it or come home to it,{" "}
              <span className="text-[#FF6417]">there is a seat for you.</span>
            </h2>
          </GsapReveal>
        </div>

        {/* 2-Column Split: Overlapping Photos on Left & Cohort List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Overlapping Polaroid Photos (Matching Dimensions) with Orange Sticker */}
          <div className="lg:col-span-7 relative pt-6 sm:pt-8 pb-6 sm:pb-0 pl-6 sm:pl-10 md:pl-12">
            <GsapReveal direction="up" delay={0.15}>
              <div className="relative mx-auto lg:mx-0 max-w-[340px] sm:max-w-[420px] md:max-w-[460px] xl:max-w-[490px]">
                
                {/* Photo 1: Back Photo (Exact Same Dimension, Shifted Top-Left & Tilted) */}
                <div 
                  className="absolute inset-0 -translate-x-8 sm:-translate-x-12 md:-translate-x-14 -translate-y-4 sm:-translate-y-6 md:-translate-y-7 -rotate-[5deg] bg-white p-2.5 sm:p-3 shadow-xl z-0 transition-transform duration-500 hover:-rotate-3"
                  aria-hidden="true"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src="/GOTOGOAL(16).jpg"
                      alt="ACE Global Summit Attendees"
                      fill
                      sizes="(max-width: 768px) 340px, 490px"
                      className="object-cover object-left"
                    />
                  </div>
                </div>

                {/* Photo 2: Front Photo (Main Landscape Polaroid) */}
                <div className="relative z-10 -rotate-[1.5deg] bg-white p-2.5 sm:p-3 shadow-2xl transition-transform duration-500 hover:rotate-0">
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-gray-900">
                    <Image
                      src="/GOTOGOAL(16).jpg"
                      alt="ACE Global Summit In Accra"
                      fill
                      priority
                      sizes="(max-width: 768px) 340px, 490px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Orange Sticker Banner "WHOS IN THE ROOM" (Prominent & Straddling top-left of front photo) */}
                <div className="absolute -top-5 sm:-top-7 md:-top-8 left-3 sm:left-6 md:left-8 z-30 -rotate-[2.5deg] shadow-2xl pointer-events-none select-none">
                  <div className="bg-[#FF6417] px-5 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 text-white font-black text-sm sm:text-lg md:text-xl lg:text-2xl tracking-wider uppercase whitespace-nowrap">
                    WHOS IN THE ROOM
                  </div>
                </div>

              </div>
            </GsapReveal>
          </div>

          {/* Right Column: Editorial Cohort Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 lg:pl-2">
            {COHORTS.map((cohort, idx) => (
              <GsapReveal key={cohort.title} direction="up" delay={0.1 + idx * 0.1}>
                <div className="group">
                  <div className="inline-block bg-[#FF6417] px-3 py-1 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-2.5 shadow-sm">
                    {cohort.title}
                  </div>
                  <p className="text-white/80 font-light text-sm sm:text-[15px] md:text-base leading-relaxed max-w-md">
                    {cohort.description}
                  </p>
                </div>
              </GsapReveal>
            ))}
          </div>

        </div>

      </div>

      {/* Seamless Fade: Softly decrease opacity on the final 3rd of the winish background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-44 sm:h-60 md:h-72 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.12) 35%, rgba(255, 255, 255, 0.35) 70%, rgba(255, 255, 255, 0.55) 100%)"
        }}
        aria-hidden="true"
      />
    </section>
  );
}
