import Input from "@/components/UI/Input";

export default function Texts({appInfo, setAppInfo}: any){
  return(
    <fieldset>
      <legend>Details</legend>
      <Input 
        // fancy={{text: "Details", hide: true}}
        placeholder="Details"
        value={appInfo?.details}
        onChange={(e)=>setAppInfo({...appInfo, details: e.target.value})}/>
      <legend>State</legend>
      <Input 
        // fancy={{text: "State", hide: true}}
        placeholder="State"
        value={appInfo?.state}
        onChange={(e)=>setAppInfo({...appInfo, state: e.target.value})}/>
    </fieldset>
  )
}