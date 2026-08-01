import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();

  const expedition = await prisma.expedition.update({
    where: {
      id: Number(id),
    },
    data: {
      slug: body.slug,
      title: body.title,
      location: body.location,
      duration: body.duration,
      difficulty: body.difficulty,
      price: body.price,
      image: body.image,
      description: body.description,
      rating: body.rating,
      altitude: body.altitude || null,
      distance: body.distance || null,
      pickup: body.pickup || null,
      meals: body.meals || null,
      guide: body.guide,
      featured: body.featured,
    },
  });

  return NextResponse.json(expedition);
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  const { id } = await params;

  const expedition = await prisma.expedition.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      active: true,
    },
  });

  if (!expedition) {
    return NextResponse.json(
      { error: "Expedition not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.expedition.update({
    where: {
      id: Number(id),
    },
    data: {
      active: !expedition.active,
    },
  });

  return NextResponse.json({
    success: true,
    active: updated.active,
  });
}