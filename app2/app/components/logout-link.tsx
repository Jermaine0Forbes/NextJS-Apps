"use client"
import { useState, useEffect} from "react"
import { logoutUser } from "@/actions/user";
// import Link from "next/link";
import { Button, TextField, Container, Card } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';


export default function LogoutLink()
{
        const [logout, setLogout] = useState(false);
        const router = useRouter();

    useEffect(() => {

        const onLogout = async () => {
          const result =  await logoutUser();
          if(result.ok && result.redirected) router.push("/");

        };
        
        if(logout){
          onLogout();
        }
    }, [logout])
    return(
        <Button loading={logout} onClick={() => setLogout(true)}>Logout</Button>
    )
}