import { Button, TextField, Flex, Box, Card } from "@radix-ui/themes";
import Link from "next/link";

export default function Nav() {
    return (
        <Flex className="bg-white py-2 border   border-gray-100 border-b-gray-500">
            <Box className="px-3">
                <Link href="/login">Login</Link>
            </Box>           
             <Box className="px-3">
                <Link href="/register">Register</Link>
            </Box>
        </Flex>
    );
}