"use client";

import { useState } from "react";
import {
  Mic,
  Flame,
  UsersRound,
  Wine,
  Handshake,
  BriefcaseBusiness,
  Check,
  Send,
  Loader2,
  Clock,
} from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

const SCHEDULE_BLOCKS = [
  {
    icon: Mic,
    title: "Keynote Addresses & Strategic Panels",
    time: "Morning Focus",
    description:
      "Visionary opening addresses and high-level plenary panels dissecting global capital flows, cross-border African ventures, and regional economic convergence.",
  },
  {
    icon: Flame,
    title: "Fireside Chats",
    time: "Midday Exchange",
    description:
      "Unfiltered, intimate dialogues with frontier operators, unicorn founders, and veteran institutional investors sharing battle-tested tactics.",
  },
  {
    icon: UsersRound,
    title: "Audience Engagement Sessions",
    time: "Interactive Masterclasses",
    description:
      "Curated breakout discussions, open-floor Q&A sessions, and collaborative problem-solving circles breaking down barriers between stage and audience.",
  },
  {
    icon: Handshake,
    title: "Partnership Announcements",
    time: "Afternoon Landmark",
    description:
      "Live cross-border commercial pacts, ecosystem commitments, and public-private partnership unveilings driving tangible investment into West Africa.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Investor Dealroom",
    time: "Curated Closed Session • VIP Access",
    isDealroom: true,
    description:
      "A closed, curated session where investor and founder conversations continue one on one. Dedicated deal-making tables connecting vetted founders directly with allocators.",
  },
  {
    icon: Wine,
    title: "Executive Networking Reception",
    time: "Evening Twilight Mixer",
    description:
      "An upscale cocktail evening with live music and curated hors d'oeuvres where summit conversations translate into enduring partnerships and closed deals.",
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
    } catch (err) {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="programme" className="py-24 sm:py-32 bg-[#4A040A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="up">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FF6417] uppercase block mb-3">
              One Immersive Day • Dec 23, 2026
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              What your day <span className="text-[#FF6417]">looks like.</span>
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="mt-4 text-lg text-white/80 font-light">
              A meticulously choreographed schedule designed to maximize high-value serendipity, actionable insights, and structured deal flow.
            </p>
          </GsapReveal>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SCHEDULE_BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            return (
              <GsapReveal key={block.title} direction="up" delay={idx * 0.08}>
                <div
                  className={`h-full p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    block.isDealroom
                      ? "bg-gradient-to-br from-[#FF6417]/25 via-[#62060E] to-[#3B0207] border-[#FF6417] shadow-xl shadow-[#FF6417]/20"
                      : "bg-[#62060E]/80 border-white/10 hover:border-[#FF6417]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          block.isDealroom
                            ? "bg-[#FF6417] text-white shadow-lg shadow-[#FF6417]/30"
                            : "bg-white/10 text-[#FF6417]"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                        <Clock className="w-3 h-3 text-[#FF6417]" />
                        <span>{block.time}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                      {block.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed font-light">
                      {block.description}
                    </p>
                  </div>

                  {block.isDealroom && (
                    <div className="mt-6 pt-4 border-t border-[#FF6417]/30 text-xs font-bold text-[#FF6417] flex items-center justify-between">
                      <span>Exclusive to VIP Ticket Holders</span>
                      <span className="underline">Limited capacity</span>
                    </div>
                  )}
                </div>
              </GsapReveal>
            );
          })}
        </div>

        {/* Full Schedule Notify Form */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#62060E] to-[#3B0207] border border-[#FF6417]/30 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6417]/10 blur-[80px] rounded-full pointer-events-none" />

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Be first to see the full schedule.
            </h3>
            <p className="text-sm sm:text-base text-white/80 mb-8 max-w-xl mx-auto">
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
                  className="px-7 py-3.5 rounded-full bg-[#E65100] hover:bg-[#FF6417] text-white font-bold text-sm shadow-lg shadow-[#E65100]/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
