import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const images = await prisma.expeditionImage.findMany({
    where: {
      expeditionId: Number(id),
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(images);
}

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await req.json();
console.log("EXPEDITION ID:", id);
    console.log("BODY:", body);
    const image = await prisma.expeditionImage.create({
      data: {
        expeditionId: Number(id),
        image: body.image,
      },
    });

      return NextResponse.json(image);
  } catch (err) {
    console.error("GALLERY ERROR:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to upload image",
      },
      {
        status: 500,
      }
    );
  }
}