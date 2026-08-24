import { TextField, Button } from "@radix-ui/themes";

export default function LoginPage() {
    return (
        <main>
            <h1>login</h1>
            <p>This is the unique content for the dashboard route.</p>
            <form>
                <TextField.Root name="" placeholder="Search the docs…" />
                <TextField.Root name="" placeholder="Search the docs…" />
                <TextField.Root name="" placeholder="Search the docs…" />
                <Button>Submit</Button>
            </form>

        </main>
    );
}