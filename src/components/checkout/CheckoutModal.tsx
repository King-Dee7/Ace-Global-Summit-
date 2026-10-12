"use client";

import { useState } from "react";
import { X, Shield, Loader2, CheckCircle2, User, Mail, Phone, Building } from "lucide-react";
import { TicketProduct, AttendeeInput, CheckoutPayload } from "@/lib/types";

interface CheckoutModalProps {
  ticket: TicketProduct | null;
  onClose: () => void;
}

export default function CheckoutModal({ ticket, onClose }: CheckoutModalProps) {
  if (!ticket) return null;

  const isGroup = ticket.purchaseType === "group";

  // Form states
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [company, setCompany] = useState("");

  // Group attendee states (if group of 3)
  const [attendees, setAttendees] = useState<AttendeeInput[]>([
    { fullName: "", email: "", phone: "", company: "" },
    { fullName: "", email: "", phone: "", company: "" },
    { fullName: "", email: "", phone: "", company: "" },
  ]);

  const [prefillFirst, setPrefillFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateAttendee = (index: number, field: keyof AttendeeInput, value: string) => {
    const updated = [...attendees];
    updated[index] = { ...updated[index], [field]: value };
    setAttendees(updated);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!buyerName || !buyerEmail) {
      setErrorMessage("Please enter the primary contact name and email address.");
      return;
    }

    let finalAttendees: AttendeeInput[] = [];

    if (isGroup) {
      const att1 = prefillFirst
        ? { fullName: buyerName, email: buyerEmail, phone: buyerPhone, company }
        : attendees[0];
      const att2 = attendees[1];
      const att3 = attendees[2];

      if (!att1.fullName || !att1.email || !att2.fullName || !att2.email || !att3.fullName || !att3.email) {
        setErrorMessage("Please provide names and emails for all 3 group attendees.");
        return;
      }
      finalAttendees = [att1, att2, att3];
    } else {
      finalAttendees = [
        {
          fullName: buyerName,
          email: buyerEmail,
          phone: buyerPhone,
          company,
        },
      ];
    }

    setLoading(true);

    try {
      const payload: CheckoutPayload = {
        ticketId: ticket.id,
        tier: ticket.tier,
        purchaseType: ticket.purchaseType,
        buyerName,
        buyerEmail,
        buyerPhone,
        attendees: finalAttendees,
        amountUSD: ticket.priceUSD,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to initialize checkout.");
      }

      // Redirect to Paystack authorization URL
      if (data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error("Missing payment authorization URL.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#62060E] border-2 border-[#FF6417]/40 rounded-3xl shadow-2xl text-white overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#3B0207]/60">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#FF6417] mb-1">
              ACE GLOBAL SUMMIT Registration
            </div>
            <h3 className="text-2xl font-black text-white">
              {ticket.name} Pass — ${ticket.priceUSD}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCheckout} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Ticket summary mini bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold text-white block">Accra Marriott Hotel</span>
              <span className="text-xs text-white/60">December 23, 2026 • Full Day Summit</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-[#FF6417]">${ticket.priceUSD} USD</span>
              <span className="text-[11px] text-white/60 block">
                {isGroup ? "3 Individual Passes" : "1 Pass"}
              </span>
            </div>
          </div>

          {/* Primary Buyer Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-[#FF6417]" />
              <span>{isGroup ? "Primary Contact / Billing Details" : "Attendee Information"}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="e.g. kwame@ventures.africa"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Phone Number (WhatsApp)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+233 24 000 0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Company / Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Accra Capital Partners"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Group of 3: Attendee breakdown */}
          {isGroup && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6417]" />
                  <span>The 3 Attendees on this Group Pass</span>
                </h4>
                <label className="flex items-center space-x-2 text-xs text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefillFirst}
                    onChange={(e) => setPrefillFirst(e.target.checked)}
                    className="accent-[#FF6417] rounded"
                  />
                  <span>Use primary contact as Attendee 1</span>
                </label>
              </div>

              {/* Attendee 1 (if not prefilled) */}
              {!prefillFirst && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-[#FF6417]">Attendee 1 Pass</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Attendee 1 Name"
                      value={attendees[0].fullName}
                      onChange={(e) => updateAttendee(0, "fullName", e.target.value)}
                      className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                    />
                    <input
                      type="email"
                      placeholder="Attendee 1 Email"
                      value={attendees[0].email}
                      onChange={(e) => updateAttendee(0, "email", e.target.value)}
                      className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Attendee 2 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#FF6417]">Attendee 2 Pass</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Attendee 2 Name *"
                    value={attendees[1].fullName}
                    onChange={(e) => updateAttendee(1, "fullName", e.target.value)}
                    className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Attendee 2 Email *"
                    value={attendees[1].email}
                    onChange={(e) => updateAttendee(1, "email", e.target.value)}
                    className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                  />
                </div>
              </div>

              {/* Attendee 3 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#FF6417]">Attendee 3 Pass</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Attendee 3 Name *"
                    value={attendees[2].fullName}
                    onChange={(e) => updateAttendee(2, "fullName", e.target.value)}
                    className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Attendee 3 Email *"
                    value={attendees[2].email}
                    onChange={(e) => updateAttendee(2, "email", e.target.value)}
                    className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment CTA */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF6417] to-[#E65100] hover:from-[#FF7B39] hover:to-[#FF6417] text-white font-black text-base shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting to Paystack...</span>
                </>
              ) : (
                <span>Pay ${ticket.priceUSD} USD via Paystack</span>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
              <Shield className="w-4 h-4 text-[#FF6417]" />
              <span>256-bit encrypted checkout via Paystack Gateway</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
