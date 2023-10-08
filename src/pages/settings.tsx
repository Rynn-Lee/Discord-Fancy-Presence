import Icon from "@/assets/icons"
import { useState } from "react"

export default function Settings({settings, setSettings}: any) {
  return (
    <>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Client ID</legend>
        <input
          placeholder="Insert your Application ID (Client ID)"
          value={settings.clientId}
          onChange={(e)=>setSettings({...settings, clientId: e.target.value})}/>
      </fieldset>
    </>
  )
}
