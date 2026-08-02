import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}
const SECRET: string = JWT_SECRET;
export type AdminPayload = {
  id: number;
  email: string;
  role: "ADMIN";
};

export type UserPayload = {
  id: number;
  email: string;
  role:
    | "USER"
    | "ADMIN"
    | "TRIP_LEADER"
    | "SUPER_ADMIN";
};

export function signAdminToken(payload: AdminPayload) {
  return jwt.sign(payload, SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: "terrasquad",
    audience: "terrasquad-admin",
  });
}

export function verifyAdminToken(
  token: string
): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET, {
      algorithms: ["HS256"],
      issuer: "terrasquad",
      audience: "terrasquad-admin",
    }) as jwt.JwtPayload;

    return {
      id: decoded.id as number,
      email: decoded.email as string,
      role: "ADMIN",
    };
  } catch {
    return null;
  }
}

export function signUserToken(
  payload: UserPayload
) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
    issuer: "terrasquad",
    audience: "terrasquad-user",
  });
}

export function verifyUserToken(
  token: string
): UserPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      SECRET,
      {
        algorithms: ["HS256"],
        issuer: "terrasquad",
        audience: "terrasquad-user",
      }
    ) as jwt.JwtPayload;

    return {
      id: decoded.id as number,
      email: decoded.email as string,
      role:
        decoded.role as
          | "USER"
          | "ADMIN"
          | "TRIP_LEADER",
    };
  } catch {
    return null;
  }
}