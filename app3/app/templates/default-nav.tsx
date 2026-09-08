import { Flex } from "@radix-ui/themes"
import Link from "next/link"
export default function DefaultNav()
{

    return(
        <nav>
            <Flex className="py-3">
                <Link href="/" className="capitalize mx-2">example 1</Link>
                <Link href="/ex2" className="capitalize mx-2">example 2</Link>
                <Link href="/ex3" className="capitalize mx-2">example 3</Link>
            </Flex>
        </nav>
    )
}