import { useEffect, useState } from "react"

export default function useRecorder(...args: any) {
  const [firstRender, setFirstRender] = useState(true)

  args.forEach((element: any) => {
    useEffect(()=>{
      if(firstRender){setFirstRender(false); return}
      localStorage.setItem(element.name, JSON.stringify(element.watch))
    },[element])  
  });
}