"use client";

import { useState } from "react";
import { Check, Shield, Users, CreditCard } from "lucide-react";
import { SUMMIT_TICKETS } from "@/lib/data/tickets";
import { TicketProduct } from "@/lib/types";
import GsapReveal from "../motion/GsapReveal";

interface TicketsSectionProps {
  onSelectTicket: (ticket: TicketProduct) => void;
}

export default function TicketsSection({ onSelectTicket }: TicketsSectionProps) {
  const [purchaseType, setPurchaseType] = useState<"individual" | "group">("individual");

  const visibleTickets = SUMMIT_TICKETS.filter((t) => t.purchaseType === purchaseType);

  return (
    <section id="tickets" className="py-24 sm:py-32 bg-[#FAF7F5] text-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <GsapReveal direction="down">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
              Passes & Registration
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-court text-[#62060E] tracking-tight leading-[1.12] mb-4" style={{ fontFamily: "'ModeCourt', sans-serif" }}>
              Choose your <span className="text-[#FF6417]">experience.</span>
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-gray-600 font-normal">
              Full access to plenary sessions, deal rooms, and evening networking at the Accra Marriott Hotel.
            </p>
          </GsapReveal>
        </div>

        {/* Toggle: Individual | Group of 3 */}
        <GsapReveal direction="up" delay={0.25}>
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 rounded-full bg-gray-200/80 border border-gray-300">
              <button
                onClick={() => setPurchaseType("individual")}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  purchaseType === "individual"
                    ? "bg-[#62060E] text-white shadow-md shadow-[#62060E]/25"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Individual</span>
              </button>
              <button
                onClick={() => setPurchaseType("group")}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  purchaseType === "group"
                    ? "bg-[#62060E] text-white shadow-md shadow-[#62060E]/25"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Group of 3</span>
                <span className="text-[10px] bg-[#FF6417] text-white px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">
                  Save up to $50
                </span>
              </button>
            </div>
          </div>
        </GsapReveal>

        {/* Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
          {visibleTickets.map((ticket, idx) => {
            const isVip = ticket.tier === "vip";
            return (
              <GsapReveal key={ticket.id} direction="up" delay={idx * 0.15}>
                <div
                  className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between h-full ${
                    isVip
                      ? "bg-gradient-to-b from-[#62060E] to-[#3B0207] text-white border-2 border-[#FF6417] shadow-2xl shadow-[#62060E]/30"
                      : "bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
                  }`}
                >
                  {/* Popular / VIP Badge */}
                  {ticket.isPopular && (
                    <div className="absolute -top-3.5 right-8">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#FF6417] to-[#E65100] text-white shadow-md border border-white/20">
                        <span>Recommended</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-2xl font-black ${
                          isVip ? "text-white" : "text-[#62060E]"
                        }`}
                      >
                        {ticket.name}
                      </h3>
                      {ticket.purchaseType === "group" && (
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isVip
                              ? "bg-white/10 text-white/90"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          3 Attendees
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm mb-6 ${
                        isVip ? "text-white/80 font-light" : "text-gray-600 font-normal"
                      }`}
                    >
                      {ticket.description}
                    </p>

                    {/* Pricing Display */}
                    <div
                      className={`mb-6 pb-6 border-b ${
                        isVip ? "border-white/15" : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-baseline space-x-2">
                        <span
                          className={`text-4xl sm:text-5xl font-black ${
                            isVip ? "text-white" : "text-gray-900"
                          }`}
                        >
                          ${ticket.priceUSD}
                        </span>
                        <span
                          className={`text-xs sm:text-sm ${
                            isVip ? "text-white/60" : "text-gray-500"
                          }`}
                        >
                          {ticket.purchaseType === "group" ? "total for 3 tickets" : "per person"}
                        </span>
                      </div>

                      {ticket.purchaseType === "group" && (
                        <div className="mt-2 text-xs font-semibold text-[#E65100]">
                          ${ticket.perPersonUSD.toFixed(2)} per person. {ticket.savingsText}
                        </div>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="space-y-3.5 mb-8">
                      <p
                        className={`text-xs uppercase font-bold tracking-wider ${
                          isVip ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        Inclusions
                      </p>
                      {ticket.features.map((feat) => (
                        <div
                          key={feat}
                          className={`flex items-start space-x-3 text-sm ${
                            isVip ? "text-white/95" : "text-gray-700"
                          }`}
                        >
                          <div
                            className={`p-1 rounded-full mt-0.5 shrink-0 ${
                              isVip ? "bg-[#FF6417] text-white" : "bg-[#FF6417]/15 text-[#E65100]"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secure Seat Button */}
                  <div>
                    <button
                      onClick={() => onSelectTicket(ticket)}
                      className={`w-full py-4 rounded-full font-extrabold text-sm sm:text-base transition-all duration-200 flex items-center justify-center ${
                        isVip
                          ? "bg-gradient-to-r from-[#FF6417] to-[#E65100] hover:from-[#FF7B39] hover:to-[#FF6417] text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-[#62060E] hover:bg-[#7D0A13] text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                    >
                      <span>{ticket.purchaseType === "group" ? "Secure 3 seats" : "Secure my seat"}</span>
                    </button>
                  </div>
                </div>
              </GsapReveal>
            );
          })}
        </div>

        {/* Trust & Paystack banner under cards */}
        <GsapReveal direction="up" delay={0.4}>
          <div className="mt-12 text-center text-xs sm:text-sm text-gray-600 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#FF6417]" />
              <span className="font-medium">Secure payment by Paystack</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-[#FF6417]" />
              <span>Cards, Mobile Money & Bank Transfers accepted</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>Your instant confirmation and digital ticket is sent to your email.</span>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
