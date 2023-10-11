import { useContext, useEffect, useState } from 'react'
import styles from '@styles/pages/bind.module.sass'
import Input from '@/components/UI/Input'
import { service } from '@/services'
import { AppContext } from "./_app"

export default function Bind() {
  const [processes, setProcesses] = useState<any>([])
  const [search, setSearch] = useState<any>('')
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
      app.setApps([...app.apps, name])
    }
  }

  return (
    <fieldset className={styles.bind}>
      <legend>Bind Apps</legend>
      <div className={styles.top}>
        <button onClick={handleGetProcesses} className={styles.processButton}>
          Refresh
        </button>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          fancy={{ text: 'Search' }}
        />
      </div>
      <hr />
      <div className={styles.processes}>
        {processes.map((item: any) =>
          item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
          !app?.apps?.includes(item.name) ? (
            <div key={item.id} className={styles.process}>
              <button onClick={() => addProcess(item.name)}>+</button>
              <span>{item.name}</span>
            </div>
          ) : (<></>)
        )}
      </div>
    </fieldset>
  )
}
