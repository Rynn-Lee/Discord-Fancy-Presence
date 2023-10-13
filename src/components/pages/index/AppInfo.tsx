import Input from "@/components/UI/Input";

export default function AppInfo({styles, appInfo, setAppInfo}: any){
  return(
    <div className={styles.appInfo}>
      <fieldset>
        <legend>Texts</legend>
        <Input 
          // fancy={{text: "Details", hide: true}}
          placeholder="Details"
          value={appInfo?.details}
          onChange={(e)=>setAppInfo({...appInfo, details: e.target.value})}/>
        <Input 
          // fancy={{text: "State", hide: true}}
          placeholder="State"
          value={appInfo?.state}
          onChange={(e)=>setAppInfo({...appInfo, state: e.target.value})}/>
      </fieldset>
      <fieldset>
        <legend>Large image</legend>
        <Input 
          // fancy={{text: "L. Image URL", hide: true}}
          placeholder="Large Image URL"
          value={appInfo?.largeImageKey}
          onChange={(e)=>setAppInfo({...appInfo, largeImageKey: e.target.value})}/>
        <Input 
          // fancy={{text: "L. Image Text", hide: true}}
          placeholder="Large Image Text"
          value={appInfo?.largeImageText}
          onChange={(e)=>setAppInfo({...appInfo, largeImageText: e.target.value})}/>
          </fieldset>
      <fieldset>
        <legend>Small image</legend>
        <Input 
          // fancy={{text: "S. Image URL", hide: true}}
          placeholder="Small Image URL"
          value={appInfo?.smallImageKey}
          onChange={(e)=>setAppInfo({...appInfo, smallImageKey: e.target.value})}/>
        <Input 
          // fancy={{text: "S. Image Text", hide: true}}
          placeholder="Small Image Text"
          value={appInfo?.smallImageText}
          onChange={(e)=>setAppInfo({...appInfo, smallImageText: e.target.value})}/>
      </fieldset>
      <fieldset>
        <legend>Other</legend>
        <select defaultValue={appInfo.type}
          onChange={(e)=>setAppInfo({...appInfo, type: e.target.value})}>
          <option value="playing">Playing</option>
          <option value="watching">Watching</option>
        </select>
      </fieldset>
      <hr />
      <fieldset>
        <legend>Custom label for the selected app</legend>
        <Input 
          fancy={{text: "Custom Client ID", hide: true}}
          value={appInfo?.clientId}
          onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>
      </fieldset>
    </div>
  )
}