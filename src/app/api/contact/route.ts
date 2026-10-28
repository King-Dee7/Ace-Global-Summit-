import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/supabase/db";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { status: false, message: "Valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || !String(message).trim()) {
      return NextResponse.json(
        { status: false, message: "Please write a message." },
        { status: 400 }
      );
    }

    await saveContactMessage({
      email,
      message: String(message).trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: true, message: "Message sent" });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
