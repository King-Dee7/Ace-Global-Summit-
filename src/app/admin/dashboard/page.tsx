"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  DollarSign,
  Ticket,
  CheckCircle,
  Clock,
  Download,
  Search,
  QrCode,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building,
  Mail,
  Zap,
} from "lucide-react";
import { OrderRecord, TicketRecord, LeadSubscription } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"attendees" | "orders" | "leads" | "checkin">("attendees");
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [leads, setLeads] = useState<LeadSubscription[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | "vip" | "general">("all");
  const [checkInFilter, setCheckInFilter] = useState<"all" | "checked_in" | "pending">("all");

  // Check-in input tool
  const [checkInCode, setCheckInCode] = useState("");
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; message: string } | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setOrders(data.orders || []);
        setTickets(data.tickets || []);
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleManualCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInCode) return;

    setCheckingIn(true);
    setCheckInResult(null);

    try {
      const res = await fetch("/api/admin/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeOrToken: checkInCode }),
      });
      const data = await res.json();
      setCheckInResult(data);
      if (data.success) {
        setCheckInCode("");
        fetchData();
      }
    } catch {
      setCheckInResult({ success: false, message: "Network error occurred." });
    } finally {
      setCheckingIn(false);
    }
  };

  const handleToggleCheckIn = async (ticketCode: string) => {
    try {
      const res = await fetch("/api/admin/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeOrToken: ticketCode }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const exportAttendeesCsv = () => {
    const headers = ["Ticket Code", "Name", "Email", "Phone", "Tier", "Checked In", "Checked In Time"];
    const rows = tickets.map((t) => [
      t.ticketCode,
      `"${t.attendeeName.replace(/"/g, '""')}"`,
      t.attendeeEmail,
      t.attendeePhone || "",
      t.ticketTier.toUpperCase(),
      t.isCheckedIn ? "YES" : "NO",
      t.checkedInAt || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ACE_GLOBAL_SUMMIT_Attendees_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLeadsCsv = () => {
    const headers = ["Email", "Interest Type"];
    const rows = leads.map((l) => [l.email, l.interestType]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ACE_GLOBAL_SUMMIT_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.attendeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === "all" || t.ticketTier === tierFilter;
    const matchesCheckIn =
      checkInFilter === "all" ||
      (checkInFilter === "checked_in" && t.isCheckedIn) ||
      (checkInFilter === "pending" && !t.isCheckedIn);

    return matchesSearch && matchesTier && matchesCheckIn;
  });

  return (
    <div className="min-h-screen bg-[#3B0207] text-white">
      {/* Top Header */}
      <header className="bg-[#62060E] border-b border-[#FF6417]/25 px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6417] to-[#E65100] flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF6417]/30">
              ACE
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-white text-base sm:text-lg">
                  ACE GLOBAL SUMMIT Dashboard
                </h1>
                <span className="text-[10px] font-bold bg-[#FF6417]/20 text-[#FF6417] border border-[#FF6417]/30 px-2 py-0.5 rounded-full uppercase">
                  Accra 2026
                </span>
              </div>
              <p className="text-xs text-white/60">Dec 23, 2026 • Accra Marriott Hotel</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <Link
              href="/admin/scan"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FF6417] hover:bg-[#FF7B39] text-white font-bold transition-all shadow-md shadow-[#FF6417]/30"
            >
              <QrCode className="w-4 h-4" />
              <span>Door QR Scanner</span>
            </Link>

            <button
              onClick={fetchData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem("ace_admin_auth");
                router.push("/admin/login");
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/70 hover:text-rose-300 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-[#62060E] border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-[#FF6417] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">Total Revenue</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ${(metrics?.totalRevenue || 0).toLocaleString()} <span className="text-xs font-normal text-white/50">USD</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center space-x-1">
              <span>Paystack verified collections</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#62060E] border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-[#FF6417] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">Tickets Issued</span>
              <Ticket className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {metrics?.totalAttendees || 0}
            </div>
            <div className="text-[11px] text-white/60 mt-1">
              {metrics?.vipAttendees || 0} VIP Dealroom passes
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#62060E] border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">Door Check-Ins</span>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {metrics?.checkedInAttendees || 0} <span className="text-xs font-normal text-white/40">/ {metrics?.totalAttendees || 0}</span>
            </div>
            <div className="text-[11px] text-white/60 mt-1">
              {metrics?.totalAttendees ? Math.round(((metrics.checkedInAttendees || 0) / metrics.totalAttendees) * 100) : 0}% check-in rate
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#62060E] border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">Waitlist / Leads</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {metrics?.totalLeads || 0}
            </div>
            <div className="text-[11px] text-white/60 mt-1">
              Schedule & Speaker subscribers
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("attendees")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "attendees"
                  ? "bg-[#FF6417] text-white shadow-md shadow-[#FF6417]/25"
                  : "bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Attendees & Passes ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-[#FF6417] text-white shadow-md shadow-[#FF6417]/25"
                  : "bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "leads"
                  ? "bg-[#FF6417] text-white shadow-md shadow-[#FF6417]/25"
                  : "bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Waitlist Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab("checkin")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "checkin"
                  ? "bg-[#FF6417] text-white shadow-md shadow-[#FF6417]/25"
                  : "bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Quick Check-In Desk
            </button>
          </div>

          {activeTab === "attendees" && (
            <button
              onClick={exportAttendeesCsv}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Attendees CSV</span>
            </button>
          )}

          {activeTab === "leads" && (
            <button
              onClick={exportLeadsCsv}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Leads CSV</span>
            </button>
          )}
        </div>

        {/* TAB 1: ATTENDEES */}
        {activeTab === "attendees" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by attendee name, email, or ticket code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#62060E] border border-white/15 text-white text-xs sm:text-sm placeholder-white/40 focus:outline-none focus:border-[#FF6417]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <select
                  value={tierFilter}
                  onChange={(e: any) => setTierFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#62060E] border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Tiers</option>
                  <option value="vip">VIP Only</option>
                  <option value="general">General Only</option>
                </select>

                <select
                  value={checkInFilter}
                  onChange={(e: any) => setCheckInFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#62060E] border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="checked_in">Checked In</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="rounded-3xl bg-[#62060E] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#4A040A] text-white/60 text-[11px] uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-6">Ticket Code</th>
                      <th className="py-3.5 px-6">Attendee</th>
                      <th className="py-3.5 px-6">Tier</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredTickets.map((t) => (
                      <tr key={t.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-[#FF6417]">
                          {t.ticketCode}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-white">{t.attendeeName}</div>
                          <div className="text-xs text-white/60">{t.attendeeEmail}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              t.ticketTier === "vip"
                                ? "bg-[#FF6417] text-white shadow-sm"
                                : "bg-white/10 text-white/80"
                            }`}
                          >
                            {t.ticketTier.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {t.isCheckedIn ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold text-xs">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Checked In</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-white/50 text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Pending</span>
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleToggleCheckIn(t.ticketCode)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              t.isCheckedIn
                                ? "bg-white/10 text-white/70 hover:bg-white/20"
                                : "bg-[#FF6417] text-white hover:bg-[#FF7B39]"
                            }`}
                          >
                            {t.isCheckedIn ? "Undo" : "Check In"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredTickets.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-white/50">
                          No attendees match your search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === "orders" && (
          <div className="rounded-3xl bg-[#62060E] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#4A040A] text-white/60 text-[11px] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-6">Reference</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Type & Qty</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-[#FF6417]">
                        {o.paystackReference}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{o.customerName}</div>
                        <div className="text-xs text-white/60">{o.customerEmail}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold">{o.ticketType}</div>
                        <div className="text-xs text-white/50">{o.quantity} pass(es)</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">
                        ${o.totalAmount} {o.currency}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            o.paymentStatus === "paid"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-white/50">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LEADS & WAITLIST */}
        {activeTab === "leads" && (
          <div className="rounded-3xl bg-[#62060E] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#4A040A] text-white/60 text-[11px] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-6">Subscriber Email</th>
                    <th className="py-3.5 px-6">Notification Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((l, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{l.email}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium text-[#FF6417] uppercase">
                          {l.interestType}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-12 text-center text-white/50">
                        No leads registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: QUICK CHECK-IN TOOL */}
        {activeTab === "checkin" && (
          <div className="max-w-xl mx-auto rounded-3xl p-8 bg-[#62060E] border border-[#FF6417]/30 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6417]/20 border border-[#FF6417] text-[#FF6417] flex items-center justify-center mx-auto shadow-lg shadow-[#FF6417]/20">
              <QrCode className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Manual Check-In Console</h3>
              <p className="text-xs text-white/70 mt-1">
                Enter ticket code (e.g. <code>ACE-VIP-DEMO88</code>) or token from delegate pass
              </p>
            </div>

            {checkInResult && (
              <div
                className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-center space-x-2 ${
                  checkInResult.success
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-500/20 border-rose-500/40 text-rose-200"
                }`}
              >
                <span>{checkInResult.message}</span>
              </div>
            )}

            <form onSubmit={handleManualCheckIn} className="space-y-3">
              <input
                type="text"
                placeholder="Enter ACE Ticket Code..."
                value={checkInCode}
                onChange={(e) => setCheckInCode(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-center text-base focus:outline-none focus:border-[#FF6417] uppercase tracking-wider"
              />
              <button
                type="submit"
                disabled={checkingIn || !checkInCode}
                className="w-full py-3.5 rounded-full bg-[#FF6417] hover:bg-[#FF7B39] text-white font-bold text-sm shadow-xl shadow-[#FF6417]/30 transition-all disabled:opacity-50"
              >
                {checkingIn ? "Validating..." : "Admit Delegate"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
