import { NextResponse } from "next/server";
import { checkInTicketByCodeOrToken } from "@/lib/supabase/db";

export async function POST(req: Request) {
  try {
    const { codeOrToken } = await req.json();

    if (!codeOrToken) {
      return NextResponse.json(
        { success: false, message: "Ticket code or QR token is required." },
        { status: 400 }
      );
    }

    const result = await checkInTicketByCodeOrToken(codeOrToken);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to check in ticket" },
      { status: 500 }
    );
  }
}
