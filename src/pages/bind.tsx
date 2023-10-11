import api from '@/lib/api'
import { useEffect, useState } from 'react'
import styles from '@styles/pages/bind.module.sass'
import Icon from '@/assets/icons'
import Input from '@/components/UI/Input'

export default function Bind({ storage, process }: any) {
  const [processes, setProcesses] = useState<any>([])
  const [search, setSearch] = useState<any>('')
  const [apps, setApps] = useState([])
  const handleGetProcesses = async () => {
    const processes = await process.getList()
    console.log(processes)
    setProcesses(processes)
  }
  useEffect(() => {
    handleGetProcesses()
    process.setApps(storage.get('registred', []))
  }, [])

  const addProcess = (name: string) => {
    const existing = storage.get('registred', [])
    if (!existing.includes(name)) {
      storage.add('registred', name)
      process.add(name)
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
          !process.apps.includes(item.name) ? (
            <div key={item.id} className={styles.process}>
              <button onClick={() => addProcess(item.name)}>+</button>
              <span>{item.name}</span>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </fieldset>
  )
}
