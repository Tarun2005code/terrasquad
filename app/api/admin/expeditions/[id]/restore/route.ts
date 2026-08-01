import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: Request,
  { params }: Props
) {
  const { id } = await params;

  await prisma.expedition.update({
    where: {
      id: Number(id),
    },
    data: {
      active: true,
    },
  });

  return NextResponse.json({
    success: true,
  });
}