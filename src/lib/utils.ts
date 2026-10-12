import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (currency === "GHS") {
    return `GH₵ ${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

export function generateTicketCode(tier: "general" | "vip"): string {
  const prefix = tier === "vip" ? "ACE-VIP" : "ACE-GEN";
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomChars}${timestamp}`;
}

export function generateQrToken(): string {
  return `ace_token_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
}
