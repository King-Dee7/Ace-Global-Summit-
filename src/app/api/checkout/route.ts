import { NextResponse } from "next/server";
import { CheckoutPayload } from "@/lib/types";
import { saveOrder } from "@/lib/supabase/db";
import { initializePaystackPayment } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const body: CheckoutPayload = await req.json();

    if (!body.buyerEmail || !body.buyerName || !body.amountUSD) {
      return NextResponse.json(
        { status: false, message: "Missing required checkout parameters." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/tickets/success`;

    const reference = `ACE_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Save initial order
    await saveOrder({
      paystackReference: reference,
      customerEmail: body.buyerEmail,
      customerName: body.buyerName,
      customerPhone: body.buyerPhone,
      ticketType: body.tier === "vip" ? (body.purchaseType === "group" ? "VIP Group of 3" : "VIP") : (body.purchaseType === "group" ? "General Group of 3" : "General"),
      quantity: body.purchaseType === "group" ? 3 : 1,
      unitPrice: body.purchaseType === "group" ? (body.amountUSD / 3) : body.amountUSD,
      totalAmount: body.amountUSD,
      currency: "USD",
      paymentStatus: "pending",
      metadata: {
        attendees: body.attendees,
        tier: body.tier,
        purchaseType: body.purchaseType,
      },
    } as any);

    // Amount in cents for USD ($150 = 15000 cents)
    const amountInCents = Math.round(body.amountUSD * 100);

    const paystackResult = await initializePaystackPayment({
      email: body.buyerEmail,
      amountInSmallestUnit: amountInCents,
      currency: "USD",
      reference,
      callbackUrl,
      metadata: {
        buyerName: body.buyerName,
        buyerPhone: body.buyerPhone,
        attendees: body.attendees,
        tier: body.tier,
        purchaseType: body.purchaseType,
      },
    });

    if (!paystackResult.status) {
      return NextResponse.json(
        { status: false, message: paystackResult.message || "Failed to initialize Paystack transaction." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      data: paystackResult.data,
    });
  } catch (error: any) {
    console.error("Checkout initialization error:", error);
    return NextResponse.json(
      { status: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
