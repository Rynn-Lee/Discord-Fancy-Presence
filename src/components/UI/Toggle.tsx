import { useState } from "react"

export default function Toggle({initial, fn}: any){
  const [state, setState] = useState(initial || false)

  const toggle = () => {
    fn()
    setState(!state)
  }

  return(
    <button onClick={toggle}>{state ? "Enabled" : "Disabled"}</button>
  )
}