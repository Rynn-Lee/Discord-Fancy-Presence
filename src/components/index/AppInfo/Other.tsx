import Input from "@/components/UI/Input";
import Toggle from "@/components/UI/Toggle";
import { AppContext } from "@/pages/_app";
import { useContext } from "react";

export default function Other({appInfo, setAppInfo}: any){
  const app: any = useContext(AppContext)
  return(
    <>
      <fieldset>
        <legend>Timer</legend>
        <Toggle
          initial={appInfo.startTimestamp}
          fn={()=>setAppInfo({...appInfo, startTimestamp: !appInfo.startTimestamp})}/>

        <legend>Custom label for the selected app</legend>
        <Input 
          fancy={{text: "Custom Application ID", hide: true}}
          value={appInfo.clientId}
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>

        <legend>Priority level {appInfo.name}</legend>
        <Input 
          fancy={{text: "Priority"}}
          value={appInfo.priority}
          type="number"
          disabled={app.settings.selected == "Idle" ? true : false}
          onChange={(e)=>setAppInfo({...appInfo, priority: e.target.value})}/>
      </fieldset>
    </>
  )
}