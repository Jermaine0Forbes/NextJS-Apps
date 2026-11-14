import { Card, TextField, Container } from "@radix-ui/themes"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import "@radix-ui/themes/styles.css";

export default function Search()
{
    return(
        <Card>
            <Container>
            <TextField.Root placeholder="Search for movies..." className="w-1/2">
                <TextField.Slot><MagnifyingGlassIcon/></TextField.Slot>
            </TextField.Root>

            </Container>
        </Card>
    )
}