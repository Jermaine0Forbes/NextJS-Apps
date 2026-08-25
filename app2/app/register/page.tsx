"use client"

import { Button, TextField, Container, Card } from "@radix-ui/themes";
import { registerUser } from "@/actions/user";
import { useState } from "react";
export default function RegisterPage() {
    const [name, setName] = useState<string>("user1");
    const [email, setEmail] = useState<string>("user1@example.com");
    return (
        <main className="h-screen bg-gray-100">
            <Container size={"1"} className="py-5">
                <Card>
                    <h1 className="text-lg capitalize mb-4">register</h1>
                    <form action={registerUser}>
                        <TextField.Root
                            name="name"
                            placeholder="enter name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-4"
                        />
                        <TextField.Root
                            name="email"
                            placeholder="enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                        />
                        <TextField.Root name="password" defaultValue={"password123!"} className="mb-4" />
                        <Button>Submit</Button>
                    </form>

                </Card>

            </Container>
        </main>
    );
}