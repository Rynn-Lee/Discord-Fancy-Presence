import Image from "next/image";
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from "react";
import { checkImage } from "@/utils/checkImage";
import Warnings from "./Warnings";

const handleSendRpc = async (appInfo: any) => {
  await invoke('update_activity', {
    activityPayload: {
      details: appInfo.details,
      state: appInfo.state,
      largeImage: appInfo.largeImageKey,
      largeText: appInfo.largeImageText,
      smallImage: appInfo.smallImageKey,
      smallText: appInfo.smallImageText,
      startTimestamp: appInfo.startTimestamp
    }
  })
}
const handleUpdateClientId = async (appInfo: any) => {
  await invoke('update_activity_client_id', {
    clientId: appInfo.clientId ? appInfo.clientId : '1118418570855067688'
  })
}

export default function Preview({styles, appInfo}: any){
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
          {appInfo.largeImageKey ? <Image src={appInfo?.largeImageKey} width={70} height={70} alt="Img"/> : <></>}
          {appInfo.smallImageKey ? <Image src={appInfo?.smallImageKey} width={70} height={70} alt="Img" className={styles.smallImage}/>  : <></>}
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
      <button onClick={()=>handleUpdateClientId(appInfo)}>Send ID</button>
      <button onClick={()=>handleSendRpc(appInfo)}>Send RPC</button>
    </div>
  )
}