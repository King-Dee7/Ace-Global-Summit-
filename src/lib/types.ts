export type TicketTier = "general" | "vip";
export type PurchaseType = "individual" | "group";

export interface TicketProduct {
  id: string;
  name: string;
  tier: TicketTier;
  purchaseType: PurchaseType;
  priceUSD: number;
  perPersonUSD: number;
  quantity: number;
  savingsText?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface AttendeeInput {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
}

export interface CheckoutPayload {
  ticketId: string;
  tier: TicketTier;
  purchaseType: PurchaseType;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  attendees: AttendeeInput[];
  amountUSD: number;
}

export interface OrderRecord {
  id: string;
  paystackReference: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  ticketType: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed";
  paidAt?: string;
  createdAt: string;
  attendees?: TicketRecord[];
}

export interface TicketRecord {
  id: string;
  orderId: string;
  ticketCode: string;
  ticketTier: TicketTier;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  isCheckedIn: boolean;
  checkedInAt?: string;
  qrToken: string;
  createdAt: string;
}

export interface LeadSubscription {
  email: string;
  interestType: "schedule" | "speakers" | "partnership" | "general";
}
