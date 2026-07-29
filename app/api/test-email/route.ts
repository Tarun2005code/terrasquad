import { NextResponse } from "next/server";
import { resend } from "@/lib/email/resend";

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tarunkachhawa2005@gmail.com",
      subject: "TerraSquad Test",
      html: "<h1>Hello from TerraSquad 🚀</h1>",
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}