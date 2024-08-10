import storage from "@/lib/storage";
import { noop } from "@/utils/noop";
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

const DEFAULT_DRPC_CLIENT_ID = "1118418570855067688";
const DEFAULT_UPDATE_RATE = 60;

interface Settings {
  defaultClientId: string;
  updateRate: number;
}

interface SettingsContextValue {
  settings: Settings;
  setUpdateRate: (updateRate: number) => void;
  setDefaultClientId: (clientId: string) => void;
}

function getDefaultSettings(): Settings {
  const settings = storage.get<Settings>("settings");
  return {
    defaultClientId: settings?.defaultClientId || DEFAULT_DRPC_CLIENT_ID,
    updateRate: settings?.updateRate || DEFAULT_UPDATE_RATE,
  };
}

const defaultSettings = getDefaultSettings();

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  setDefaultClientId: noop,
  setUpdateRate: noop,
});

export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => storage.set("settings", settings), [settings]);

  const setDefaultClientId = (clientId: string) => {
    setSettings((prev) => ({ ...prev, defaultClientId: clientId }));
  };

  const setUpdateRate = (updateRate: number) => {
    setSettings((prev) => ({ ...prev, updateRate }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setDefaultClientId,
        setUpdateRate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
