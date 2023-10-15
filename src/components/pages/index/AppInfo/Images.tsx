import Input from "@/components/UI/Input";

export default function Images({appInfo, setAppInfo}: any){
  return(
    <>
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
    </>
  )
}