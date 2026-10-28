"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";
import { SPEAKERS } from "@/lib/data/speakers";

export default function Speakers() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SPEAKERS.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  const current = SPEAKERS[active];
  const advance = () => setActive((i) => (i + 1) % SPEAKERS.length);
  const goBack = () => setActive((i) => (i - 1 + SPEAKERS.length) % SPEAKERS.length);

  // Auto-advance timer bar
  const progress = (className: string) => (
    <span
      key={active}
      onAnimationEnd={advance}
      className={`absolute bg-[#FF6417] origin-left animate-progress motion-reduce:animate-none motion-reduce:scale-x-100 ${className}`}
      style={{ animationPlayState: paused ? "paused" : "running" }}
    />
  );

  return (
    <section id="speakers" className="relative overflow-hidden bg-[#1C0104] text-white py-24 sm:py-32">
      {/* Ambient backdrop: blurred active speaker */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {SPEAKERS.map((s, i) => (
          <Image
            key={i}
            src={s.image}
            alt=""
            fill
            sizes="50vw"
            className={`object-cover object-top scale-125 blur-3xl transition-opacity duration-1000 ${
              i === active ? "opacity-25" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C0104] via-[#1C0104]/85 to-[#1C0104]/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1C0104] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-x-20 gap-y-10 lg:gap-y-10 lg:items-center lg:min-h-[min(640px,calc(100vh-160px))] lg:content-center">
          {/* Headline */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <GsapReveal direction="up">
              <h2 className="text-5xl sm:text-6xl font-normal font-court tracking-tight leading-[1.02]">
                Hear from the voices <span className="text-[#FF6417]">shaping what&apos;s next.</span>
              </h2>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.1}>
              <p className="mt-5 text-base text-white/65 leading-relaxed max-w-md">
                Founders, creators and cultural icons take the stage in Accra on December 23. More names are revealed from November.
              </p>
            </GsapReveal>
          </div>

          {/* Featured speaker (spans both rows on desktop so it sits beside the list) */}
          <GsapReveal direction="up" delay={0.15} className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch">
            <div
              className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[480px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Speaker: bleeds past the bottom and fades out */}
              <div
                className="absolute -top-[8%] -bottom-[10%] -inset-x-[14%] pointer-events-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
              >
                {SPEAKERS.map((s, i) => (
                  <Image
                    key={i}
                    src={s.image}
                    alt={s.name}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-contain object-top origin-top transition-all duration-700 ease-out ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transform: `scale(${(s.scale ?? 1) * (i === active ? 1 : 1.03)})` }}
                  />
                ))}
              </div>

              <div
                key={active}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-center animate-fadeUp [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]"
              >
                <h3 className="text-3xl sm:text-4xl font-normal font-court">{current.name}</h3>
                <p className="mt-2 text-sm text-white/75">{current.role}</p>
              </div>

              {/* Prev / next arrows */}
              {[
                { label: "Previous speaker", onClick: goBack, Icon: ArrowLeft, side: "left-0 sm:left-2" },
                { label: "Next speaker", onClick: advance, Icon: ArrowRight, side: "right-0 sm:right-2" },
              ].map(({ label, onClick, Icon, side }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  aria-label={label}
                  className={`absolute top-1/2 -translate-y-1/2 ${side} z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-[#FF6417] hover:border-[#FF6417] hover:text-white`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </GsapReveal>

          {/* Speaker index + CTA */}
          <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-start">
              <div className="max-w-md">
                <div className="flex items-baseline gap-2 font-court leading-none">
                  <span className="text-6xl text-white tabular-nums">{pad(active + 1)}</span>
                  <span className="text-2xl text-white/30 tabular-nums">/ {pad(total)}</span>
                </div>
                <div key={active} className="mt-6 animate-fadeUp">
                  <div className="text-2xl sm:text-3xl font-court">{current.name}</div>
                  <div className="mt-1 text-sm text-white/50">{current.role}</div>
                </div>
                <div className="mt-8 flex gap-1.5">
                  {SPEAKERS.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${s.name}`}
                      aria-pressed={i === active}
                      className="group flex-1 py-3"
                    >
                      <span className="relative block h-[3px] rounded-full overflow-hidden bg-white/15 group-hover:bg-white/30 transition-colors">
                        {i < active && <span className="absolute inset-0 bg-white/60" />}
                        {i === active && progress("inset-0")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            <a
              href="#tickets"
              className="group mt-8 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 py-2 pl-6 pr-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-[#FF6417] hover:bg-[#FF6417]/10"
            >
              Get my pass
              <span className="w-9 h-9 rounded-full bg-[#FF6417] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
