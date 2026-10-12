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
  },
  {
    icon: Rocket,
    title: "Founders and SME owners",
    subtitle: "Scale ventures across borders",
    description: "Share ideas, find collaborators and learn from people a step ahead.",
    tags: ["High-Growth Startups", "SME Operators", "Tech Innovators", "Regional Scale-ups"],
  },
  {
    icon: Compass,
    title: "The diaspora",
    subtitle: "Connect with the future of home",
    description: "Reconnect with home through the people shaping what comes next.",
    tags: ["Returning Professionals", "Diaspora Angels", "Global Operators", "Cultural Navigators"],
  },
  {
    icon: TrendingUp,
    title: "Investors and fund managers",
    subtitle: "Deploy capital into real traction",
    description: "Meet the ventures and leaders worth backing.",
    tags: ["Venture Capitalists", "Private Equity", "Family Offices", "Angel Syndicates"],
  },
];

export default function WhosInTheRoom() {
  return (
    <section id="attend" className="py-24 sm:py-32 bg-[#FAF7F5] text-gray-900 relative border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="up">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
              Who’s in the Room
            </span>
          </GsapReveal>

          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#62060E] tracking-tight leading-tight">
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
                <div className="h-full rounded-3xl p-8 sm:p-10 bg-white border border-gray-200/90 hover:border-[#FF6417] transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#62060E]/5 border border-[#62060E]/15 flex items-center justify-center text-[#62060E] group-hover:bg-[#FF6417] group-hover:text-white group-hover:border-[#FF6417] transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                        Cohort 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#62060E] mb-2 group-hover:text-[#E65100] transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#E65100] mb-3">
                      {group.subtitle}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">
                      {group.description}
                    </p>
                  </div>

                  {/* Representative profiles / tags */}
                  <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1.5 text-xs text-gray-700 bg-[#FAF7F5] px-3 py-1.5 rounded-full border border-gray-200"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF6417]" />
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
