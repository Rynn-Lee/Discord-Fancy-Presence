import { useState } from "react"
import styles from "@styles/components/tabs.module.sass"

export default function Tabs({children, titles}: any){
  const [tab, setTab] = useState(0)

  return(
    <div className={styles.tabs}>
      <div className={styles.tabPanel}>
        {titles.map((title: string, index: number)=>(
          <span
            key={title}
            className={`${styles.tab} ${tab == index ? styles.active : ""}`}
            onClick={()=>setTab(index)}>{title}</span>
        ))}
      </div>

      {children[tab]}
    </div>
  )
}