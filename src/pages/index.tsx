import { useContext, useEffect, useState } from "react"
import styles from '@styles/pages/index.module.sass'
import { service } from "@/services"
import { AppContext } from "./_app"
import Select from "@/components/pages/index/Select"
import AppInfo from "@/components/pages/index/AppInfo"
import Preview from "@/components/pages/index/Preview"
import { getMeta } from "@/utils/getMeta"

export default function Home() {
  const [selected, setSelected] = useState<any>("Idle")
  const [isPhotoSquare, setIsPhotoSquare] = useState<any>({
    large: true,
    small: true
  })
  const [appInfo, setAppInfo] = useState<any>({})
  const [appInfoCopy, setAppInfoCopy] = useState<any>({})
  const app: any = useContext(AppContext)
  
  const refresh = () => app.setApps(service.storage.get('apps'))

  useEffect(()=>{
    const info = service.storage.get(selected)
    setAppInfo(info)
    setAppInfoCopy(JSON.stringify(info))
    refresh()
  }, [])
  
  useEffect(()=>{
    if(!appInfo.largeImageKey){return}
    getMeta(appInfo.largeImageKey).then((res: boolean)=>setIsPhotoSquare({...isPhotoSquare, large: res}))
    getMeta(appInfo.smallImageKey).then((res: boolean)=>setIsPhotoSquare({...isPhotoSquare, small: res}))
  }, [appInfo.largeImageKey, appInfo.smallImageKey])

  const selectApp = (app: string) => {
    setSelected(app)
    const info = service.storage.get(app)
    setAppInfo(info)
    setAppInfoCopy(JSON.stringify(info))
  }

  const saveApp = () => {
    service.storage.set(selected, appInfo)
    setAppInfoCopy(JSON.stringify(appInfo))
  }

  const removeApp = (name: string) => {
    if(name == "Idle"){return}
    app.setApps(service.storage.remove('apps', name))
    service.storage.removeWhole(name)
    selectApp("Idle")
  }

  if(!app.settings.clientId){return(<>You need to specify Cliend ID first! Go to &apos;Settings&apos; tab</>)}
  return (
    <>
      <Select 
        styles={styles}
        app={app}
        removeApp={removeApp}
        selectApp={selectApp}
        selected={selected}/>
      <hr/>
      <div className={styles.index}>
        <AppInfo
          styles={styles}
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Preview
          styles={styles}
          appInfo={appInfo}
          appInfoCopy={appInfoCopy}
          saveApp={saveApp}
          isPhotoSquare={isPhotoSquare}/>
      </div>
    </>
  )
}