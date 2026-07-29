import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email/sendContactEmail";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}