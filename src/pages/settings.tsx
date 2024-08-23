import Icons from "@/components/icons";
import Input from "@/components/ui/input-old";
import styles from "@/styles/pages/settings.module.sass";

export default function Settings() {
  return (
    <div className={styles.container}>
      <fieldset className="fieldset">
        <legend>
          <Icons.pen />
          Default Application ID
        </legend>
        <span style={{ marginBottom: 7, opacity: 0.6, fontSize: 12 }}>
          App ID that is set to every new application you add by default
        </span>
        <Input
          placeholder="Default Applocation ID"
          // onChange={(e) => update("clientId", e.target.value)}
          // value={app?.settings.clientId}
          type="number"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend>
          <Icons.pen />
          Update Rate (off if not specified)
        </legend>
        <span style={{ marginBottom: 7, opacity: 0.6, fontSize: 12 }}>
          How many seconds should past before checking for new apps available
        </span>
        <span style={{ marginBottom: 7, opacity: 0.6, fontSize: 12 }}>
          30 seconds is usually good enough. Set lower if your PC is a potato
        </span>
        <Input
          placeholder="Update Rate (seconds)"
          // onChange={(e)=>update('updateRate', Number(e.target.value))}
          // value={app?.settings.updateRate}
          type="number"
        />
      </fieldset>
    </div>
  );
}
