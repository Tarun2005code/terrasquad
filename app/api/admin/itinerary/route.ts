import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const itinerary = await prisma.itineraryDay.create({
    data: {
      expeditionId: body.expeditionId,
      day: body.day,
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(itinerary);
}