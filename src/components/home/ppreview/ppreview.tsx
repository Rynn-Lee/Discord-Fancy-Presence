import Image from "next/image";
import { useEffect, useState } from "react";
import { checkImage } from "@/utils/checkImage";
import Warnings from "./Warnings";
import styles from './preview.module.sass'


export default function Preview({appInfo}: any){
  const [isSquare, setIsSquare] = useState({
    small: true,
    large: true
  })

  useEffect(()=>{
    checkImage(appInfo.largeImageKey).then((res: boolean) => setIsSquare({...isSquare, large: res}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appInfo.largeImageKey])

  useEffect(()=>{
    checkImage(appInfo.smallImageKey).then((res: boolean) => setIsSquare({...isSquare, small: res}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appInfo.smallImageKey])

  return(
    <div className={styles.preview}>
      <fieldset className={styles.discordRPC}>
        <legend className={styles.previewTitle}>RPC preview</legend>
        <div className={styles.photos}>
          {appInfo.largeImageKey ? <Image src={appInfo?.largeImageKey} width={70} height={70} alt="Img" objectFit="contain"/> : <></>}
          {appInfo.smallImageKey && appInfo.largeImageKey? <Image src={appInfo?.smallImageKey} width={30} height={30} alt="Img" objectFit='contain' className={styles.smallImage}/>  : <></>}
        </div>
        <div className={styles.details}>
          <span className={styles.appName}><b>{appInfo?.name ?? "Idle"}</b></span>
          <span>{appInfo?.details}</span>
          <span>{appInfo?.state}</span>
          {appInfo?.startTimestamp ? <span>01:50:45 elapsed</span> : <></>}
        </div>
      </fieldset>
      <Warnings
        styles={styles}
        isSquare={isSquare}
        appInfo={appInfo}/>
    </div>
  )
}