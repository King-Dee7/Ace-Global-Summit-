"use client";

import { useState } from "react";
import { UserCheck, Check, Send, Loader2, Lock } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

const TEASER_PROFILES = [
  {
    role: "Managing Partner",
    org: "Pan-African Venture Fund ($120M AUM)",
    category: "Wealth & Investment",
    status: "Reveal Locked",
  },
  {
    role: "Founder & CEO",
    org: "Cross-Border Fintech Unicorn",
    category: "Emerging Tech",
    status: "Reveal Locked",
  },
  {
    role: "Global Creative Director",
    org: "International Media & Heritage Studio",
    category: "Creative Economy",
    status: "Reveal Locked",
  },
  {
    role: "Diaspora Principal",
    org: "London / New York Family Office",
    category: "Diaspora & Hospitality",
    status: "Reveal Locked",
  },
];

export default function Speakers() {
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
        body: JSON.stringify({ email, interestType: "speakers" }),
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
    <section id="speakers" className="py-24 sm:py-32 bg-[#62060E] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="up">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FF6417] uppercase block mb-3">
              World-Class Operators & Allocators
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Speakers
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="mt-4 text-lg text-white/80 font-light">
              The lineup is being finalised. Reveals begin November 2026.
            </p>
          </GsapReveal>
        </div>

        {/* Teaser speaker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TEASER_PROFILES.map((prof, idx) => (
            <GsapReveal key={prof.org} direction="up" delay={idx * 0.1}>
              <div className="rounded-3xl p-6 bg-white/5 border border-white/10 hover:border-[#FF6417]/40 transition-all duration-300 relative group text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#3B0207] to-[#800A13] border-2 border-[#FF6417]/30 flex items-center justify-center mb-6 relative overflow-hidden shadow-inner">
                  <UserCheck className="w-10 h-10 text-white/20" />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#FF6417]" />
                  </div>
                </div>

                <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6417] bg-[#FF6417]/10 px-3 py-1 rounded-full mb-3 border border-[#FF6417]/20">
                  {prof.category}
                </span>
                <h4 className="text-base font-bold text-white mb-1">{prof.role}</h4>
                <p className="text-xs text-white/70 mb-4 font-light">{prof.org}</p>

                <div className="mt-auto text-[11px] font-semibold text-white/50 tracking-wider">
                  {prof.status}
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>

        {/* Email Reveal notification box */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#4A040A] to-[#3B0207] border border-[#FF6417]/30 text-center shadow-xl">
            <div className="inline-flex items-center space-x-2 text-[#FF6417] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Priority Access</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Get the first names before anyone else.
            </h3>
            <p className="text-xs sm:text-sm text-white/75 mb-6 max-w-md mx-auto">
              Be the first to discover who will take the stage on December 23 at Accra Marriott Hotel.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-[#FF6417]/20 border border-[#FF6417]/50 text-white flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-[#FF6417]" />
                <span className="font-semibold text-sm sm:text-base">
                  You're on the list. We will email you as each speaker is revealed.
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
