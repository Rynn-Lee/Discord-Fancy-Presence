import { useState } from "react"
import styles from '@styles/pages/index.module.sass'

export default function Home({settings}: any) {
  const [selected, setSelected] = useState<any>()

  if(!settings.clientId){return(<>You need to specify Cliend ID first! Go to &apos;Settings&apos; tab</>)}
  return (
    <>
      <select defaultValue={"Idle"} onChange={(e)=>setSelected(e.target.value)}>
        <option value={"Idle"}>Idle</option>
      </select><hr/>

      <div className={styles.index}>
        <div>
        </div>
      </div>
    </>
  )
}
