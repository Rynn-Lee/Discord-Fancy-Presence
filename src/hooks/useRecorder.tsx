import { useEffect, useState } from "react"

export default function useRecorder(...args: any) {
  const [firstRender, setFirstRender] = useState(true)

  args.forEach((element: any) => {
    useEffect(()=>{
      if(firstRender){setFirstRender(false); return}
      if(!localStorage.getItem(element.name)){return}
      localStorage.setItem(element.name, JSON.stringify(element.watch))
    },[element])  
  });
}

//[firstRender]
//Prevents the hook to update data immediately
//i.e, usually when app loads, variables are empty. This hook immediately set localstorage to empty

//[getItem]
//Prevents the hook from restoring deleted values.
//i.e, if you delete an item from localstorge, it may immediately restore it if a variable's data has changed
