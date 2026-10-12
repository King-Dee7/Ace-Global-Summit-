import { NextResponse } from "next/server";
import { getAllOrders, getAllTickets, getAllLeads } from "@/lib/supabase/db";

export async function GET() {
  try {
    const [orders, tickets, leads] = await Promise.all([
      getAllOrders(),
      getAllTickets(),
      getAllLeads(),
    ]);

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
    const vipCount = tickets.filter((t) => t.ticketTier === "vip").length;
    const checkedInCount = tickets.filter((t) => t.isCheckedIn).length;

    return NextResponse.json({
      metrics: {
        totalRevenue,
        totalOrders: orders.length,
        paidOrdersCount: paidOrders.length,
        totalAttendees: tickets.length,
        vipAttendees: vipCount,
        checkedInAttendees: checkedInCount,
        totalLeads: leads.length,
      },
      orders,
      tickets,
      leads,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
