import { NextResponse } from "next/server";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";
import { markOrderPaid } from "@/lib/supabase/db";
import { TicketTier } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // In production, enforce cryptographic HMAC signature
    if (process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.startsWith("demo_")) {
      const isValid = verifyPaystackWebhookSignature(rawBody, signature);
      if (!isValid) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const data = event.data;
      const reference = data.reference;
      const metadata = data.metadata || {};
      const tier: TicketTier = metadata.tier || "general";
      const attendeesData = metadata.attendees || [
        {
          name: metadata.buyerName || data.customer?.first_name || "Delegate",
          email: data.customer?.email,
          phone: metadata.buyerPhone || data.customer?.phone,
          tier,
        },
      ];

      const formattedAttendees = attendeesData.map((att: any) => ({
        name: att.fullName || att.name || "Attendee",
        email: att.email || data.customer?.email,
        phone: att.phone,
        tier,
      }));

      await markOrderPaid(reference, formattedAttendees);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json({ message: "Webhook handler failed" }, { status: 500 });
  }
}
