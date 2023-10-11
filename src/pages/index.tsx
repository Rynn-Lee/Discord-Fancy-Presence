import { useContext, useEffect, useState } from "react"
import styles from '@styles/pages/index.module.sass'
import Icon from "@/assets/icons"
import { service } from "@/services"
import { AppContext } from "./_app"

export default function Home() {
  const [selected, setSelected] = useState<any>("Idle")
  const app: any = useContext(AppContext)
  
  const refresh = () => app.setApps(service.storage.get('apps', ["Idle"]))

  const remove = (name: string) => {
    if(name == "Idle"){return}
    setSelected("Idle")
    app.setApps(service.storage.remove('apps', name))
  }

  useEffect(()=>refresh(), [])

  if(!app.settings.clientId){return(<>You need to specify Cliend ID first! Go to &apos;Settings&apos; tab</>)}
  return (
    <>
      <div className={styles.selectApp}>
        <select defaultValue={"Idle"} onChange={(e)=>setSelected(e.target.value)}>
          {app?.apps?.map((item: string) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button onClick={()=>remove(selected)}><Icon.Remove/></button>
      </div>
      <hr/>
      <div className={styles.index}>
        <div>
          aboba
        </div>
      </div>
    </>
  )
}
