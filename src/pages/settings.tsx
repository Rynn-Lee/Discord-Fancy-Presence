import Icon from "@/assets/icons"
import Input from "@/components/UI/Input"

export default function Settings({settings, setSettings}: any) {
  return (
    <>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Client ID</legend>
          <Input
            onChange={(e)=>setSettings({...settings, clientId: e.target.value})}
            value={settings?.clientId}
            fancy={{hide: true, text: "Custom Client ID"}}
            type="number"/>
      </fieldset>
      <fieldset className="fieldset">
        <legend><Icon.Pen />Update Rate</legend>
          <Input
            onChange={(e)=>setSettings({...settings, updateRate: e.target.value})}
            value={settings?.updateRate}
            type="number"/>
      </fieldset>
    </>
  )
}
