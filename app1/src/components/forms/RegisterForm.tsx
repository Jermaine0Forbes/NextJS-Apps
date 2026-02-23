'use client'
import { useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    // FieldSeparator,
    // FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormEvent } from "react";
import { registerUser } from "@/lib/action";

export default function RegisterForm() {

    const [state, action, isPending ] = useActionState(registerUser, null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)

    };

    useEffect(() => {

        if(state) {
            console.log(state)
        }
    }, [state]);

    return (
        <form id="register-form" action={action}>
            <FieldGroup>
                <FieldLegend>Register</FieldLegend>
                <FieldDescription>this is the register page</FieldDescription>
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input id="username" name="username" required type="text" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" required type="email" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" required type="text" />
                </Field>
            </FieldGroup>
            <Button className="mt-4" >Submit</Button>
        </form>
    )
}