"use client";

import { useState } from "react";
import { Plus, ArrowUpRight, Check } from "lucide-react";
import GsapReveal from "../motion/GsapReveal";

const FAQS = [
  {
    question: "What is ACE GLOBAL SUMMIT?",
    answer:
      "A one-day summit in Accra bringing together creatives, professionals, founders, investors and the diaspora for conversations, ideas and connection. The inaugural edition is on December 23, 2026 at the Accra Marriott Hotel.",
  },
  {
    question: "Do I need to be an investor or founder to attend?",
    answer:
      "No. The summit is open to anyone who wants to learn, connect and be part of the conversation — creatives, professionals, returning diaspora, and operators across all sectors.",
  },
  {
    question: "Is the General ticket a reduced experience?",
    answer:
      "No. General gives you the full main programme, including all keynote addresses, strategic panels, fireside chats, audience engagement sessions, and the evening networking reception. VIP adds access to the closed Investor Dealroom.",
  },
  {
    question: "What is the Investor Dealroom?",
    answer:
      "A closed, curated session for investor and founder conversations. It is built for deal-making, not just discussion, connecting vetted ventures directly with allocators. It is available to VIP ticket holders only.",
  },
  {
    question: "Can I enter the Dealroom with a General ticket?",
    answer:
      "No. The Dealroom is strictly restricted to VIP ticket holders due to curated table capacity.",
  },
  {
    question: "How do group tickets work?",
    answer:
      "One purchase covers three attendees at a lower per-person price ($133.33/person for General, $156.67/person for VIP). You enter the names and email addresses of all three attendees during checkout, and individual tickets and QR check-in passes are issued directly to each person.",
  },
  {
    question: "How do I pay?",
    answer:
      "Securely through Paystack. You can pay using international and local credit/debit cards (Visa, Mastercard, Amex), Mobile Money (MTN, Telecel, AT), and direct bank transfers.",
  },
  {
    question: "What currency are prices in?",
    answer:
      "All ticket prices are listed in USD ($). If your card or bank account is in Ghanaian Cedis (GHS), GBP, EUR, or NGN, Paystack handles the currency conversion automatically at the transparent live bank exchange rate.",
  },
  {
    question: "What is the refund and transfer policy?",
    answer:
      "Tickets are non-refundable. However, ticket transfers to a colleague, co-founder, or friend are permitted up to 7 days before the event. To transfer a ticket, contact our team at info@reinventaf.com.",
  },
  {
    question: "What should I know about travel and visas for Ghana?",
    answer:
      "International attendees traveling to Ghana require a valid passport with at least 6 months validity. Ghana typically issues visa-on-arrival facilities during the 'December in GH' period. We encourage attendees to verify travel requirements with Ghana Immigration Service or their local embassy.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FAF7F5] text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: sticky heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <GsapReveal direction="up">
              <h2
                className="font-court font-normal text-[#62060E] tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "'ModeCourt', sans-serif" }}
              >
                Questions,
                <br />
                <span className="text-[#FF6417]">answered.</span>
              </h2>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.1}>
              <p className="mt-6 max-w-sm text-base sm:text-lg text-gray-600">
                Everything you need to know about attending ACE GLOBAL SUMMIT.
              </p>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.2}>
              <form onSubmit={sendMessage} className="mt-10 rounded-3xl bg-[#62060E] p-6 sm:p-7 text-white">
                <p className="text-sm text-white/70">Still have a question or need group booking help?</p>
                {status === "sent" ? (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 text-sm">
                    <Check className="h-5 w-5 text-[#FF6417]" />
                    Thanks, we&apos;ll get back to you at {email}.
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="mt-5 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-[#FF6417]"
                    />
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="mt-3 w-full resize-none rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-[#FF6417]"
                    />
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="text-xs text-white/60">
                        {status === "error" ? (
                          <span className="text-[#FF7B39]">Couldn&apos;t send. Try again.</span>
                        ) : (
                          <>or email <a href="mailto:info@reinventaf.com" className="underline hover:text-white">info@reinventaf.com</a></>
                        )}
                      </span>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#FF6417] pl-5 pr-1.5 py-1.5 text-sm font-semibold hover:bg-[#FF7B39] transition-colors disabled:opacity-60"
                      >
                        {status === "sending" ? "Sending..." : "Send"}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </form>
            </GsapReveal>
          </div>
        </div>

        {/* Right: numbered accordion */}
        <div className="lg:col-span-7 border-t border-[#62060E]/15">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <GsapReveal key={faq.question} direction="up" delay={idx * 0.03}>
                <div className="border-b border-[#62060E]/15">
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="group w-full py-6 sm:py-7 text-left flex items-start gap-5 sm:gap-8 focus:outline-none"
                  >
                    <span
                      className={`pt-1 text-xs font-semibold tabular-nums tracking-widest transition-colors ${
                        isOpen ? "text-[#FF6417]" : "text-gray-400"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg sm:text-xl font-semibold text-[#62060E] group-hover:text-[#7D0A13]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "bg-[#FF6417] border-[#FF6417] text-white rotate-45"
                          : "border-[#62060E]/25 text-[#62060E] group-hover:border-[#62060E]"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pl-10 sm:pl-14 pr-14 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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
