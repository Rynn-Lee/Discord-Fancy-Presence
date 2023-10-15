import Input from "@/components/UI/Input";

export default function Other({appInfo, setAppInfo}: any){
  return(
    <>
      <fieldset>
        <legend>Custom label for the selected app</legend>
        <Input 
          fancy={{text: "Custom Client ID", hide: true}}
          value={appInfo?.clientId}
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>
        <span><input type="checkbox" onChange={(e)=>setAppInfo({...appInfo, startTimestamp: e.target.checked})} checked={appInfo.startTimestamp}/>Show timer</span>
      </fieldset>
    </>
  )
}