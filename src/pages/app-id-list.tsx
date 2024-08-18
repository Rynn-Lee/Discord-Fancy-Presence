import styles from '@styles/pages/app-id-list.module.sass'
import appListJson from '../../app-id-list.json'
import Input from '@/components/ui/input'
import { useState } from 'react'
import Icons from '@/components/icons'

export default function AppIdList() {
  const [query, setQuery] = useState('')
  const [copiedId, setCopiedId] = useState('')

  return (
    <div className={styles.container}>
      <div className={styles.searchBlock}>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for an app...'/>
        <span className={styles.note}>Don&apos;t see the game you want? <a href="https://discord.com/developers/applications" target="_blank" className="link">Register your own title</a></span>
      </div>
      <div className={styles.appList}>
        {appListJson.map((item: any) => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 &&  //If satisfies search query
          (
            <div key={`${item.id}`} className={styles.process} style={{justifyContent: 'space-between'}}>
              <span>{item.name}</span>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span>{item.id}</span>
                <button style={{marginLeft: 10, backgroundColor: copiedId == item.id ? '#59772e' : '#3d4052'}} onClick={()=>{navigator.clipboard.writeText(item.id), setCopiedId(item.id)}}>
                  <Icons.clipboard />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}