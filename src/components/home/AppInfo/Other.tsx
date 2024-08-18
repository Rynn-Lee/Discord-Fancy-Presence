import Input from "@/components/ui/input";
import Toggle from "@/components/ui/toggle";

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
          value={appInfo.clientId}
          placeholder="Custom title (Your own Application ID)"
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>

        <legend>Priority level</legend>
        <Input 
          value={appInfo.priority}
          type="number"
          placeholder="Priority over other apps"
          disabled={appInfo.name === "Idle"}
          onChange={(e)=>setAppInfo({...appInfo, priority: Number(e.target.value)})}/>
      </fieldset>
    </>
  )
}