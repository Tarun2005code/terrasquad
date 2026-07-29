import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          error: "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        {
          error: "Already checked in",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Check-in failed",
      },
      {
        status: 500,
      }
    );
  }
}