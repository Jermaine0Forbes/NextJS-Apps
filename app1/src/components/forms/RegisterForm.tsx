'use client'
import { useActionState, useEffect, useState } from "react"
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
import { Skeleton } from "../ui/skeleton"
import { Input } from "@/components/ui/input"
import { FormEvent } from "react";
import { registerUser } from "@/lib/action";
import { IRegisterErrors } from "@/lib/definitions"
import InputErrors from "./InputErrors"

export default function RegisterForm() {

    const [ errors, setErrors] = useState<IRegisterErrors| null>(null);
    const [state, action, isPending ] = useActionState(registerUser, null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)

    };

    useEffect(() => {

        if(state ) {
            // const flat = state.error.flatten().fieldErrors;
            // const flat = state.error;
            const flat = state;
            console.log(flat)
            setErrors(flat.errors);
        }
    }, [state]);

    return (
        <form id="register-form" action={action}>
            <FieldGroup>
                <FieldLegend>Register</FieldLegend>
                {
                    isPending?
                    <Skeleton className="h-4 w-[250px]" />
                    :
                    <FieldDescription>this is the register page</FieldDescription>
                }
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input id="username" name="username" required type="text" 
                     defaultValue={state?.values?.username ?? ''}
                    {...(errors?.username && {'aria-invalid': true}) }
                    />
                    <InputErrors errors={errors?.username} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" required type="email" 
                    defaultValue={state?.values?.email ?? ''}
                    {...(errors?.email && {'aria-invalid': true}) }
                    />
                    <InputErrors errors={errors?.email} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" required type="text" 
                    defaultValue={state?.values?.password ?? ''}
                    {...(errors?.password && {'aria-invalid': true}) }
                    />
                    <InputErrors errors={errors?.password} />
                </Field>
            </FieldGroup>
            <Button className="mt-4" >Submit</Button>
        </form>
    )
}