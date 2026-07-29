import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    imageId: string;
  }>;
};

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { imageId } = await params;

    await prisma.expeditionImage.delete({
      where: {
        id: Number(imageId),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to delete image",
      },
      {
        status: 500,
      }
    );
  }
}