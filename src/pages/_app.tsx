import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/AppLoader'
import useRecorder from '@/hooks/useRecorder'
import '@/styles/index.sass'
import { useDirector } from '@/hooks/useDirector'

export const AppContext: any = createContext('AppContext')
export const DirectorContext: any = createContext('DirectorContext')

export default function App({ Component, pageProps }: AppProps) {
  const [apps, setApps] = useState([])
  const [selectedApp, setSelectedApp] = useState<string>("Idle")
  const [settings, setSettings] = useState({ //somehow breaks everything if not specified
    clientId: "",
    updateRate: 60
  })

  const director = useDirector(settings, apps)
  useRecorder({watch: apps, name: "apps"}, {watch: settings, name: "settings"})

  return (
    <DirectorContext.Provider value={{director}}>
      <AppContext.Provider value={{setSettings, settings, setApps, apps, setSelectedApp, selectedApp}}>
        <AppLayout>
          {!apps.length ? <AppLoader/> : <></>}
          <Component {...pageProps}/>
        </AppLayout>
      </AppContext.Provider>
    </DirectorContext.Provider>
  )
}
