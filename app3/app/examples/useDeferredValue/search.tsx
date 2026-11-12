import { Card, TextField } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css";

export default function Search()
{
    return(
        <Card>
            <TextField.Root>
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
        </Card>
    )
}