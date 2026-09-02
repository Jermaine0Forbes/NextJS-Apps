"use client"
import { useState, useEffect} from "react"
import { logoutUser } from "@/actions/user";
import Link from "next/link";


export default function LogoutLink()
{
        const [logout, setLogout] = useState(false);

    useEffect(() => {

        const onLogout = async () => {
            await logoutUser();
        };
        
        if(logout){
          onLogout();
        }
    }, [logout])
    return(
        <Link href="#" onClick={() => setLogout(true)}>Logout</Link>
    )
}