import { useContext, useEffect, useState } from 'react'
import styles from '@styles/pages/bind.module.sass'
import Input from '@/components/Custom/Input'
import { service } from '@/services'
import { AppContext } from "./_app"
import Icon from '@/assets/icons'

export default function Bind() {
  const [processes, setProcesses] = useState<any>([])
  const [search, setSearch] = useState<any>('')
  const [showAll, setShowAll] = useState(false)
  const app: any = useContext(AppContext)

  const handleGetProcesses = async () => {
    const processes = await service.task.getList()
    setProcesses(processes)
  }
  useEffect(() => {
    handleGetProcesses()
  }, [])

  const addProcess = (name: string) => {
    if (!app.apps.includes(name)) {
      service.storage.add('apps', name)
      service.storage.set(name, {
        clientId: "",
        details: "Details",
        state: "State",
        startTimestamp: false,
        largeImageKey: "",
        largeImageText: "",
        smallImageKey: "",
        smallImageText: "",
      })
      app.setApps([...app.apps, name])
    }
  }

  return (
    <fieldset className={styles.bind}>
      <div className={styles.top}>
        <button onClick={handleGetProcesses} className={styles.processButton}><Icon.Refresh /></button>
        <button onClick={()=>setShowAll(!showAll)} className={styles.processButton}>{showAll ? <Icon.Server/> : <Icon.User/>}</button>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          fancy={{ text: 'Search', placeholder: true }}
        />
      </div>
      <hr />
      <div className={styles.processes}>
        {processes.map((item: any, index: number) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 && !app?.apps?.includes(item.name) && (
            <div key={`${item.id}${item.name}`} className={`${styles.process} ${!showAll && !item.foreground ? styles.backgroundTask : ""}`}>
              <button onClick={() => addProcess(item.name)}>+</button>
              <span>{item.name}</span>
            </div>
          )
        )}
      </div>
    </fieldset>
  )
}
