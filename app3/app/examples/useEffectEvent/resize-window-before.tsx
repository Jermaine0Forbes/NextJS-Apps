"use client"
import { useEffect,  useState } from "react";
import { Flex, Box, Card, Text, Button } from "@radix-ui/themes";
import {EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

// the only allowed types for the different type of visual states
type modes = "small" | "medium" | "large" | "x-large" | "unknown";
type sizes = "text-sm" | "text-base" | "text-lg" | "text-xl";
type colors = "bg-rose-400" | "bg-fuchsia-400" | "bg-violet-400" | "bg-blue-400" | "bg-gray-400"

export default function ResizeWindowBefore() {

  // the visual states
  const [bg, setBg] = useState<colors>("bg-gray-400")
  const [pixels, setPixels] = useState<number>(0)
  const [mode, setMode] = useState<modes>("unknown")
  const [textSize, setTextSize] = useState<sizes>("text-base");
 
  // this toggles the eventlistener to be on/off
  const [open, setOpen] = useState(false);


  // changes all the visual states based on the current window size
  const handleUpdate = (_txt: sizes, _mode: modes, _bg: colors) => {
    setTextSize(_txt);
    setMode(_mode);
    setBg(_bg)
  }

  // the function that's called whenever the window size changes
  const handleResize = () => {
    const widthSize = window.innerWidth;
    // console.log(widthSize);
    const ws = widthSize;
    switch (true) {
      case (ws >= 1400):
        handleUpdate("text-xl", "x-large", "bg-blue-400")
        break;
      case (ws >= 1100):
        handleUpdate("text-lg", "large", "bg-violet-400")
        break;
      case (ws >= 900):
        handleUpdate("text-base", "medium", "bg-fuchsia-400")
        break;
      case (ws < 900):
        handleUpdate("text-sm", "small", "bg-rose-400")
        break;
      default:
        handleUpdate("text-base", "unknown", "bg-gray-400")
    }
    setPixels(ws)

  };

  useEffect(() => {
    console.log("I'm inside the useEffect hook")
    // When the button is clicked to be true it will create the event to the window
    if (open) {
      window.addEventListener("resize", handleResize);
    } else {
      window.removeEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);
  return (
    <section className={bg + " h-screen"}>
      <Box maxWidth="500" width="100%">
        <Card className="mx-auto" variant="classic">
          <Flex gap="2">
            <Box>
              <Text className={textSize} >Window is in {mode} mode.</Text>
              <h2 > Size is currently {pixels} pixels</h2>
            </Box>

          </Flex>
          <Button size="2" variant="soft" onClick={() => setOpen(!open)}>
            {
              open ?
                <>
                  <EyeOpenIcon />
                  Close window resizing
                </>
                :
                <>
                  <EyeClosedIcon />
                  Detect window resizing
                </>
            }
          </Button>
        </Card>
      </Box>
    </section>
  )
}