// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // edge-compatible
import { SessionUser, JWTPayload } from "./lib/definitions";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.redirect(new URL("/login", req.url));
        try {
            const jwt: JWTPayload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
            const { payload: { role } } = jwt;
            console.log("jwt payload")
            console.log(jwt)
            if (role?.name !== "ADMIN") {
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.redirect(new URL("/login", req.url));
        try {
            const jwt: JWTPayload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
            const { payload: { role } } = jwt;
            console.log("jwt payload")
            console.log(jwt)
            if (["USER", "MODERATOR"].includes(role?.name)) {
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };