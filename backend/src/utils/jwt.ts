import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { IJWTPayload } from "../types/index";

export const generateToken = (
  payload: Omit<IJWTPayload, "iat" | "exp">,
  isAdmin = false,
): string => {
  const secret = isAdmin ? env.JWT_ADMIN_SECRET : env.JWT_SECRET;
  const expiresIn = isAdmin ? env.JWT_ADMIN_EXPIRE_IN : env.JWT_EXPIRE_IN;

  return jwt.sign(payload, secret, { expiresIn } as any);
};

export const verifyToken = (token: string, isAdmin = false): IJWTPayload => {
  const secret = isAdmin ? env.JWT_ADMIN_SECRET : env.JWT_SECRET;
  return jwt.verify(token, secret) as IJWTPayload;
};

export const decodeToken = (token: string): IJWTPayload | null => {
  try {
    return jwt.decode(token) as IJWTPayload;
  } catch {
    return null;
  }
};
