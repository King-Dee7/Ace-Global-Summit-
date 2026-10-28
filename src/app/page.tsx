"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import OneDay from "@/components/landing/OneDay";
import WhosInTheRoom from "@/components/landing/WhosInTheRoom";
import FourPillars from "@/components/landing/FourPillars";
import TheDay from "@/components/landing/TheDay";
import Speakers from "@/components/landing/Speakers";
import TicketsSection from "@/components/landing/TicketsSection";
import Partners from "@/components/landing/Partners";
import TrackRecord from "@/components/landing/TrackRecord";
import Venue from "@/components/landing/Venue";
import FaqSection from "@/components/landing/FaqSection";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import { SUMMIT_TICKETS } from "@/lib/data/tickets";
import { TicketProduct } from "@/lib/types";

export default function HomePage() {
  const [selectedTicket, setSelectedTicket] = useState<TicketProduct | null>(null);

  // When general "Secure my seat" button is clicked, scroll to tickets or select default VIP
  const handleSecureSeat = () => {
    const el = document.getElementById("tickets");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelectedTicket(SUMMIT_TICKETS[1]); // Default to VIP
    }
  };

  return (
    <main className="min-h-screen bg-[#62060E] text-white selection:bg-[#FF6417] selection:text-white relative overflow-x-clip">
      {/* Sticky Navigation Bar */}
      <Navbar onSecureSeatClick={handleSecureSeat} />

      {/* 1. Hero */}
      <Hero onSecureSeatClick={handleSecureSeat} />

      {/* 2. One Day */}
      <OneDay />

      {/* 3. Who's in the Room */}
      <WhosInTheRoom />

      {/* 4. Four Pillars */}
      <FourPillars onSecureSeatClick={handleSecureSeat} />

      {/* 5. The Day (Schedule & Interest Form) */}
      <TheDay />

      {/* 6. Speakers */}
      <Speakers />

      {/* 7. Partners */}
      <Partners />

      {/* 8. Track Record */}
      <TrackRecord />

      {/* 9. Venue (Accra Marriott Hotel) */}
      <Venue />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. Tickets (Individual & Group of 3 with Paystack) */}
      <TicketsSection onSelectTicket={(ticket) => setSelectedTicket(ticket)} />

      {/* 12. Final Call to Action */}
      <FinalCta onSecureSeatClick={handleSecureSeat} />

      {/* Footer */}
      <Footer />

      {/* Paystack Checkout Modal */}
      {selectedTicket && (
        <CheckoutModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </main>
  );
}
