import Icon from "@/assets/icons"
import Input from "@/components/UI/Input"
import { AppContext } from "./_app"
import { useContext } from "react"

export default function Settings() {
  const app: any = useContext(AppContext)

  return (
    <>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Client ID</legend>
          <Input
            onChange={(e)=>app.setSettings({...app.settings, clientId: e.target.value})}
            value={app?.settings.clientId}
            fancy={{hide: true, text: "Custom Client ID"}}
            type="number"/>
      </fieldset>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Update Rate (off if not specified)</legend>
          <Input
            onChange={(e)=>app.setSettings({...app.settings, updateRate: e.target.value})}
            value={app?.settings.updateRate}
            type="number"/>
      </fieldset>
    </>
  )
}
