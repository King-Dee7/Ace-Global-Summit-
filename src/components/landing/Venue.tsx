"use client";

import { MapPin, Navigation, Plane, Hotel, ExternalLink, ShieldCheck } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

export default function Venue() {
  return (
    <section id="venue" className="py-24 sm:py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <GsapReveal direction="down">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
              Summit Destination
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.12]" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
              Accra Marriott Hotel
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal">
              Host venue for ACE GLOBAL SUMMIT on December 23, 2026. Premium 5-star hospitality in the heart of Airport City.
            </p>
          </GsapReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Venue Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <GsapReveal direction="right" delay={0.1}>
              <div className="p-8 rounded-3xl bg-[#FAF7F5] border border-gray-200/90 shadow-sm space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#62060E] flex items-center justify-center text-[#FF6417] shadow-sm shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#62060E] mb-1">Location & Address</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Liberation Road, Airport City, Accra, Ghana
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-[#E65100]">
                      Greater Accra Region • Postal: GA-157
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200/80 flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#62060E] flex items-center justify-center text-[#FF6417] shadow-sm shrink-0">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#62060E] mb-1">Airport Proximity</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Less than 5 minutes drive from Kotoka International Airport (ACC). Free airport shuttle for hotel guests.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200/80 flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#62060E] flex items-center justify-center text-[#FF6417] shadow-sm shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#62060E] mb-1">Executive Security & Parking</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      24/7 dedicated hotel security, valet parking, and executive VIP drop-off zone.
                    </p>
                  </div>
                </div>
              </div>
            </GsapReveal>

            <GsapReveal direction="right" delay={0.25}>
              <a
                href="https://maps.google.com/?q=Accra+Marriott+Hotel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-[#62060E] hover:bg-[#7D0A13] text-white font-bold text-sm shadow-lg shadow-[#62060E]/20 transition-all flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4 text-[#FF6417]" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </a>
            </GsapReveal>
          </div>

          {/* Interactive Visual & Venue Feature Representation */}
          <div className="lg:col-span-7">
            <GsapReveal direction="left" delay={0.2} className="h-full">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-full min-h-[380px] bg-[#3B0207] flex flex-col justify-between p-8 sm:p-10 shadow-xl text-white">
                {/* Background hotel photo impression / styling */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#250104] via-[#4A040A]/85 to-transparent" />

                <div className="relative z-10">
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-white backdrop-blur-md mb-4 border border-white/20">
                    <Hotel className="w-3.5 h-3.5 text-[#FF6417]" />
                    <span>5-Star Conference Centre</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-normal font-court text-white" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
                    Grand Ballroom & Dealroom Suites
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mt-2 font-light">
                    Engineered for high-bandwidth international connectivity, executive acoustics, and curated deal conversations.
                  </p>
                </div>

                <div className="relative z-10 pt-8 mt-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
                    <div className="text-xs text-white/60">Event Date</div>
                    <div className="text-sm font-bold text-white">Dec 23, 2026</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
                    <div className="text-xs text-white/60">Doors Open</div>
                    <div className="text-sm font-bold text-white">08:00 AM GMT</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xs text-white/60">Dress Code</div>
                    <div className="text-sm font-bold text-[#FF6417]">Business / Modern African</div>
                  </div>
                </div>
              </div>
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
