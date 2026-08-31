import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import  {JWTPayload, SessionUser} from "@/lib/definitions";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: NextRequest)
{   
    const token = req.cookies.get("token")?.value;

    if(token){
        await prisma.$transaction(async (tx) =>{
        //  const user : SessionUser = await getUserFromToken(token);
        await  tx.session.delete({where: {sessionToken: token}})
            req.cookies.delete("token");
        });

    }else{
        return NextResponse.json({ok: false, error: "user is not signed in"}, {status: 401});
    }

    return NextResponse.json({ message: 'Logged out successfully' })

}