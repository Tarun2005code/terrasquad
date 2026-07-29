import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export type AdminPayload = {
  id: number;
  email: string;
  role: "ADMIN";
};

export type UserPayload = {
  id: number;
  email: string;
};

export function signAdminToken(payload: AdminPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAdminToken(
  token: string
): AdminPayload | null {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export function signUserToken(payload: UserPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyUserToken(
  token: string
): UserPayload | null {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as unknown as UserPayload;
  } catch {
    return null;
  }
}