import AppInfo from "@/components/home/AppInfo/AppInfo";
import Preview from "@/components/home/Preview/Preview";
import Icons from "@/components/icons";
import Select from "@/components/ui/select";
import { activityPlaceholder } from "@/dump/dummy";
import styles from "@styles/pages/index.module.sass";
import { useState } from "react";

export default function Home() {
  //! Пока что any чтобы не светился. Потом будут типы
  const [appInfo, setAppInfo] = useState<any>(activityPlaceholder);

  const selectApp = (value: string) => {
    // setAppInfo(service.storage.get(value))
    // app.setSelectedApp(value)
  };

  const removeApp = (name: string) => {
    if (name == "Idle") {
      return;
    }
    // service.storage.removeWhole(name)
    // app.setSelectedApp('Idle')
    // app.setRegisteredApps(service.storage.remove('registeredApps', name))
    // setAppInfo(service.storage.get("Idle"))
  };

  return (
    <div>
      <div className={styles.selectApp}>
        <Select>
          <option value="Idle">Idle</option>
        </Select>
        <button
        // onClick={() => removeApp(app.selectedApp)}
        >
          <Icons.remove />
        </button>
      </div>
      <hr style={{ width: "675px" }} />
      <div className={styles.appData}>
        <AppInfo appInfo={appInfo} setAppInfo={setAppInfo} styles={styles} />
        <Preview styles={styles} appInfo={appInfo} />
      </div>
    </div>
  );
}
