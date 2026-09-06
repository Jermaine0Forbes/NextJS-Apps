import { useEffect, useEffectEvent, useState } from "react";
import {Flex} from "@radix-ui/themes";
export default function ResizeWindow()
{
  const [bg, setBg] = useState<string>("blue")
  const [pixels, setPixels] = useState<string>("blue")
  const [mode, setMode] = useState<string>("blue")
  const [textSize, setTextSize] = useState<string>("txt-lg");
    const handleResize = useEffectEvent(() => {
      const widthSize = window.innerWidth;
  console.log(widthSize);
      
    
});

useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
    return(
      <section>
        <div>
          <h1 className={textSize}>Window is in {mode} mode. Size is currently {pixels} pixels</h1>
        </div>
      </section>
    )
}