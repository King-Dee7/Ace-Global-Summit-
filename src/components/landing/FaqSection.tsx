"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";
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

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FAF7F5] text-gray-900 relative border-t border-gray-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <GsapReveal direction="down">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#E65100] uppercase block mb-3">
              Clear Answers
            </span>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-black text-[#62060E] tracking-tight leading-tight mb-4">
              Frequently Asked <span className="text-[#FF6417]">Questions</span>
            </h2>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-gray-600 font-normal">
              Everything you need to know about attending ACE GLOBAL SUMMIT.
            </p>
          </GsapReveal>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <GsapReveal key={faq.question} direction="up" delay={idx * 0.04}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#FF6417] shadow-md"
                      : "bg-white border-gray-200/80 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#62060E] flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-[#FF6417] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF6417] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </GsapReveal>
            );
          })}
        </div>

        {/* Contact Email Callout */}
        <GsapReveal direction="up" delay={0.3}>
          <div className="mt-14 text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-sm text-gray-600 font-medium">
              Still have a question or need group booking assistance?
            </span>
            <a
              href="mailto:info@reinventaf.com"
              className="inline-flex items-center space-x-2 text-sm font-bold text-[#62060E] hover:text-[#FF6417]"
            >
              <Mail className="w-4 h-4 text-[#FF6417]" />
              <span>info@reinventaf.com</span>
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
