import { service } from "@/services"
import { useContext, useEffect } from "react"
import { AppContext } from "../pages/_app"
import { activityPlaceholder } from "@/dump/dummy"

export default function AppLoader(){
  const app: any = useContext(AppContext)

  useEffect(()=>{
    app.setSettings(service.storage.get('settings', {
      clientId: '1118418570855067688',
      updateRate: 60,
      selected: "Idle"
    }))
    app.setApps(service.storage.get('apps', ["Idle"]))
    service.storage.get("Idle", activityPlaceholder)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}