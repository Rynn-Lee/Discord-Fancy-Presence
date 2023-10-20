import Input from "@/components/Custom/Input";
import Toggle from "@/components/Custom/Toggle";

export default function Other({appInfo, setAppInfo}: any){
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
          value={appInfo?.clientId}
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>

        <legend>Priority level</legend>
        <Input 
          fancy={{text: "Priority"}}
          value={appInfo?.priority}
          type="number"
          onChange={(e)=>setAppInfo({...appInfo, priority: e.target.value})}/>
      </fieldset>
    </>
  )
}