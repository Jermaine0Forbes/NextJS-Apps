"use client"
import {  Button} from "@radix-ui/themes";
import { seedIt } from "./action";


export default function SeedBtn()
{
      const handleSeeding = async () =>  await seedIt();
    return(
        <Button onClick={handleSeeding}> seed data</Button>
    )
}