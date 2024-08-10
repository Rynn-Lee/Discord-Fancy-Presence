import Icons from "@/components/icons";
import Input from "@/components/ui/Input";
import { AppContext } from "./_app";
import { useContext } from "react";

export default function Settings() {
  const app: any = useContext(AppContext)
  const update = (key: string, value: string | number) => app.setSettings({...app.settings, [key]: value})

  return (
    <>
      <fieldset className="fieldset">
        <legend><Icons.Pen />Default Application ID</legend>
        <span style={{marginBottom: 7, opacity: 0.6, fontSize: 12}}>App ID that is set to every new application you add by default</span>
        <Input
          onChange={(e) => update("clientId", e.target.value)}
          value={app?.settings.clientId}
          fancy={{ hide: true, text: "Default Application ID" }}
          type="number"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend><Icons.Pen />Update Rate (off if not specified)</legend>
        <span style={{marginBottom: 7, opacity: 0.6, fontSize: 12}}>How many seconds should past before checking for new apps available</span>
        <span style={{marginBottom: 7, opacity: 0.6, fontSize: 12}}>30 seconds is usually good enough. Set lower if your PC is a potato</span>
        <Input
          onChange={(e)=>update('updateRate', Number(e.target.value))}
          value={app?.settings.updateRate}
          type="number"
        />
      </fieldset>
    </>
  );
}
