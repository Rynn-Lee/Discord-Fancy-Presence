import { activityPlaceholder } from "@/dump/dummy"
import { service } from "@/services"

export default function ProcessList({styles, processes, app, showAll, search}: any){
  
  const addProcess = (name: string) => {
    service.storage.set(name, activityPlaceholder(name, 2))
    app.setRegisteredApps(service.storage.add('registeredApps', name))
  }

  return(
    <div className={styles.processes}>
      {processes.map((item: any) => 
        item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&  //If satisfies search query
        !app?.registeredApps?.includes(item.name) &&  //If the app is already added
        (showAll ? !item.foreground : item.foreground) && //If "ShowAll" is on
        (
          <div key={`${item.id}${item.name}`} className={styles.process}>
            <button onClick={() => addProcess(item.name)}>+</button>
            <span>{item.foreground ? `${item.title} | ${item.name}` : item.name}</span>
          </div>
        )
      )}
    </div>
  )
}