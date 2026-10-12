import { createClient } from "@supabase/supabase-js";
import { OrderRecord, TicketRecord, LeadSubscription, TicketTier } from "../types";
import { generateTicketCode, generateQrToken } from "../utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes("placeholder")
);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// In-memory / dev fallback cache so local testing and review works right out of the box
const memoryOrders: OrderRecord[] = [
  {
    id: "ord_demo_001",
    paystackReference: "ACE_DEMO_REF_101",
    customerEmail: "kofi.mensah@techventures.africa",
    customerName: "Kofi Mensah",
    customerPhone: "+233 24 123 4567",
    ticketType: "VIP",
    quantity: 1,
    unitPrice: 170,
    totalAmount: 170,
    currency: "USD",
    paymentStatus: "paid",
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    attendees: [
      {
        id: "tkt_demo_001",
        orderId: "ord_demo_001",
        ticketCode: "ACE-VIP-DEMO88",
        ticketTier: "vip",
        attendeeName: "Kofi Mensah",
        attendeeEmail: "kofi.mensah@techventures.africa",
        attendeePhone: "+233 24 123 4567",
        isCheckedIn: false,
        qrToken: "ace_demo_token_vip_001",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "ord_demo_002",
    paystackReference: "ACE_DEMO_REF_102",
    customerEmail: "sarah.jenkins@accracreatives.com",
    customerName: "Sarah Jenkins",
    customerPhone: "+44 7700 900123",
    ticketType: "General Group of 3",
    quantity: 3,
    unitPrice: 133.33,
    totalAmount: 400,
    currency: "USD",
    paymentStatus: "paid",
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    attendees: [
      {
        id: "tkt_demo_002a",
        orderId: "ord_demo_002",
        ticketCode: "ACE-GEN-DEMO12",
        ticketTier: "general",
        attendeeName: "Sarah Jenkins",
        attendeeEmail: "sarah.jenkins@accracreatives.com",
        isCheckedIn: true,
        checkedInAt: new Date().toISOString(),
        qrToken: "ace_demo_token_gen_002a",
        createdAt: new Date().toISOString(),
      },
      {
        id: "tkt_demo_002b",
        orderId: "ord_demo_002",
        ticketCode: "ACE-GEN-DEMO13",
        ticketTier: "general",
        attendeeName: "Ama Serwaa",
        attendeeEmail: "ama.serwaa@accracreatives.com",
        isCheckedIn: false,
        qrToken: "ace_demo_token_gen_002b",
        createdAt: new Date().toISOString(),
      },
      {
        id: "tkt_demo_002c",
        orderId: "ord_demo_002",
        ticketCode: "ACE-GEN-DEMO14",
        ticketTier: "general",
        attendeeName: "David Osei",
        attendeeEmail: "david.osei@accracreatives.com",
        isCheckedIn: false,
        qrToken: "ace_demo_token_gen_002c",
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

const memoryLeads: LeadSubscription[] = [
  { email: "investor.connect@lagoscap.com", interestType: "schedule" },
  { email: "clara.boateng@ventures.gh", interestType: "speakers" },
  { email: "marcus.adebayo@londonfintech.io", interestType: "schedule" },
];

export async function saveOrder(order: Omit<OrderRecord, "id" | "createdAt">): Promise<OrderRecord> {
  const newOrder: OrderRecord = {
    ...order,
    id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        paystack_reference: newOrder.paystackReference,
        customer_email: newOrder.customerEmail,
        customer_name: newOrder.customerName,
        customer_phone: newOrder.customerPhone,
        ticket_type: newOrder.ticketType,
        quantity: newOrder.quantity,
        unit_price: newOrder.unitPrice,
        total_amount: newOrder.totalAmount,
        currency: newOrder.currency,
        payment_status: newOrder.paymentStatus,
        metadata: { attendees: newOrder.attendees },
      })
      .select()
      .single();

    if (!error && data) {
      newOrder.id = data.id;
    }
  }

  memoryOrders.unshift(newOrder);
  return newOrder;
}

export async function markOrderPaid(
  paystackReference: string,
  attendeesList?: { name: string; email: string; phone?: string; tier: TicketTier }[]
): Promise<OrderRecord | null> {
  let order = memoryOrders.find((o) => o.paystackReference === paystackReference);
  if (order) {
    order.paymentStatus = "paid";
    order.paidAt = new Date().toISOString();

    if (attendeesList && attendeesList.length > 0) {
      const tickets: TicketRecord[] = attendeesList.map((att) => ({
        id: `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        orderId: order!.id,
        ticketCode: generateTicketCode(att.tier),
        ticketTier: att.tier,
        attendeeName: att.name,
        attendeeEmail: att.email,
        attendeePhone: att.phone,
        isCheckedIn: false,
        qrToken: generateQrToken(),
        createdAt: new Date().toISOString(),
      }));
      order.attendees = tickets;
    }
  }

  if (isSupabaseConfigured && supabase) {
    await supabase
      .from("orders")
      .update({ payment_status: "paid", paid_at: new Date().toISOString() })
      .eq("paystack_reference", paystackReference);
  }

  return order || null;
}

export async function getOrderByReference(reference: string): Promise<OrderRecord | null> {
  const local = memoryOrders.find((o) => o.paystackReference === reference);
  if (local) return local;

  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("orders")
      .select("*, tickets(*)")
      .eq("paystack_reference", reference)
      .single();

    if (data) {
      return {
        id: data.id,
        paystackReference: data.paystack_reference,
        customerEmail: data.customer_email,
        customerName: data.customer_name,
        customerPhone: data.customer_phone,
        ticketType: data.ticket_type,
        quantity: data.quantity,
        unitPrice: Number(data.unit_price),
        totalAmount: Number(data.total_amount),
        currency: data.currency,
        paymentStatus: data.payment_status,
        paidAt: data.paid_at,
        createdAt: data.created_at,
        attendees: (data.tickets || []).map((t: any) => ({
          id: t.id,
          orderId: t.order_id,
          ticketCode: t.ticket_code,
          ticketTier: t.ticket_tier,
          attendeeName: t.attendee_name,
          attendeeEmail: t.attendee_email,
          attendeePhone: t.attendee_phone,
          isCheckedIn: t.is_checked_in,
          checkedInAt: t.checked_in_at,
          qrToken: t.qr_token,
          createdAt: t.created_at,
        })),
      };
    }
  }

  return null;
}

export async function getAllOrders(): Promise<OrderRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("orders")
      .select("*, tickets(*)")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        paystackReference: d.paystack_reference,
        customerEmail: d.customer_email,
        customerName: d.customer_name,
        customerPhone: d.customer_phone,
        ticketType: d.ticket_type,
        quantity: d.quantity,
        unitPrice: Number(d.unit_price),
        totalAmount: Number(d.total_amount),
        currency: d.currency,
        paymentStatus: d.payment_status,
        paidAt: d.paid_at,
        createdAt: d.created_at,
        attendees: (d.tickets || []).map((t: any) => ({
          id: t.id,
          orderId: t.order_id,
          ticketCode: t.ticket_code,
          ticketTier: t.ticket_tier,
          attendeeName: t.attendee_name,
          attendeeEmail: t.attendee_email,
          attendeePhone: t.attendee_phone,
          isCheckedIn: t.is_checked_in,
          checkedInAt: t.checked_in_at,
          qrToken: t.qr_token,
          createdAt: t.created_at,
        })),
      }));
    }
  }

  return memoryOrders;
}

export async function getAllTickets(): Promise<TicketRecord[]> {
  const orders = await getAllOrders();
  const allTickets: TicketRecord[] = [];
  orders.forEach((o) => {
    if (o.attendees && o.attendees.length > 0) {
      allTickets.push(...o.attendees);
    }
  });
  return allTickets;
}

export async function checkInTicketByCodeOrToken(
  codeOrToken: string
): Promise<{ success: boolean; message: string; ticket?: TicketRecord }> {
  const query = codeOrToken.trim();
  const orders = await getAllOrders();

  for (const order of orders) {
    if (order.attendees) {
      const ticket = order.attendees.find(
        (t) =>
          t.ticketCode.toLowerCase() === query.toLowerCase() ||
          t.qrToken.toLowerCase() === query.toLowerCase()
      );

      if (ticket) {
        if (ticket.isCheckedIn) {
          return {
            success: false,
            message: `Ticket already checked in at ${new Date(ticket.checkedInAt || "").toLocaleTimeString()}`,
            ticket,
          };
        }

        ticket.isCheckedIn = true;
        ticket.checkedInAt = new Date().toISOString();

        if (isSupabaseConfigured && supabase) {
          await supabase
            .from("tickets")
            .update({ is_checked_in: true, checked_in_at: ticket.checkedInAt })
            .eq("ticket_code", ticket.ticketCode);
        }

        return {
          success: true,
          message: `Check-in successful! Welcome ${ticket.attendeeName} (${ticket.ticketTier.toUpperCase()})`,
          ticket,
        };
      }
    }
  }

  return { success: false, message: "Invalid ticket code or QR token not found in registry." };
}

export async function saveLead(lead: LeadSubscription): Promise<boolean> {
  const exists = memoryLeads.some(
    (l) => l.email.toLowerCase() === lead.email.toLowerCase() && l.interestType === lead.interestType
  );
  if (!exists) {
    memoryLeads.unshift(lead);
  }

  if (isSupabaseConfigured && supabase) {
    await supabase.from("leads").upsert(
      { email: lead.email.toLowerCase(), interest_type: lead.interestType },
      { onConflict: "email,interest_type" }
    );
  }

  return true;
}

export async function getAllLeads(): Promise<LeadSubscription[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) {
      return data.map((d: any) => ({
        email: d.email,
        interestType: d.interest_type,
      }));
    }
  }
  return memoryLeads;
}
