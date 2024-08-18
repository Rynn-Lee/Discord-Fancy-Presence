import Icons from '@/components/icons'
import Input from '@/components/ui/input'
import { service } from '@/services';
import styles from '@styles/pages/bind-apps.module.sass'
import { useEffect, useState } from 'react'

const handleGetProcesses = async (setProcesses: Function) => {
  const processes = await service.task.getList();
  setProcesses(processes);
};

export default function BindApps() {
  const [processes, setProcesses] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [query, setQuery] = useState('')
  
  useEffect(() => {
    handleGetProcesses(setProcesses);
  }, []);

  const addProcess = (name: string) => {
    // service.storage.set(name, activityPlaceholder(name, 2))
    // app.setRegisteredApps(service.storage.add('registeredApps', name))
    console.log("Mhm")
  }

  return (
    <>
      <div className={styles.top}>
        <button onClick={() => handleGetProcesses(setProcesses)} className={styles.processButton}>
          <Icons.refresh />
        </button>
        <button onClick={() => setShowAll(!showAll)} className={styles.processButton}>
          {showAll ? <Icons.server /> : <Icons.user />}
        </button>
        <Input
          placeholder='Search for a process...'
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <hr style={{width: '670px', position: 'relative'}}/>
      <div className={styles.processes}>
      {processes.map((item: any) => 
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 &&  //If satisfies search query
        // !app?.registeredApps?.includes(item.name) &&  //If the app is already added
        (showAll ? !item.foreground : item.foreground) && //If "ShowAll" is on
        (
          <div key={`${item.id}${item.name}`} className={styles.process}>
            <button onClick={() => addProcess(item.name)} style={{marginRight: 12}}>+</button>
            {item.foreground
              ? <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                  <span>{item.title}</span>
                  <span>{item.name}</span>
                </div>
              : <span>{item.name}</span>
            }
          </div>
        )
      )}
    </div>
    </>
  )
}