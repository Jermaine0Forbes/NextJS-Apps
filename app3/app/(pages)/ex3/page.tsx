import ResizeWindowBefore2 from "@/examples/useEffectEvent/resize-window-before-2"
import { Heading, Em } from "@radix-ui/themes";

export default function Example3()
{
    return(
        <main>
            <Heading>Without useEffectEvent, but <Em>detect</Em> as a state dependency</Heading>
          <ResizeWindowBefore2/>
        </main>
    )
}