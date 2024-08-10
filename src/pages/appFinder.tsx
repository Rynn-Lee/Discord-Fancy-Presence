import { useState } from "react"
import styles from '@styles/pages/appFinder.module.sass'
import Input from "@/components/ui/Input"
import appListJson from '../../appIdList.json'
import Icons from "@/components/icons"

export default function AppFinder() {
  const [copiedId, setCopiedId] = useState("")
  const [search, setSearch] = useState<any>('')

  return (
    <fieldset className={styles.bind}>
      <div className={styles.top}>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          fancy={{ text: 'Search', placeholder: true }}
        />
      </div>
      <span className={styles.note}>Don&apos;t see the game you want? <a href="https://discord.com/developers/applications" target="_blank" className="link">Register your own title</a></span>
      <div className={styles.processes}>

      {appListJson.map((item: any) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&  //If satisfies search query
        (
          <div key={`${item.id}`} className={styles.process} style={{justifyContent: 'space-between'}}>
            <span>{item.name}</span>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span>{item.id}</span>
              <button style={{marginLeft: 10, backgroundColor: copiedId == item.id ? '#59772e' : '#3d4052'}} onClick={()=>{navigator.clipboard.writeText(item.id), setCopiedId(item.id)}}>
                <Icons.Clipboard />
              </button>
            </div>
          </div>
        )
      )}
    </div>
    </fieldset>
  )
}