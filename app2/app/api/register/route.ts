import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const userExists = await prisma.user.findFirst({ where:{ OR:[ { email: email }, { name:name}]}});
  if (userExists ) {
    return NextResponse.json({ error: "Name or email already exists" }, { status: 401 });
  }
 
  const user = await prisma.user.create({ data:{
    name,
    email,
    password: hashed ,
    roleId, 1,
  }})

  const token = signToken({ id: user.id, name:user.name, email: user.email, role: user.role });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}