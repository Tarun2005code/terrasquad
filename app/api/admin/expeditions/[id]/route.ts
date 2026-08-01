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
       active: false,
    },
  });

  return NextResponse.json(expedition);
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  const { id } = await params;

  await prisma.expedition.update({
  where: {
    id: Number(id),
  },
  data: {
    active: false,
  },
});

  return NextResponse.json({
    success: true,
    archived: true,
  });
}