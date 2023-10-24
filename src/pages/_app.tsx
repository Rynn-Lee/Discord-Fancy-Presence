import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/AppLoader'
import useRecorder from '@/hooks/useRecorder'
import '@/styles/index.sass'

export const AppContext: any = createContext('AppContext')

export default function App({ Component, pageProps }: AppProps) {
  const [apps, setApps] = useState([])
  const [selectedApp, setSelectedApp] = useState<string>("Idle")
  const [settings, setSettings] = useState({ //somehow breaks everything if not specified
    clientId: "",
    updateRate: 60
  })

  useRecorder({watch: apps, name: "apps"}, {watch: settings, name: "settings"})

  return (
    <AppContext.Provider value={{setSettings, settings, setApps, apps, setSelectedApp, selectedApp}}>
      <AppLayout>
        {!apps.length ? <AppLoader/> : <></>}
        <Component {...pageProps}/>
      </AppLayout>
    </AppContext.Provider>
  )
}
