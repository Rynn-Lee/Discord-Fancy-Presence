import Icon from "@/assets/icons";
import { service } from "@/services";
import Input from "../Custom/Input";
import { useEffect } from "react";

export default function SearchField({styles, setProcesses, setShowAll, showAll, setSearch, search}: any){
    const handleGetProcesses = async () => {
      const processes = await service.task.getList()
      setProcesses(processes)
    }

    useEffect(() => {
      handleGetProcesses()
    }, [])

    return(
      <div className={styles.top}>
        <button onClick={handleGetProcesses} className={styles.processButton}><Icon.Refresh /></button>
        <button onClick={()=>setShowAll(!showAll)} className={styles.processButton}>{showAll ? <Icon.Server/> : <Icon.User/>}</button>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          fancy={{ text: 'Search', placeholder: true }}
        />
      </div>
  )
}