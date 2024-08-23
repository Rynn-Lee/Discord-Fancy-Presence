import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { service } from "@/services";
import styles from "@styles/pages/bind-apps.module.sass";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const handleGetProcesses = async (setProcesses: Function) => {
  const processes = await service.task.getList();
  setProcesses(processes);
};

export default function BindApps() {
  const { data: processes } = useQuery({
    queryKey: ["processes"],
    // todo: rename services to something else
    queryFn: () => service.task.getList(),
  });

  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");

  const handleAddProcess = (id: number) => {
    // service.storage.set(name, activityPlaceholder(name, 2))
    // app.setRegisteredApps(service.storage.add('registeredApps', name))
    console.log("Add process", id);
  };
  return (
    <div className="flex h-screen w-full flex-col px-2.5 pt-2.5">
      <div className="flex w-full gap-2">
        <Button size="icon">
          <Icons.refresh />
        </Button>
        <Button size="icon">
          {showAll ? <Icons.server /> : <Icons.user />}
        </Button>
        <Input placeholder="Search for a process..." className="flex-1" />
      </div>
      <hr className="my-3 w-full border-fp-accent" />
      <div className="h-full overflow-auto">
        {processes?.map((process) => (
          // todo: move to separate component
          <div
            key={process.id}
            className="flex items-center odd:bg-fp-primary-darker even:bg-fp-primary"
          >
            <Button
              className=""
              onClick={() => handleAddProcess(process.id)}
              style={{ marginRight: 12 }}
            >
              +
            </Button>
            {process.foreground ? (
              <div className="flex w-full justify-between pr-4">
                <span>{process.title}</span>
                <span>{process.name}</span>
              </div>
            ) : (
              <span>{process.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.top}>
        <button
          onClick={() => handleGetProcesses(setProcesses)}
          className={styles.processButton}
        >
          <Icons.refresh />
        </button>
        <button
          onClick={() => setShowAll(!showAll)}
          className={styles.processButton}
        >
          {showAll ? <Icons.server /> : <Icons.user />}
        </button>
        <Input
          placeholder="Search for a process..."
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <hr style={{ width: "670px", position: "relative" }} />
      <div className={styles.processes}>
        {processes.map(
          (item: any) =>
            item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 && //If satisfies search query
            // !app?.registeredApps?.includes(item.name) &&  //If the app is already added
            (showAll ? !item.foreground : item.foreground) && ( //If "ShowAll" is on
              <div key={`${item.id}${item.name}`} className={styles.process}>
                <button
                  onClick={() => addProcess(item.name)}
                  style={{ marginRight: 12 }}
                >
                  +
                </button>
                {item.foreground ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>{item.title}</span>
                    <span>{item.name}</span>
                  </div>
                ) : (
                  <span>{item.name}</span>
                )}
              </div>
            ),
        )}
      </div>
    </>
  );
}
