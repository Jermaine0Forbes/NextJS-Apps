"use server";
import ResizeWindowBefore from "@/examples/useEffectEvent/resize-window-before";
import "@radix-ui/themes/styles.css";
import { getUserNames } from "@/actions";

export default async function Example1()
{


        console.log(await getUserNames());



    return(
        <main>
          <h1>example 1</h1>
           <ResizeWindowBefore/>
        </main>
    )
}