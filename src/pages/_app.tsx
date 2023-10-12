import type { AppProps } from 'next/app'
import AppLayout from '@/layouts/AppLayout'
import { createContext, useEffect, useState } from 'react'
import '@/styles/index.sass'
import AppLoader from '@/components/AppLoader'
import { SettingsType } from '@/lib/api/types'

export const AppContext: any = createContext('AppContext')

export default function App({ Component, pageProps }: AppProps) {
  const [apps, setApps] = useState([])
  const [settings, setSettings] = useState<SettingsType>({
    clientId: "",
    updateRate: 60
  })

  return (
    <AppContext.Provider value={{settings, setSettings, setApps, apps}}>
      <AppLayout>
        <AppLoader/>
        <Component {...pageProps}/>
      </AppLayout>
    </AppContext.Provider>
  )
}
