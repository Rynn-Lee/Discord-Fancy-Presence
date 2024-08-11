import { invoke } from "@tauri-apps/api";
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
    // try {
    //     await invoke()
    // }
    console.log("handler");
  };

  const handleUpdateActivity = () => {
    console.log("handler");
  };

  const handleListenEvent = () => {
    if (!eventName) return;
    console.log("listen");
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
