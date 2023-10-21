import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/AppLoader'
import useRecorder from '@/hooks/useRecorder'
import '@/styles/index.sass'

export const AppContext: any = createContext('AppContext')

export default function App({ Component, pageProps }: AppProps) {
  const [apps, setApps] = useState([])
  const [settings, setSettings] = useState({
    clientId: "",
    updateRate: 60,
    selected: "Idle"
  })

  useRecorder({watch: apps, name: "apps"}, {watch: settings, name: "settings"})

  return (
    <AppContext.Provider value={{settings, setSettings, setApps, apps}}>
      <AppLayout>
        {!apps.length ? <AppLoader/> : <></>}
        <Component {...pageProps}/>
      </AppLayout>
    </AppContext.Provider>
  )
}
