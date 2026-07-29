import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      name,
      phone,
    } = await req.json();

    const updatedUser =
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
          phone,
        },
      });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}