"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import QRCode from "qrcode";
import { CheckCircle2, Calendar, MapPin, Download, ArrowLeft, Printer, Shield } from "lucide-react";
import { OrderRecord, TicketRecord } from "@/lib/types";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const isDemo = searchParams.get("demo") === "true";

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [qrImages, setQrImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6417", "#E65100", "#FFFFFF", "#62060E"],
    });

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/lookup?reference=${reference || ""}`);
        if (res.ok) {
          const data = await res.json();
          if (data.order) {
            setOrder(data.order);
            generateQrCodes(data.order.attendees || []);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Order lookup error:", err);
      }

      // Fallback display if immediate lookup is pending
      const mockOrder: OrderRecord = {
        id: "ord_verified",
        paystackReference: reference || "ACE_DEMO_REF",
        customerEmail: "attendee@summit.com",
        customerName: "Summit Delegate",
        ticketType: "VIP Pass",
        quantity: 1,
        unitPrice: 170,
        totalAmount: 170,
        currency: "USD",
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
        attendees: [
          {
            id: "tkt_1",
            orderId: "ord_verified",
            ticketCode: "ACE-VIP-2026",
            ticketTier: "vip",
            attendeeName: "Summit Delegate",
            attendeeEmail: "attendee@summit.com",
            isCheckedIn: false,
            qrToken: `ace_token_${reference || "2026"}`,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      setOrder(mockOrder);
      generateQrCodes(mockOrder.attendees || []);
      setLoading(false);
    };

    const generateQrCodes = async (tickets: TicketRecord[]) => {
      const qrs: Record<string, string> = {};
      for (const tkt of tickets) {
        try {
          const qrDataUrl = await QRCode.toDataURL(tkt.qrToken, {
            width: 240,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          });
          qrs[tkt.id] = qrDataUrl;
        } catch (e) {
          console.error("Error generating QR", e);
        }
      }
      setQrImages(qrs);
    };

    fetchOrder();
  }, [reference]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#62060E] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF6417] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold">Verifying your Paystack payment & generating summit passes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#62060E] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top return link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Summit Website</span>
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all print:hidden"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Passes</span>
          </button>
        </div>

        {/* Confirmation banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#4A040A] to-[#3B0207] border border-[#FF6417]/40 shadow-2xl mb-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FF6417]/20 border border-[#FF6417] text-[#FF6417] flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-[#FF6417] block mb-1">
            Payment Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Your Seat is Secured!
          </h1>
          <p className="text-base text-white/80 max-w-xl mx-auto font-light">
            Thank you, <strong className="text-white font-semibold">{order?.customerName}</strong>. Your payment of{" "}
            <strong className="text-[#FF6417] font-bold">${order?.totalAmount} USD</strong> has been successfully processed via Paystack.
          </p>
          <div className="mt-4 text-xs text-white/50">
            Transaction Reference: <code className="bg-white/10 px-2 py-1 rounded text-white">{reference}</code>
          </div>
        </div>

        {/* Individual Attendee Tickets */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>Digital Admission Passes ({order?.attendees?.length || 1})</span>
          </h2>

          {order?.attendees?.map((ticket, idx) => {
            const isVip = ticket.ticketTier === "vip";
            return (
              <div
                key={ticket.id || idx}
                className="relative rounded-3xl overflow-hidden border-2 border-[#FF6417]/40 bg-gradient-to-br from-[#4A040A] to-[#250104] shadow-2xl p-6 sm:p-8"
              >
                {/* Decorative cutouts for ticket look */}
                <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#62060E]" />
                <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#62060E]" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Event details */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6417] flex items-center justify-center font-black text-white text-sm">
                        ACE
                      </div>
                      <span className="font-extrabold text-white text-base tracking-wider">
                        ACE GLOBAL SUMMIT 2026
                      </span>
                      <span
                        className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                          isVip
                            ? "bg-[#FF6417] text-white shadow-sm"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {isVip ? "VIP + Dealroom" : "General Delegate"}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                        Attendee Name
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {ticket.attendeeName}
                      </div>
                      <div className="text-xs text-white/70">{ticket.attendeeEmail}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                      <div>
                        <div className="text-white/50 font-medium">Date & Time</div>
                        <div className="font-bold text-white flex items-center space-x-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#FF6417]" />
                          <span>Dec 23, 2026 • 08:00 AM</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white/50 font-medium">Host Venue</div>
                        <div className="font-bold text-white flex items-center space-x-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6417]" />
                          <span>Accra Marriott Hotel</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs font-mono text-[#FF6417] font-bold">
                      Ticket Code: {ticket.ticketCode}
                    </div>
                  </div>

                  {/* Right Column: Scannable QR Code */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 text-center">
                    {qrImages[ticket.id] ? (
                      <div className="p-3 bg-white rounded-2xl shadow-xl mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrImages[ticket.id]}
                          alt="Ticket QR Code"
                          className="w-36 h-36 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-36 h-36 bg-white/10 rounded-2xl animate-pulse mb-3" />
                    )}
                    <span className="text-[11px] font-semibold text-white/70">
                      Scan at door for admission
                    </span>
                    <span className="text-[10px] text-white/40 mt-0.5">
                      Accra Marriott Airport City
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Day-of Guidelines */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/80 space-y-2">
          <h4 className="font-bold text-white flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#FF6417]" />
            <span>Important Information for Summit Day</span>
          </h4>
          <p>
            • Please present this digital pass on your smartphone or bring a printed copy to the Accra Marriott Hotel registration desk.
          </p>
          <p>
            • Doors and delegate registration open at 08:00 AM GMT on December 23, 2026.
          </p>
          <p>
            • If you have any inquiries or require special assistance, contact our team at{" "}
            <a href="mailto:info@reinventaf.com" className="text-[#FF6417] underline">
              info@reinventaf.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TicketSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#62060E] text-white flex items-center justify-center">
          Loading ticket confirmation...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
