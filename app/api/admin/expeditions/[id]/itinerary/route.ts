import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Props
) {
  const { id } = await params;

  const itinerary = await prisma.itineraryDay.findMany({
    where: {
      expeditionId: Number(id),
    },
    orderBy: {
      day: "asc",
    },
  });

  return NextResponse.json(itinerary);
}

export async function POST(
  req: Request,
  { params }: Props
) {
  const { id } = await params;
  const body = await req.json();

  const day = await prisma.itineraryDay.create({
    data: {
      expeditionId: Number(id),
      day: Number(body.day),
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(day);
}