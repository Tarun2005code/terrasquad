import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyUserToken } from "./auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyUserToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  return user;
}