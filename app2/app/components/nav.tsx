import { Flex, Box } from "@radix-ui/themes";
import Link from "next/link";
import { cookies } from 'next/headers'
import { jwtVerify } from "jose"; // edge-compatible
import  {JWTPayload} from "@/lib/definitions";
import { useState, useEffect} from "react"
export default async function Nav() {
    const c = await cookies();
    const token = c.get("token")?.value as string;
    const  {payload: {name}} : JWTPayload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if(logout){
            (async () => {
                fetch("api/logout", {
                    method: "POST"
                });

            })()
        }
    }, [logout])
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
            <Box className="px-3">
                <Link href="#" onClick={() => setLogout(true)}>Logout</Link>
            </Box>
        </Flex>
    );
}