import { useEffect, useState } from "react"
import styles from '@styles/pages/index.module.sass'
import Icon from "@/assets/icons"

export default function Home({storage, settings}: any) {
  const [selected, setSelected] = useState<any>("Idle")
  const [processes, setProcesses] = useState([])

  const refresh = () => setProcesses(storage.get('registred', []))
  const remove = (name: string) => {
    if(name == "Idle"){return}
    setSelected("Idle")
    setProcesses(storage.remove('registred', name))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>refresh(), [])

  if(!settings.clientId){return(<>You need to specify Cliend ID first! Go to &apos;Settings&apos; tab</>)}
  return (
    <>
      <div className={styles.selectApp}>
        <select defaultValue={"Idle"} onChange={(e)=>setSelected(e.target.value)}>
          <option value={"Idle"}>Idle</option>
          {processes?.map((item: string) => <option key={item} value={item}>{item}</option>)}
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
