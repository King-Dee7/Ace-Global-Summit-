"use client";

import { useState } from "react";
import Link from "next/link";
import { QrCode, ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Search, Sparkles } from "lucide-react";

export default function AdminScanPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [message, setMessage] = useState("");
  const [attendeeData, setAttendeeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code) return;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/admin/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeOrToken: code }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setAttendeeData(data.ticket);
        setCode("");
      } else if (data.ticket?.isCheckedIn) {
        setStatus("duplicate");
        setMessage(data.message);
        setAttendeeData(data.ticket);
      } else {
        setStatus("error");
        setMessage(data.message || "Invalid ticket code.");
        setAttendeeData(null);
      }
    } catch {
      setStatus("error");
      setMessage("Verification request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3B0207] text-white flex flex-col justify-between p-4 sm:p-6">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center space-x-2 text-xs text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-xs font-bold text-[#FF6417] uppercase tracking-wider">
            Accra Marriott Door Staff
          </span>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-[#62060E] border-2 border-[#FF6417]/30 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FF6417]/20 border border-[#FF6417] text-[#FF6417] flex items-center justify-center mx-auto shadow-lg shadow-[#FF6417]/20">
            <QrCode className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">Door Check-In Scanner</h1>
            <p className="text-xs text-white/70 mt-1">
              Verify digital tickets & admit delegates to ACE GLOBAL SUMMIT
            </p>
          </div>

          {/* Result Banner */}
          {status === "success" && (
            <div className="p-5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-100 text-left space-y-2 animate-bounce-short">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>ADMISSION APPROVED</span>
              </div>
              <div className="text-lg font-black text-white">{attendeeData?.attendeeName}</div>
              <div className="text-xs text-emerald-200">
                Tier: <strong className="uppercase font-extrabold">{attendeeData?.ticketTier}</strong>{" "}
                {attendeeData?.ticketTier === "vip" && "• Full Dealroom Access"}
              </div>
            </div>
          )}

          {status === "duplicate" && (
            <div className="p-5 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-100 text-left space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>ALREADY CHECKED IN</span>
              </div>
              <div className="text-sm font-bold text-white">{attendeeData?.attendeeName}</div>
              <div className="text-xs text-amber-200">{message}</div>
            </div>
          )}

          {status === "error" && (
            <div className="p-5 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-100 text-left space-y-1">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>INVALID TICKET</span>
              </div>
              <div className="text-xs text-rose-200">{message}</div>
            </div>
          )}

          {/* Manual Input Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Scan QR or Enter Code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white font-mono text-center text-lg focus:outline-none focus:border-[#FF6417] tracking-wider uppercase placeholder:text-sm placeholder:normal-case placeholder:font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !code}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6417] to-[#E65100] hover:from-[#FF7B39] hover:to-[#FF6417] text-white font-black text-base shadow-xl shadow-[#FF6417]/30 transition-all disabled:opacity-50"
            >
              {loading ? "Checking..." : "Verify & Admit"}
            </button>
          </form>

          {/* Quick test buttons */}
          <div className="pt-4 border-t border-white/10 text-left space-y-2">
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
              Quick Test Simulation:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCode("ACE-VIP-DEMO88")}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#FF6417] font-mono"
              >
                ACE-VIP-DEMO88
              </button>
              <button
                type="button"
                onClick={() => setCode("ACE-GEN-DEMO12")}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-mono"
              >
                ACE-GEN-DEMO12
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white/40 pt-4">
        Accra Marriott Hotel • December 23, 2026
      </div>
    </div>
  );
}
