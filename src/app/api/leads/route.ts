import { NextResponse } from "next/server";
import { saveLead } from "@/lib/supabase/db";

export async function POST(req: Request) {
  try {
    const { email, interestType } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { status: false, message: "Valid email address is required." },
        { status: 400 }
      );
    }

    await saveLead({
      email,
      interestType: interestType || "general",
    });

    return NextResponse.json({ status: true, message: "Subscribed successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Failed to save lead" },
      { status: 500 }
    );
  }
}
