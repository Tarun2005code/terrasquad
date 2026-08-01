import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expeditions = await prisma.expedition.findMany({
  where: {
    active: true,
  },
      include: {
        itinerary: {
          orderBy: {
            day: "asc",
          },
        },
        images: true,
        dates: {
          orderBy: {
            date: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(expeditions);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch expeditions",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const expedition = await prisma.expedition.create({
      data: body,
    });

    return NextResponse.json(expedition, {
      status: 201,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create expedition",
      },
      {
        status: 500,
      }
    );
  }
}