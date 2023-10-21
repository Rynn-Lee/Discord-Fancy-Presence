import { useContext, useEffect, useState } from "react"
import { AppContext } from "./_app"
import styles from '@styles/pages/index.module.sass'
import Select from "@/components/index/Select"
import AppInfo from "@/components/index/AppInfo/AppInfo"
import Preview from "@/components/index/Preview/Preview"
import { service } from "@/services"
import useRecorder from "@/hooks/useRecorder"

export default function Home() {
  const app: any = useContext(AppContext)
  const [appInfo, setAppInfo] = useState<any>({})

  useEffect(()=>{
    setAppInfo(service.storage.get(app.settings.selected))
  }, [])

  useRecorder({watch: appInfo, name: app.settings.selected})

  if(!app.settings.clientId){return(<>You need to specify Cliend ID first! Go to &apos;Settings&apos; tab</>)}
  return (
    <>
      <Select 
        setAppInfo={setAppInfo}
        styles={styles}
        app={app}/>
      <hr/>
      <div className={styles.index}>
        <AppInfo
          styles={styles}
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Preview
          styles={styles}
          appInfo={appInfo}/>
      </div>
    </>
  )
}