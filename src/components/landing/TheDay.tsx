"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Check,
  Send,
  Loader2,
} from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

const SCHEDULE_BLOCKS = [
  {
    num: "01",
    pill: "Morning",
    timeOfDay: "Morning Focus",
    date: "Dec 23, 2026",
    title: "Keynote Addresses & Strategic Panels",
    venue: "Main Plenary Hall • Accra Marriott",
    timeRange: "09:00 AM – 11:30 AM",
    description:
      "Visionary opening addresses and high-level plenary panels dissecting global capital flows, cross-border African ventures, and regional economic convergence.",
    accent: {
      pillBg: "bg-[#2DD4BF]",
      pillText: "text-gray-950",
      border: "border-[#2DD4BF]",
      iconColor: "text-[#2DD4BF]",
    },
  },
  {
    num: "02",
    pill: "Midday",
    timeOfDay: "Midday Exchange",
    date: "Dec 23, 2026",
    title: "Fireside Chats",
    venue: "Executive Stage • Accra Marriott",
    timeRange: "11:45 AM – 01:15 PM",
    description:
      "Unfiltered, intimate dialogues with frontier operators, unicorn founders, and veteran institutional investors sharing battle-tested tactics.",
    accent: {
      pillBg: "bg-[#818CF8]",
      pillText: "text-gray-950",
      border: "border-[#818CF8]",
      iconColor: "text-[#818CF8]",
    },
  },
  {
    num: "03",
    pill: "Breakout",
    timeOfDay: "Interactive Masterclasses",
    date: "Dec 23, 2026",
    title: "Audience Engagement Sessions",
    venue: "Breakout Pavilions & Deal Tables",
    timeRange: "02:00 PM – 03:30 PM",
    description:
      "Curated breakout discussions, open-floor Q&A sessions, and collaborative problem-solving circles breaking down barriers between stage and audience.",
    accent: {
      pillBg: "bg-[#FB923C]",
      pillText: "text-gray-950",
      border: "border-[#FB923C]",
      iconColor: "text-[#FB923C]",
    },
  },
  {
    num: "04",
    pill: "Afternoon",
    timeOfDay: "Afternoon Landmark",
    date: "Dec 23, 2026",
    title: "Partnership Announcements",
    venue: "Main Stage & Press Gallery",
    timeRange: "03:45 PM – 05:00 PM",
    description:
      "Live cross-border commercial pacts, ecosystem commitments, and public-private partnership unveilings driving tangible investment into West Africa.",
    accent: {
      pillBg: "bg-[#F472B6]",
      pillText: "text-gray-950",
      border: "border-[#F472B6]",
      iconColor: "text-[#F472B6]",
    },
  },
  {
    num: "05",
    pill: "Evening",
    timeOfDay: "Evening Twilight Mixer",
    date: "Dec 23, 2026",
    title: "Executive Networking Reception",
    venue: "Poolside Terrace & Lounge • Accra Marriott",
    timeRange: "06:00 PM – 09:30 PM",
    description:
      "An upscale cocktail evening with live music and curated hors d'oeuvres where summit conversations translate into enduring partnerships and closed deals.",
    accent: {
      pillBg: "bg-[#38BDF8]",
      pillText: "text-gray-950",
      border: "border-[#38BDF8]",
      iconColor: "text-[#38BDF8]",
    },
  },
];

export default function TheDay() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <section id="programme" className="py-24 sm:py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="up">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
              One Immersive Day • Dec 23, 2026
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.12]" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
              What your day <span className="text-[#FF6417]">looks like.</span>
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="mt-4 text-lg text-gray-600 font-normal">
              A meticulously choreographed schedule designed to maximize high-value serendipity, actionable insights, and structured deal flow.
            </p>
          </GsapReveal>
        </div>

        {/* Day at a Glance Card Panel (Matching Inspo) */}
        <GsapReveal direction="up" delay={0.25}>
          <div className="max-w-4xl mx-auto rounded-3xl sm:rounded-[36px] bg-[#141416] border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl relative mb-20">
            {/* Header: Accent square + Title */}
            <div className="flex items-center gap-3 mb-8 sm:mb-10 pb-6 border-b border-white/10">
              <span className="w-3.5 h-3.5 bg-[#FF6417] rounded-sm inline-block shrink-0 shadow-sm shadow-[#FF6417]/50" />
              <h3
                className="text-2xl sm:text-3xl font-normal font-court text-white tracking-tight"
                style={{ fontFamily: "'ModeCourt', sans-serif" }}
              >
                Day at a glance
              </h3>
            </div>

            {/* Timeline Rows */}
            <div className="space-y-8 sm:space-y-10">
              {SCHEDULE_BLOCKS.map((block) => (
                <div
                  key={block.num}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  {/* Left Column: Pill + Big Number + Subtext */}
                  <div className="shrink-0 sm:w-44 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider ${block.accent.pillBg} ${block.accent.pillText}`}
                      >
                        {block.pill}
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
                        {block.num}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 font-medium">
                        {block.date}
                      </div>
                      <div className="text-[11px] text-[#FF6417] font-semibold tracking-wide uppercase mt-0.5">
                        {block.timeOfDay}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Left Accent Colored Border + Content */}
                  <div className={`flex-1 pl-4 sm:pl-6 border-l-2 ${block.accent.border}`}>
                    <h4
                      className="text-xl sm:text-2xl font-normal font-court text-white tracking-tight leading-snug mb-2"
                      style={{ fontFamily: "'ModeCourt', sans-serif" }}
                    >
                      {block.title}
                    </h4>

                    {/* Location & Time Metadata */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-gray-300 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className={`w-3.5 h-3.5 ${block.accent.iconColor}`} />
                        <span>{block.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${block.accent.iconColor}`} />
                        <span>{block.timeRange}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GsapReveal>

        {/* Full Schedule Notify Form */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 bg-[#62060E] border border-[#FF6417]/30 shadow-2xl relative overflow-hidden text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-normal font-court text-white mb-3" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
              Be first to see the full schedule.
            </h3>
            <p className="text-sm sm:text-base text-white/80 mb-8 max-w-xl mx-auto font-light">
              Our comprehensive session-by-session timetable and stage breakdowns will be released ahead of the summit.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-[#FF6417]/20 border border-[#FF6417]/50 text-white flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-[#FF6417]" />
                <span className="font-semibold text-sm sm:text-base">
                  You're on the list. We will email you the moment the schedule goes live.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FF6417] text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3.5 rounded-full bg-[#E65100] hover:bg-[#FF6417] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Notify me</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {errorMsg && <p className="text-xs text-rose-400 mt-3">{errorMsg}</p>}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
