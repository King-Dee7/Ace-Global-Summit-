import { NextResponse } from "next/server";
import { getOrderByReference, markOrderPaid } from "@/lib/supabase/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ order: null }, { status: 400 });
    }

    let order = await getOrderByReference(reference);

    // If order was marked pending and user reached success page from Paystack callback, mark paid
    if (order && order.paymentStatus === "pending") {
      const attendees = order.attendees || [
        {
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          tier: (order.ticketType.toLowerCase().includes("vip") ? "vip" : "general") as any,
        },
      ];
      order = await markOrderPaid(reference, attendees as any);
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
