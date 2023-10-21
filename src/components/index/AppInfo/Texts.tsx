import Input from "@/components/UI/Input";

export default function Texts({appInfo, setAppInfo}: any){
  return(
    <fieldset>
      <legend>Details</legend>
      <Input 
        placeholder="Details"
        value={appInfo?.details}
        onChange={(e)=>setAppInfo({...appInfo, details: e.target.value})}/>
      <legend>State</legend>
      <Input 
        placeholder="State"
        value={appInfo?.state}
        onChange={(e)=>setAppInfo({...appInfo, state: e.target.value})}/>
    </fieldset>
  )
}