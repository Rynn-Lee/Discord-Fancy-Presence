import Input from "@/components/UI/Input";

export default function Other({appInfo, setAppInfo}: any){
  return(
    <>
      <fieldset>
        <legend>Activity</legend>
        <select defaultValue={appInfo.type}
          onChange={(e)=>setAppInfo({...appInfo, type: e.target.value})}>
          <option value="playing">Playing</option>
          <option value="watching">Watching</option>
        </select>

        <legend>Custom label for the selected app</legend>
        <Input 
          fancy={{text: "Custom Client ID", hide: true}}
          value={appInfo?.clientId}
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>
      </fieldset>
    </>
  )
}