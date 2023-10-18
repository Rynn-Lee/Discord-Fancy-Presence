import Icon from "@/assets/icons";
import Image from "next/image";
import { invoke } from '@tauri-apps/api/tauri'

export default function Preview({styles, appInfo, appInfoCopy, saveApp, isPhotoSquare}: any){
  const sendrpc = async() => {
    await invoke('setactivity',
    {
      clientId: !appInfo.clientId ? "1118418570855067688" : appInfo.clientId,
      details: appInfo.details,
      state: appInfo.state,
      largeImage: appInfo.largeImageKey,
      largeText: appInfo.largeImageText,
      smallImage: appInfo.smallImageKey,
      smallText: appInfo.smallImageText,
      startTimestamp: appInfo.startTimestamp
    }
    )
  }

  return(
    <div className={styles.preview}>
      <fieldset className={styles.discordRPC}>
        <legend className={styles.previewTitle}>RPC preview</legend>
        <div className={styles.photos}>
          {appInfo.largeImageKey && isPhotoSquare.large ? <Image src={appInfo.largeImageKey} width={70} height={70} alt="Img"/> : <></>}
          {appInfo.largeImageKey && appInfo.smallImageKey && isPhotoSquare.small 
            ? <Image src={appInfo.smallImageKey} width={70} height={70} alt="Img" className={styles.smallImage}/> 
            : <></>}
        </div>
        <div className={styles.details}>
          <span className={styles.appName}><b>Fancy DRPC</b></span>
          <span>{appInfo.details}</span>
          <span>{appInfo.state}</span>
          {appInfo.startTimestamp ? <span>01:50:45 elapsed</span> : <></>}
        </div>
      </fieldset>
      {JSON.stringify(appInfo) != appInfoCopy 
        ? <button onClick={saveApp}><Icon.Check/><span>Save Changes</span></button> 
        : <></>}
      <fieldset className={styles.warnings}>
        {appInfo.largeImageKey && !appInfo.largeImageText ? <span className={styles.warn}><Icon.ExclamationMark/> Missing &quot;Large Image&quot; Text!</span> : <></>}
        {appInfo.smallImageKey && !appInfo.smallImageText ? <span className={styles.warn}><Icon.ExclamationMark/> Missing &quot;Small Image&quot; Text!</span> : <></>}
        {!isPhotoSquare.large && appInfo.largeImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Large image must be square (1x1)!</span> : <></>}
        {!isPhotoSquare.small && appInfo.smallImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Small image must be square (1x1)!</span> : <></>}
      </fieldset>
    </div>
  )
}