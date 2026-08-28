"use client"

import { Button, TextField, Container, Card } from "@radix-ui/themes";
import { registerUser } from "@/actions/user";
import { useState, useActionState } from "react";

export default function LoginPage() {
    const [name, setName] = useState<string>("user1");
    const [ state, action, pending] = useActionState(registerUser, {})
    console.log("state")
    console.log(state)
    return (
        <main className="h-screen bg-gray-100">
            <Container size={"1"} className="py-5">
                <Card>
                    <h1 className="text-lg capitalize mb-4">Login</h1>
                    <form action={action}>
                        <TextField.Root
                            name="name"
                            placeholder="enter name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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