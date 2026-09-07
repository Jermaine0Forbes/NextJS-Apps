"use client"
import { useEffect, useEffectEvent, useState } from "react";
import { Flex, Box, Card, Text } from "@radix-ui/themes";

type modes = "small" | "medium" | "large" | "x-large" | "unknown";
type sizes = "text-sm" | "text-base" | "text-lg" | "text-xl";
type colors = "bg-rose-400" | "bg-fuchsia-400" | "bg-violet-400" | "bg-blue-400" | "bg-gray-400"

export default function ResizeWindow() {
  const [bg, setBg] = useState<colors>("bg-gray-400")
  const [pixels, setPixels] = useState<number>(0)
  const [mode, setMode] = useState<modes>("unknown")
  const [textSize, setTextSize] = useState<sizes>("text-base");

  const handleUpdate = (_txt: sizes, _mode: modes, _bg: colors) => {
    setTextSize(_txt);
    setMode(_mode);
    setBg(_bg)
  }

  const handleResize = useEffectEvent(() => {
    const widthSize = window.innerWidth;
    console.log(widthSize);
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

  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section className={bg + " h-screen"}>
      <Box maxWidth="900" minWidth="500">
      <Card  className="mx-auto" variant="classic">
        <Flex gap="2">
          <Box>
            <Text className={textSize} weight="bold">Window is in {mode} mode.</Text>
            <h2 > Size is currently {pixels} pixels</h2>
          </Box>

        </Flex>
      </Card>

      </Box>
    </section>
  )
}