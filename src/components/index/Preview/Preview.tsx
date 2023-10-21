import Image from "next/image";
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from "react";
import { checkImage } from "@/utils/checkImage";
import Warnings from "./Warnings";

export default function Preview({styles, appInfo}: any){
  // const sendrpc = async() => {
  //   await invoke('setactivity',
  //   {
  //     clientId: !appInfo.clientId ? "1118418570855067688" : appInfo.clientId,
  //     details: appInfo.details,
  //     state: appInfo.state,
  //     largeImage: appInfo.largeImageKey,
  //     largeText: appInfo.largeImageText,
  //     smallImage: appInfo.smallImageKey,
  //     smallText: appInfo.smallImageText,
  //     startTimestamp: appInfo.startTimestamp
  //   }
  //   )
  // }
  
  const [isSquare, setIsSquare] = useState({
    small: true,
    large: true
  })

  useEffect(()=>{
    checkImage(appInfo.largeImageKey).then((res: boolean) => setIsSquare({...isSquare, large: res}))
  }, [appInfo.largeImageKey])

  useEffect(()=>{
    checkImage(appInfo.smallImageKey).then((res: boolean) => setIsSquare({...isSquare, small: res}))
  }, [appInfo.smallImageKey])

  return(
    <div className={styles.preview}>
      <fieldset className={styles.discordRPC}>
        <legend className={styles.previewTitle}>RPC preview</legend>
        <div className={styles.photos}>
          <Image src={appInfo?.largeImageKey} width={70} height={70} alt="Img"/>
          <Image src={appInfo?.smallImageKey} width={70} height={70} alt="Img" className={styles.smallImage}/> 
        </div>
        <div className={styles.details}>
          <span className={styles.appName}><b>Fancy DRPC</b></span>
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