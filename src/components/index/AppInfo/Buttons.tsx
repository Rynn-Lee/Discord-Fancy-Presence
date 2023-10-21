import Input from "@/components/UI/Input";

export default function Buttons({appInfo, setAppInfo}: any){
  return(
    <fieldset>
      <legend>Button 1</legend>
      <legend>Button 2</legend>
      {/* <Input 
        placeholder="Label"
        value={appInfo?.buttons[0]?.label}
        // onChange={(e)=>setAppInfo({...appInfo, buttons: [{...appInfo.buttons[0], label: e.target.value}]})}
        />
      <Input 
        placeholder="URL"
        value={appInfo?.buttons[0].url}
        // onChange={(e)=>setAppInfo({...appInfo, largeImageText: e.target.value})}
        />
      <Input 
        placeholder="Label"
        value={appInfo?.buttons[1]?.label}
        // onChange={(e)=>setAppInfo({...appInfo, buttons: [{...appInfo.buttons[0], label: e.target.value}]})}
        />
      <Input 
        placeholder="URL"
        value={appInfo?.buttons[1].url}
        // onChange={(e)=>setAppInfo({...appInfo, largeImageText: e.target.value})}
        /> */}
    </fieldset>
  )
}