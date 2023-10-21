import Icon from '@/assets/icons'
import Image from 'next/image'
import { invoke } from '@tauri-apps/api/tauri'
import { emit } from '@tauri-apps/api/event'

export default function Preview({
  styles,
  appInfo,
  appInfoCopy,
  saveApp,
  photoInfo
}: any) {
  const handleSendRpc = async () => {
    // await invoke('setactivity',
    // {
    //   clientId: !appInfo.clientId ? "1118418570855067688" : appInfo.clientId,
    //   details: appInfo.details,
    //   state: appInfo.state,
    //   largeImage: appInfo.largeImageKey,
    //   largeText: appInfo.largeImageText,
    //   smallImage: appInfo.smallImageKey,
    //   smallText: appInfo.smallImageText,
    //   startTimestamp: appInfo.startTimestamp
    // }
    // )
    // emit('set_activity')
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

  const handleUpdateClientId = async () => {
    await invoke('update_activity_client_id', {
      clientId: '1118418570855067688'
    })
  }

  const stoprpc = async () => {
    await invoke('stoprpc')
  }

  return (
    <div className={styles.preview}>
      <fieldset className={styles.discordRPC}>
        <legend>RPC preview</legend>
        <div className={styles.photos}>
          {appInfo.largeImageKey && photoInfo.large ? (
            <Image
              src={appInfo.largeImageKey}
              width={70}
              height={70}
              alt="Img"
            />
          ) : (
            <></>
          )}
          {appInfo.largeImageKey && appInfo.smallImageKey && photoInfo.small ? (
            <Image
              src={appInfo.smallImageKey}
              width={70}
              height={70}
              alt="Img"
              className={styles.smallImage}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.details}>
          <span className={styles.appName}>
            <b>Fancy DRPC</b>
          </span>
          <span>{appInfo.details}</span>
          <span>{appInfo.state}</span>
          {appInfo.startTimestamp ? <span>01:50:45 elapsed</span> : <></>}
        </div>
      </fieldset>
      {JSON.stringify(appInfo) != appInfoCopy ? (
        <button onClick={saveApp}>
          <Icon.Check />
          <span>Save Changes!</span>
        </button>
      ) : (
        <></>
      )}
      <fieldset className={styles.warnings}>
        {!appInfo.largeImageKey ? (
          <span className={styles.warn}>
            <Icon.ExclamationMark /> Missing &quot;Large Image&quot; URL!
          </span>
        ) : (
          <></>
        )}
        {!appInfo.smallImageKey ? (
          <span className={styles.warn}>
            <Icon.ExclamationMark /> Missing &quot;Small Image&quot; URL!
          </span>
        ) : (
          <></>
        )}
        {!photoInfo.large && appInfo.largeImageKey ? (
          <span className={styles.warn}>
            <Icon.ExclamationMark /> Large image must be square (1x1)!
          </span>
        ) : (
          <></>
        )}
        {!photoInfo.small && appInfo.smallImageKey ? (
          <span className={styles.warn}>
            <Icon.ExclamationMark /> Small image must be square (1x1)!
          </span>
        ) : (
          <></>
        )}
      </fieldset>

      <button onClick={handleSendRpc}>
        <Icon.Check />
        <span>Send rpc</span>
      </button>
      <button onClick={handleUpdateClientId}>
        <Icon.Check />
        <span>Update Client Id</span>
      </button>
    </div>
  )
}
