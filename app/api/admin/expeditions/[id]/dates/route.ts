import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const { date, seats } = await req.json();

    const expedition = await prisma.expedition.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!expedition) {
      return NextResponse.json(
        { error: "Expedition not found" },
        { status: 404 }
      );
    }

    const expeditionDate = await prisma.expeditionDate.create({
      data: {
        expeditionId: Number(id),
        date: new Date(date),
        seats: Number(seats),
      },
    });

    return NextResponse.json(expeditionDate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create date" },
      { status: 500 }
    );
  }
}