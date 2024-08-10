import Icons from "@/components/icons";
import { service } from "@/services";
import Input from "../../ui/input";
import { useEffect } from "react";

const handleGetProcesses = async (setProcesses: Function) => {
  const processes = await service.task.getList();
  setProcesses(processes);
};

export default function SearchField({
  styles,
  setProcesses,
  setShowAll,
  showAll,
  setSearch,
  search,
}: any) {
  useEffect(() => {
    handleGetProcesses(setProcesses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.top}>
      <button
        onClick={() => handleGetProcesses(setProcesses)}
        className={styles.processButton}
      >
        <Icons.Refresh />
      </button>
      <button
        onClick={() => setShowAll(!showAll)}
        className={styles.processButton}
      >
        {showAll ? <Icons.Server /> : <Icons.User />}
      </button>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fancy={{ text: "Search", placeholder: true }}
      />
    </div>
  );
}
