import Image from "next/image";
import { useEffect, useState } from "react";
import { checkImage } from "@/utils/checkImage";
import Warnings from "./warnings";
import styles from "./preview.module.sass";

interface ActivityPreviewProps {
  payload: any; // TODO: change to ActivityPayload
}

export default function ActivityPreview({ payload }: ActivityPreviewProps) {
  const [isSquare, setIsSquare] = useState({
    small: true,
    large: true,
  });

  useEffect(() => {
    checkImage(payload.largeImageKey).then((res: boolean) =>
      setIsSquare({ ...isSquare, large: res }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.largeImageKey]);

  useEffect(() => {
    checkImage(payload.smallImageKey).then((res: boolean) =>
      setIsSquare({ ...isSquare, small: res }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.smallImageKey]);

  return (
    <div className="flex flex-col">
      <label className="text-fp-accent mb-3">Activity Preview</label>
      <div className="flex flex-row gap-4">
        <div className="relative">
          {payload.largeImageKey && (
            <Image
              src={payload?.largeImageKey}
              width={70}
              height={70}
              alt="Img"
              objectFit="contain"
            />
          )}
          {payload.smallImageKey && payload.largeImageKey && (
            <Image
              src={payload?.smallImageKey}
              width={30}
              height={30}
              alt="Img"
              objectFit="contain"
              className="absolute -bottom-1 left-11 h-8 w-8"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-5">{payload?.name}</span>
          <span className="text-sm leading-4">{payload?.details}</span>
          <span className="text-sm leading-4">{payload?.state}</span>
          {payload?.startTimestamp && (
            <span className="text-sm leading-4">01:50:45 elapsed</span>
          )}
        </div>
      </div>
      <Warnings styles={styles} isSquare={isSquare} appInfo={payload} />
    </div>
  );
}
