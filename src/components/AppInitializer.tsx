import { service } from "@/services"
import { useContext, useEffect } from "react"
import { AppContext } from "../pages/_app"
import { activityPlaceholder } from "@/dump/dummy"

export default function AppLoader(){
  const app: any = useContext(AppContext)

  useEffect(()=>{
    service.storage.get("Idle", activityPlaceholder("Idle", 1))
    app.setRegisteredApps(service.storage.get('registeredApps', ["Idle"]))
    app.setSettings(service.storage.get('settings', {
      clientId: '1118418570855067688',
      updateRate: 60
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}