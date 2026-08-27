
import jwt from "jsonwebtoken";
import { prisma } from "./db";
import {SessionUser} from "./definitions";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;


export function signToken(user: SessionUser) {
  console.log("jwt")
  console.log(JWT_SECRET)
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export async function getUserFromToken(token?: string): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionUser;
    if (typeof decoded.id !== "number") throw new Error("decoded id is not a number");
    // re-fetch to make sure role hasn't changed / user still exists
    const user = await prisma.user.findUnique({ where: { id: decoded.id }, include: {role:true} });
    if (!user) return null;
    if (typeof user.id !== "number") throw new Error("user id is not a number");
    return { id: user.id, name:user.name, email: user.email, role: user.role };
  } catch {
    return null;
  }
}