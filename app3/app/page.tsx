import ResizeWindowBefore from "@/examples/useEffectEvent/resize-window-before";
import "@radix-ui/themes/styles.css";
import { Heading } from "@radix-ui/themes";
export default function Example1()
{

    return(
        <main>
            <Heading>Without useEffectEvent</Heading>
           <ResizeWindowBefore/>
        </main>
    )
}