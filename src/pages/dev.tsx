import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { ChangeEvent, PropsWithChildren, useState } from "react";

// This page intended only for backend testing purposes
export default function DevView() {
  const [eventName, eventBind] = useInputBind();
  const [clientId, clientIdBind] = useInputBind();

  const handleGetProcesses = async () => {
    try {
      console.log(await invoke("get_processes"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateActivityClientId = async () => {
    if (!clientId) return;
    try {
      console.log(
        "update_activity_client_id",
        await invoke("update_activity_client_id", {
          clientId,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateActivity = async () => {
    try {
      console.log(
        "update_activity",
        await invoke("update_activity", {
          activityPayload: {
            details: "details",
            state: "state",
            largeImage: "",
            largeText: "",
            smallImage: "",
            smallText: "",
            startTimestamp: true,
            // button1Text: "Visit this project",
            // button1Url: "https://github.com/Rynn-Lee/Fancy-DRPC",
            // button2Text: appInfo.button2Text ?? "",
            // button2Url: appInfo.button2Url ?? "",
          },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleListenEvent = async () => {
    if (!eventName) return;
    try {
      console.log(`start listen to '${eventName}'`);
      const handleEvent = (message: unknown) =>
        console.log(`Event ${eventName} message: `, message);
      await listen(eventName, handleEvent);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fancy DRPC Dev View</h1>
      <h2>Commands</h2>
      <hr />
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
        }}
      >
        <button onClick={handleGetProcesses}>get_processes</button>
        <Flex>
          <input type="text" style={spread} {...clientIdBind} />
          <button onClick={handleUpdateActivityClientId}>
            update_activity_client_id
          </button>
        </Flex>
        <button onClick={handleUpdateActivity}>update_activity</button>
      </div>
      <h2>Events</h2>
      <hr />
      <Flex>
        <input type="text" style={spread} {...eventBind} />
        <button onClick={handleListenEvent}>listen event</button>
      </Flex>
    </div>
  );
}

// Helpers
const spread = {
  flex: "1 1 0%",
};

const Flex = ({ children }: PropsWithChildren) => (
  <div
    style={{
      display: "flex",
    }}
  >
    {children}
  </div>
);

const useInputBind = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  const bind = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };

  return [value, bind] as const;
};
