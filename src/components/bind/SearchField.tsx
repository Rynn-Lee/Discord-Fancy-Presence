import Icon from "@/assets/icons";
import { service } from "@/services";
import Input from "../UI/Input";
import { useEffect } from "react";

const handleGetProcesses = async (setProcesses: Function) => {
  const processes = await service.task.getList()
  setProcesses(processes)
}

export default function SearchField({styles, setProcesses, setShowAll, showAll, setSearch, search}: any){

    useEffect(() => {
      handleGetProcesses(setProcesses)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
      <div className={styles.top}>
        <button onClick={()=>handleGetProcesses(setProcesses)} className={styles.processButton}><Icon.Refresh /></button>
        <button onClick={()=>setShowAll(!showAll)} className={styles.processButton}>{showAll ? <Icon.Server/> : <Icon.User/>}</button>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          fancy={{ text: 'Search', placeholder: true }}
        />
      </div>
  )
}