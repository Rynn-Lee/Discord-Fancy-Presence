import Icon from "@/assets/icons";

export default function Warnings({styles, isSquare, appInfo}: any){
  return(
    <div className={styles.warnings}>
      {!isSquare.small ? <span><Icon.ExclamationMark />[small image] It's better to use 1:1 ratio</span> : <></>}
      {!isSquare.large ? <span><Icon.ExclamationMark />[large image] It's better to use 1:1 ratio</span> : <></>}
      {!appInfo.largeImageKey && appInfo.smallImageKey ? <span><Icon.ExclamationMark />Missing a large image!</span> : <></>}
    </div>
  )
}