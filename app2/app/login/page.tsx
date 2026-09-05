"use client"

import { Button, TextField, Container, Card } from "@radix-ui/themes";
import { loginUser} from "@/actions/user";
import { useState, useActionState, useEffect } from "react";
import { authResponse } from "@/lib/definitions";

const initState: authResponse = { ok: false}
export default function LoginPage() {
    const [email, setEmail] = useState<string>("user1@example.com");
    const [ state, action, pending] = useActionState(loginUser, initState)
    console.log("state")
    console.log(state)

    useEffect(() => {
        if(state?.user){
            
        }
    },[state])
    return (
        <main className="h-screen bg-gray-100">
            <Container size={"1"} className="py-5">
                <Card>
                    <h1 className="text-lg capitalize mb-4">Login</h1>
                    <form action={action}>
                        <TextField.Root
                            name="email"
                            placeholder="enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                        />
                        <TextField.Root name="password" defaultValue={"password123!"} className="mb-4" />
                        <Button loading={pending}>Submit</Button>
                    </form>

                </Card>

            </Container>
        </main>
    );
}