import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
    dateId: string;
  }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { dateId } = await params;

    const body = await req.json();

    const departureDate =
      await prisma.expeditionDate.update({
        where: {
          id: Number(dateId),
        },
        data: {
          date: new Date(body.date),
          seats: Number(body.seats),
        },
      });

    return NextResponse.json(departureDate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update departure date",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { dateId } = await params;

    const departureDate =
      await prisma.expeditionDate.findUnique({
        where: {
          id: Number(dateId),
        },
      });

    if (!departureDate) {
      return NextResponse.json(
        {
          error: "Departure date not found",
        },
        {
          status: 404,
        }
      );
    }

    const updated =
      await prisma.expeditionDate.update({
        where: {
          id: Number(dateId),
        },
        data: {
          active: !departureDate.active,
        },
      });

    return NextResponse.json({
      success: true,
      active: updated.active,
      message: updated.active
        ? "Departure date restored successfully"
        : "Departure date archived successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to archive departure date",
      },
      {
        status: 500,
      }
    );
  }
}