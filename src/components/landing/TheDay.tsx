"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Check, ArrowRight, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapReveal from "../motion/GsapReveal";

const SCHEDULE_BLOCKS = [
  {
    num: "01",
    phase: "Morning",
    start: "09:00",
    end: "11:30",
    title: "Keynote Addresses & Strategic Panels",
    description:
      "Visionary opening addresses and high-level plenary panels dissecting global capital flows, cross-border African ventures, and regional economic convergence.",
  },
  {
    num: "02",
    phase: "Midday",
    start: "11:45",
    end: "13:15",
    title: "Fireside Chats",
    description:
      "Unfiltered, intimate dialogues with frontier operators, unicorn founders, and veteran institutional investors sharing battle-tested tactics.",
  },
  {
    num: "03",
    phase: "Breakout",
    start: "14:00",
    end: "15:30",
    title: "Audience Engagement Sessions",
    description:
      "Curated breakout discussions, open-floor Q&A sessions, and collaborative problem-solving circles breaking down barriers between stage and audience.",
  },
  {
    num: "04",
    phase: "Afternoon",
    start: "15:45",
    end: "17:00",
    title: "Partnership Announcements",
    description:
      "Live cross-border commercial pacts, ecosystem commitments, and public-private partnership unveilings driving tangible investment into West Africa.",
  },
  {
    num: "05",
    phase: "Evening",
    start: "18:00",
    end: "21:30",
    title: "Executive Networking Reception",
    description:
      "An upscale cocktail evening with live music and curated hors d'oeuvres where summit conversations translate into enduring partnerships and closed deals.",
  },
];

const DAY_STATS = [
  { value: "12.5", label: "Hours" },
  { value: "05", label: "Sessions" },
  { value: "01", label: "Venue" },
];

export default function TheDay() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const listRef = useRef<HTMLOListElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);

  // Scroll-linked rail fill + node activation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const list = listRef.current;
    const fill = railFillRef.current;
    if (!list || !fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      list.querySelectorAll<HTMLLIElement>("li").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          toggleClass: { targets: item, className: "is-active" },
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interestType: "schedule" }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg("Failed to subscribe. Please try again.");
      }
    } catch {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Rendered in the sticky column on desktop and after the timeline on mobile
  const notifyForm = (
    <div className="rounded-2xl bg-[#62060E] p-6 sm:p-7 text-white relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#FF6417]/25 blur-3xl pointer-events-none" />
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-normal font-court text-white mb-2">
          Be first to see the full schedule.
        </h3>
        <p className="text-sm text-white/70 mb-5 font-light leading-relaxed">
          The session-by-session timetable and stage breakdowns drop ahead of the summit.
        </p>

        {submitted ? (
          <div className="flex items-start gap-3 text-sm text-white">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FF6417] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </span>
            <span>You&apos;re on the list. We&apos;ll email you the moment it goes live.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 p-1.5 focus-within:border-[#FF6417] transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              aria-label="Email address"
              className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Notify me"
              className="shrink-0 h-10 px-5 rounded-full bg-[#FF6417] hover:bg-[#FF7B39] text-white text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Notify me</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {errorMsg && <p className="text-xs text-rose-300 mt-3">{errorMsg}</p>}
      </div>
    </div>
  );

  return (
    <section id="programme" className="py-24 sm:py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-20">
          {/* Left: sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <GsapReveal direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.05]">
                What your day <span className="text-[#FF6417]">looks like.</span>
              </h2>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.2}>
              <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-md">
                A meticulously choreographed schedule designed to maximize high-value serendipity, actionable insights, and structured deal flow.
              </p>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.25}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-gray-200">
                {DAY_STATS.map((stat) => (
                  <div key={stat.label} className="py-5 px-4 first:pl-0 flex flex-col-reverse">
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mt-2">
                      {stat.label}
                    </dt>
                    <dd className="text-3xl sm:text-4xl font-court text-[#62060E] leading-none">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[#E65100]" />
                Accra Marriott Hotel, Airport City
              </p>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.3} className="hidden lg:block mt-10">
              {notifyForm}
            </GsapReveal>
          </div>

          {/* Right: timeline */}
          <div>
            <ol ref={listRef} className="relative">
              {/* Rail (aligned to node column centre) */}
              <span
                aria-hidden
                className="absolute top-3 bottom-3 left-[9.5px] sm:left-[141.5px] w-px bg-gray-200"
              />
              <span
                ref={railFillRef}
                aria-hidden
                className="absolute top-3 bottom-3 left-[9.5px] sm:left-[141.5px] w-px bg-gradient-to-b from-[#FF6417] to-[#62060E] origin-top scale-y-0"
              />

              {SCHEDULE_BLOCKS.map((block) => (
                <li
                  key={block.num}
                  className="group relative grid grid-cols-[20px_minmax(0,1fr)] sm:grid-cols-[100px_20px_minmax(0,1fr)] gap-x-5 sm:gap-x-8 pb-12 sm:pb-14 last:pb-0"
                >
                  {/* Time (desktop) */}
                  <div className="hidden sm:block text-right pt-0.5">
                    <div className="text-2xl font-court text-[#62060E] leading-none tabular-nums">
                      {block.start}
                    </div>
                    <div className="mt-1.5 text-xs text-gray-400 tabular-nums">
                      to {block.end}
                    </div>
                  </div>

                  {/* Node */}
                  <div className="relative flex justify-center pt-1.5">
                    <span className="relative z-10 w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-colors duration-500 group-[.is-active]:border-[#FF6417]">
                      <span className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-500 group-[.is-active]:bg-[#FF6417] group-[.is-active]:scale-125" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="rounded-2xl -mt-3 p-4 sm:p-6 -ml-4 sm:-ml-6 transition-colors duration-300 group-hover:bg-[#FFF6F1]">
                    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em]">
                      <span className="text-[#E65100]">{block.num}</span>
                      <span className="text-gray-500">{block.phase}</span>
                      <span className="sm:hidden ml-auto text-gray-500 normal-case tracking-normal font-semibold tabular-nums">
                        {block.start} – {block.end}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-normal font-court text-gray-900 tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#62060E]">
                      {block.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                      {block.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <GsapReveal direction="up" className="lg:hidden mt-14">
              {notifyForm}
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
