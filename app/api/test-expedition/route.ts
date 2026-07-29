import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expedition = await prisma.expedition.findUnique({
    where: {
      slug: "patna waterfall",
    },
  });

  return NextResponse.json(expedition);
}