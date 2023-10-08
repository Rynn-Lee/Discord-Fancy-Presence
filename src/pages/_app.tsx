import type { AppProps } from 'next/app'
import useStorage from '@/hooks/useStorage'
import AppLayout from '@/layouts/AppLayout'
import { useState } from 'react'
import '@/styles/index.sass'
import AppLoader from '@/components/AppLoader'

export default function App({ Component, pageProps }: AppProps) {
  const storage = useStorage()
  const [settings, setSettings] = useState({
    clientId: ""
  })

  return (
    <AppLayout>
      <AppLoader storage={storage} settings={settings} setSettings={setSettings}/>
      <Component {...pageProps} storage={storage} settings={settings} setSettings={setSettings}/>
    </AppLayout>
  )
}
