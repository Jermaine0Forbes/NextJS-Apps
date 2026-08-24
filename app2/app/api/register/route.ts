import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try  {
      if( name == "" || password == "") throw new Error("some fields are missing");
      if( !email.include('@')) throw new Error("not a valid email address");


      const userExists = await prisma.user.findFirst({ where:{ OR:[ { email: email }, { name:name}]}});
      if (userExists ) {
        return NextResponse.json({ error: "Name or email already exists" }, { status: 401 });
      }
       const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({ data:{
        name,
        email,
        password: hashed ,
        role:{ connect: {
            id: 1
        }},
      },
      include:{
        role:true
      }
    })
    
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

  } catch(e:unknown) {
    if(e instanceof Error){

        console.error(e.message)
        return NextResponse.json({ error: e?.message }, { status: 401 });
    }
  }

}