import Input from "@/components/UI/Input";

export default function AppInfo({styles, appInfo, setAppInfo}: any){
  return(
    <div className={styles.appInfo}>
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
      <Input 
        // fancy={{text: "L. Image URL", hide: true}}
        placeholder="L. Image URL"
        value={appInfo?.largeImageKey}
        onChange={(e)=>setAppInfo({...appInfo, largeImageKey: e.target.value})}/>
      <Input 
        // fancy={{text: "L. Image Text", hide: true}}
        placeholder="L. Image Text"
        value={appInfo?.largeImageText}
        onChange={(e)=>setAppInfo({...appInfo, largeImageText: e.target.value})}/>
      <Input 
        // fancy={{text: "S. Image URL", hide: true}}
        placeholder="S. Image URL"
        value={appInfo?.smallImageKey}
        onChange={(e)=>setAppInfo({...appInfo, smallImageKey: e.target.value})}/>
      <Input 
        // fancy={{text: "S. Image Text", hide: true}}
        placeholder="S. Image Text"
        value={appInfo?.smallImageText}
        onChange={(e)=>setAppInfo({...appInfo, smallImageText: e.target.value})}/>
      <hr />
      <Input 
        fancy={{text: "Custom label for this app (ClientID)", hide: true}}
        value={appInfo?.clientId}
        onChange={(e)=>setAppInfo({...appInfo, clientId: e.target.value})}/>
    </div>
  )
}