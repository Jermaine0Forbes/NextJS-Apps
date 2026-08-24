import { Button, TextField } from "@radix-ui/themes";

export default function RegisterPage() {
  return (
    <main>
      <h1>register</h1>
            <form>
                <TextField.Root name="" placeholder="Search the docs…" />
                <TextField.Root name="" placeholder="Search the docs…" />
                <TextField.Root name="" placeholder="Search the docs…" />
                <Button>Submit</Button>
            </form>
    </main>
  );
}