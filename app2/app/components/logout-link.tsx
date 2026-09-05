"use client"
import { useState, useEffect} from "react"
import { logoutUser } from "@/actions/user";
// import Link from "next/link";
import { Button, TextField, Container, Card } from "@radix-ui/themes";


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
        <Button loading={logout} onClick={() => setLogout(true)}>Logout</Button>
    )
}