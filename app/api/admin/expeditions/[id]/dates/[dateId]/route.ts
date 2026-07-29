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

    await prisma.expeditionDate.delete({
      where: {
        id: Number(dateId),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete departure date",
      },
      {
        status: 500,
      }
    );
  }
}