import { memo, useEffect } from "react"

const AppLoader = memo(function AppLoader({storage, settings, setSettings}: any){
  useEffect(()=>{
    setSettings(storage.get('settings'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    console.log(settings)
    settings.clientId && storage.set('settings', settings)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  
  return(null)
})

export default AppLoader