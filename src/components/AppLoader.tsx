import { service } from "@/services"
import { memo, useContext, useEffect, useState } from "react"
import { AppContext } from "../pages/_app"

const AppLoader = memo(function AppLoader(){
  const app: any = useContext(AppContext)

  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(()=>{
    app.setSettings(service.storage.get('settings', {
      clientId: '1118418570855067688',
      updateRate: 60,
    }))
    app.setApps(service.storage.get('apps', ["Idle"]))
    service.storage.get("Idle", {
      clientId: "",
      details: "Details",
      state: "State",
      priority: "1",
      startTimestamp: false,
      largeImageKey: "",
      largeImageText: "",
      smallImageKey: "",
      smallImageText: "",
    })
    setFirstLoad(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    !firstLoad && service.storage.set('settings', app.settings)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.settings])

  useEffect(()=>{
    !firstLoad && service.storage.set('apps', app.apps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.apps])
  
  return(null)
})

export default AppLoader