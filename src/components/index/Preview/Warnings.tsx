import Icon from "@/assets/icons";

export default function Warnings({styles, isSquare, appInfo}: any){
  return(
    <div className={styles.warnings}>
      {!isSquare.small ? <span><Icon.ExclamationMark /> Small image must be 1:1</span> : <></>}
      {!isSquare.large ? <span><Icon.ExclamationMark /> Large image must be 1:1</span> : <></>}
      {appInfo.largeImageKey && !appInfo.largeImageText ? <span><Icon.ExclamationMark /> Missing text for large image</span> : <></>}
      {appInfo.smallImageKey && !appInfo.smallImageText ? <span><Icon.ExclamationMark /> Missing text for small image</span> : <></>}
      {!appInfo.largeImageKey && appInfo.smallImageKey ? <span><Icon.ExclamationMark />Missing a large image!</span> : <></>}
    </div>
  )
}