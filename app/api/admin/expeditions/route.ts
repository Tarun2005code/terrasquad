import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expeditions = await prisma.expedition.findMany({
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
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
const activeCount = expeditions.filter(
  (e) => e.active
).length;

const archivedCount = expeditions.filter(
  (e) => !e.active
).length;
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
      data: {
        slug: body.slug,
        title: body.title,
        location: body.location,
        duration: body.duration,
        difficulty: body.difficulty,
        price: body.price,
        image: body.image,
        description: body.description,

        rating: body.rating ?? 4.9,
        altitude: body.altitude,
        distance: body.distance,
        pickup: body.pickup,
        meals: body.meals,
        guide: body.guide ?? true,
      },
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