import Icon from "@/assets/icons";
import { service } from "@/services";

export default function Select({styles, app, setAppInfo}: any){
  
  const selectApp = (value: string) => {
    setAppInfo(service.storage.get(value))
    app.setSettings({...app.settings, selected: value})
  }

  const removeApp = (name: string) => {
    if(name == "Idle"){return}
    app.setApps(service.storage.remove('apps', name))
    service.storage.removeWhole(name)
  }

  return(
    <div className={styles.selectApp}>
      <select defaultValue={app.settings.selected} onChange={(e)=>selectApp(e.target.value)}>
        {app?.apps?.map((item: string) => <option key={item} value={item}>{item}</option>)}
      </select>
      <button onClick={()=>removeApp(app.settings.selected)}><Icon.Remove/></button>
    </div>
  )
}