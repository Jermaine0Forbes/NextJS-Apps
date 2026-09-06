
import { Flex, Box } from "@radix-ui/themes";
import Link from "next/link";
import { cookies } from 'next/headers'
import { jwtVerify } from "jose"; // edge-compatible
import { JWTPayload } from "@/lib/definitions";
// import { useState, useEffect} from "react"
// import { logoutUser } from "@/actions/user";
import LogoutLink from "./logout-link";

export default async function Nav() {
    const c = await cookies();
    let name = null;
    const token = c.get("token")?.value as string;
    if (token) {
        const { payload }: JWTPayload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        name = payload.name;
    }

    //   console.log("jwt payload")
    //   console.log(payload)
    return (
        <Flex className="bg-white py-2 border   border-gray-100 border-b-gray-500">
            {
                name && (

                    <Box className="px-3">
                        <h1> {name}</h1>
                    </Box>

                )

            }
            <Box className="px-3">
                <Link href="/login">Login</Link>
            </Box>
            <Box className="px-3">
                <Link href="/register">Register</Link>
            </Box>
            {
                name && (
                    <Box className="px-3">
                        <LogoutLink />
                    </Box>
                )
            }
        </Flex>
    );
}