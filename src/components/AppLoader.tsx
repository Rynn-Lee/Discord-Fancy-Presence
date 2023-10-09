import { memo, useEffect, useState } from "react"

const AppLoader = memo(function AppLoader({storage, settings, setSettings}: any){
  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(()=>{
    setSettings(storage.get('settings', {
      clientId: '1118418570855067688',
      updateRate: 60
    }))
    setFirstLoad(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    !firstLoad && storage.set('settings', settings)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  
  return(null)
})

export default AppLoader