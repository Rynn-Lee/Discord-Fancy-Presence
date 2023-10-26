import Icon from "@/assets/icons"
import Input from "@/components/UI/Input"
import { AppContext } from "./_app"
import { useContext } from "react"

export default function Settings() {
  const app: any = useContext(AppContext)
  const update = (key: string, value: string | number) => app.setSettings({...app.settings, [key]: value})

  return (
    <>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Default Application ID</legend>
        <Input
          onChange={(e)=>update('clientId', e.target.value)}
          value={app?.settings.clientId}
          fancy={{hide: true, text: "Default Application ID"}}
          type="number"/>
      </fieldset>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Update Rate (off if not specified)</legend>
        <Input
          onChange={(e)=>update('updateRate', Number(e.target.value))}
          value={app?.settings.updateRate}
          type="number"/>
      </fieldset>
    </>
  )
}
