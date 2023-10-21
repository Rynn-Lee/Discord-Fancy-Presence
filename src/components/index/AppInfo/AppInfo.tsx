import Tabs from "@/layouts/Tabs";
import Texts from "./Texts";
import Images from "./Images";
import Other from "./Other";
import Buttons from "./Buttons";

export default function AppInfo({styles, appInfo, setAppInfo}: any){
  return(
    <div className={styles.appInfo}>
      <Tabs titles={["Texts", "Images", "Buttons", "Other"]}>
        <Texts
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Images
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Buttons
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Other
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
      </Tabs>      
    </div>
  )
}