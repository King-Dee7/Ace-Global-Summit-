import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

export interface InitializePaystackParams {
  email: string;
  amountInSmallestUnit: number; // e.g. amount in cents ($150 = 15000) or kobo
  currency?: string;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
}

export async function initializePaystackPayment(params: InitializePaystackParams) {
  // If no secret key is provided (local dev / demo mode), provide a simulated redirect
  if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.startsWith("demo_")) {
    return {
      status: true,
      message: "Authorization URL created (Demo/Simulation Mode)",
      data: {
        authorization_url: `${params.callbackUrl}?reference=${params.reference}&demo=true`,
        access_code: `demo_code_${params.reference}`,
        reference: params.reference,
      },
    };
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountInSmallestUnit,
      currency: params.currency || "USD",
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const data = await response.json();
  return data;
}

export async function verifyPaystackTransaction(reference: string) {
  if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.startsWith("demo_")) {
    return {
      status: true,
      data: {
        status: "success",
        reference,
        amount: 15000,
        currency: "USD",
        paid_at: new Date().toISOString(),
      },
    };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export function verifyPaystackWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  if (!PAYSTACK_SECRET_KEY || !signatureHeader) return false;

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  return hash === signatureHeader;
}
