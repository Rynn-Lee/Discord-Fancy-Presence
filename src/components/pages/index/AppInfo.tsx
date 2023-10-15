import Input from "@/components/UI/Input";
import Tabs from "@/layouts/Tabs";
import Texts from "./AppInfo/Texts";
import Images from "./AppInfo/Images";
import Other from "./AppInfo/Other";

export default function AppInfo({styles, appInfo, setAppInfo}: any){
  return(
    <div className={styles.appInfo}>
      <Tabs titles={["Texts", "Images", "Other"]}>
        <Texts
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Images
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
        <Other
          appInfo={appInfo}
          setAppInfo={setAppInfo}/>
      </Tabs>      
    </div>
  )
}