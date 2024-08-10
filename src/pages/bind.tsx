import { useContext, useState } from "react";
import styles from "@styles/pages/bind.module.sass";
import { AppContext } from "./_app";
import SearchField from "@/components/pages/bind/SearchField";
import ProcessList from "@/components/pages/bind/ProcessList";

export default function Bind() {
  const [processes, setProcesses] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const [showAll, setShowAll] = useState(false);
  const app: any = useContext(AppContext);

  return (
    <fieldset className={styles.bind}>
      <SearchField
        styles={styles}
        setProcesses={setProcesses}
        showAll={showAll}
        setShowAll={setShowAll}
        search={search}
        setSearch={setSearch}
      />
      <hr />
      <ProcessList
        styles={styles}
        processes={processes}
        app={app}
        showAll={showAll}
        search={search}
      />
    </fieldset>
  );
}
