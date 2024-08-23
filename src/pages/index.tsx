import ActivityInfoForm from "@/components/home/activity-info-form";
import ApplicationSelect from "@/components/home/application-select";
import ActivityPreview from "@/components/home/activity-preview";
import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { activityPlaceholder } from "@/dump/dummy";
import styles from "@styles/pages/index.module.sass";
import { useState } from "react";

export default function Home() {
  //! Пока что any чтобы не светился. Потом будут типы
  const [appInfo, setAppInfo] = useState<any>(activityPlaceholder);
  // const [activityInfo, setActivityInfo] = useState<any>(activityPlaceholder);
  const [activityPayload, setActivityPayload] = useState(
    activityPlaceholder("Idle", 1),
  );

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
    <div className="w-full p-2.5">
      <div className="flex w-full gap-2">
        <ApplicationSelect className="flex-1" />
        <Button size="icon">
          <Icons.remove />
        </Button>
      </div>
      <hr className="border-fp-accent my-3 w-full" />
      <div className="flex w-full gap-6">
        <ActivityInfoForm onChange={() => {}} />
        <ActivityPreview payload={activityPayload} />
      </div>
    </div>
  );
}
