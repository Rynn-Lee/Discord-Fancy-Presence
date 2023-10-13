import Icon from "@/assets/icons";

export default function Select({styles, app, selectApp, removeApp, selected}: any){
  return(
    <div className={styles.selectApp}>
      <select defaultValue={"Idle"} onChange={(e)=>selectApp(e.target.value)}>
        {app?.apps?.map((item: string) => <option key={item} value={item}>{item}</option>)}
      </select>
      <button onClick={()=>removeApp(selected)}><Icon.Remove/></button>
    </div>
  )
}