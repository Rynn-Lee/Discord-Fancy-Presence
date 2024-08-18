import { useFish } from "@/hooks/use-fish";

const FISH_SRC =
  "https://utfs.io/f/c07dacc5-c768-422f-bd4c-5c39ae152318-1vdco.mp4";

export default function Fish() {
  const { close } = useFish();

  return (
    <video
      src={FISH_SRC}
      width="100%"
      height="auto"
      autoPlay
      onEnded={close}
      style={{
        position: "fixed",
      }}
    />
  );
}

Fish.disableLayout = true;
