"use client";

import { Palette, Rocket, Compass, TrendingUp, CheckCircle } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

const ATTENDEE_GROUPS = [
  {
    icon: Palette,
    title: "Creatives and professionals",
    subtitle: "Turn talent into industry",
    description: "Meet the people who turn talent into a career and a business.",
    tags: ["Designers & Media", "Cultural Curators", "Executive Talent", "Agency Heads"],
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Rocket,
    title: "Founders and SME owners",
    subtitle: "Scale ventures across borders",
    description: "Share ideas, find collaborators and learn from people a step ahead.",
    tags: ["High-Growth Startups", "SME Operators", "Tech Innovators", "Regional Scale-ups"],
    accent: "from-orange-500/20 to-red-500/10",
  },
  {
    icon: Compass,
    title: "The diaspora",
    subtitle: "Connect with the future of home",
    description: "Reconnect with home through the people shaping what comes next.",
    tags: ["Returning Professionals", "Diaspora Angels", "Global Operators", "Cultural Navigators"],
    accent: "from-rose-500/20 to-orange-500/10",
  },
  {
    icon: TrendingUp,
    title: "Investors and fund managers",
    subtitle: "Deploy capital into real traction",
    description: "Meet the ventures and leaders worth backing.",
    tags: ["Venture Capitalists", "Private Equity", "Family Offices", "Angel Syndicates"],
    accent: "from-emerald-500/20 to-orange-500/10",
  },
];

export default function WhosInTheRoom() {
  return (
    <section id="attend" className="py-24 sm:py-32 bg-[#4A040A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="up">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FF6417] uppercase block mb-3">
              Who’s in the Room
            </span>
          </GsapReveal>

          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              If you build it, create it, fund it or come home to it,{" "}
              <span className="text-[#FF6417]">there is a seat for you.</span>
            </h2>
          </GsapReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ATTENDEE_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <GsapReveal key={group.title} direction="up" delay={idx * 0.1}>
                <div className="h-full rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#62060E] to-[#3B0207] border border-[#FF6417]/20 hover:border-[#FF6417]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6417]/15 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#FF6417]/15 border border-[#FF6417]/30 flex items-center justify-center text-[#FF6417] group-hover:scale-110 group-hover:bg-[#FF6417] group-hover:text-white transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">
                        Segment 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FF6417] transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#FF6417]/90 mb-4">
                      {group.subtitle}
                    </p>
                    <p className="text-base text-white/80 leading-relaxed mb-6 font-light">
                      {group.description}
                    </p>
                  </div>

                  {/* Representative profiles / tags */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1.5 text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                      >
                        <CheckCircle className="w-3 h-3 text-[#FF6417]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </GsapReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
