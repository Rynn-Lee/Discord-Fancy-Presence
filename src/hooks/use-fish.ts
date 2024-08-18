import { invoke } from "@tauri-apps/api/core";
import { useRef, useState } from "react";

export function useFish() {
  const [clicks, setClicks] = useState(0);
  const timeoutId = useRef<NodeJS.Timeout>();

  const openFish = () => {
    setClicks(-1);
    void invoke("fish", { isOpen: true });
  };

  const closeFish = () => {
    setClicks(0);
    void invoke("fish", { isOpen: false });
  };

  const handleMultipleClicks = () => {
    if (clicks < 0) return;
    clearTimeout(timeoutId.current);
    if (clicks == 10) return openFish();

    setClicks((value) => value + 1);
    timeoutId.current = setTimeout(() => setClicks(0), 300);
  };

  return {
    props: {
      onClick: handleMultipleClicks,
    },
    open: openFish,
    close: closeFish,
  };
}
