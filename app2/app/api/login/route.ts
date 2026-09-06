import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email }, include: {role:true} });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ ok: false,  error: "Invalid credentials" }, { status: 401 });
  }
  const sessionUser = { id: user.id, name:user.name, email: user.email, role: user.role }
  const token = signToken(sessionUser);

  await prisma.session.create({data:{
        sessionToken: token,
        user: {
            connect:{
                id: user.id
            }
        },
        expires: new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000),
      }});

  console.log("Login successful")
  console.log(sessionUser)

  const res = NextResponse.json({ ok: true, user: sessionUser });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}