import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { JWTPayload, SessionUser } from "@/lib/definitions";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    try {

        if (token) {
            await prisma.$transaction(async (tx) => {
                //  const user : SessionUser = await getUserFromToken(token);
                if(await tx.session.count() > 0){
                    await tx.session.delete({ where: { sessionToken: token } })
                }
                const result = req.cookies.delete("token");
                console.log("token deleted? "+ result);
            });

        } else {
            return NextResponse.json({ ok: false, error: "user is not signed in" }, { status: 401 });
        }
        console.log('Logged out successfully')
        return NextResponse.redirect(new URL("/", req.url), 302);

    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return NextResponse.json({ error: e?.message }, { status: 500 });
        }

        return NextResponse.json({ error: e });
    }


}