import { useEffect, useEffectEvent, useState } from "react";
export default function ResizeWindow()
{
    const handleResize = useEffectEvent(() => {
  console.log(window.innerWidth);
  console.log(currentUserPreference);
});

useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
    return(

    )
}