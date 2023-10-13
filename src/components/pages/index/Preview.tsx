import Icon from "@/assets/icons";
import Image from "next/image";

export default function Preview({styles, appInfo, appInfoCopy, saveApp, photoInfo}: any){
  return(
    <div className={styles.preview}>
      <fieldset className={styles.discordRPC}>
        <legend>RPC preview</legend>
        <div className={styles.photos}>
          {appInfo.largeImageKey && photoInfo.large ? <Image src={appInfo.largeImageKey} width={70} height={70} alt="Img"/> : <></>}
          {appInfo.largeImageKey && appInfo.smallImageKey && photoInfo.small 
            ? <Image src={appInfo.smallImageKey} width={70} height={70} alt="Img" className={styles.smallImage}/> 
            : <></>}
        </div>
        <div className={styles.details}>
          <span className={styles.appName}><b>Fancy DRPC</b></span>
          <span>{appInfo.details}</span>
          <span>{appInfo.state}</span>
          <span>01:50:45 elapsed</span>
        </div>
      </fieldset>
      {JSON.stringify(appInfo) != appInfoCopy 
        ? <button onClick={saveApp}><Icon.Check/><span>Save Changes!</span></button> 
        : <></>}
      <fieldset className={styles.warnings}>
        {!appInfo.largeImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Missing &quot;Large Image&quot; URL!</span> : <></>}
        {!appInfo.smallImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Missing &quot;Small Image&quot; URL!</span> : <></>}
        {!photoInfo.large && appInfo.largeImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Large image must be square (1x1)!</span> : <></>}
        {!photoInfo.small && appInfo.smallImageKey ? <span className={styles.warn}><Icon.ExclamationMark/> Small image must be square (1x1)!</span> : <></>}
      </fieldset>
    </div>
  )
}