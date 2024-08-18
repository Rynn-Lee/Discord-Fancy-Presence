import type { AppProps } from "next/app";
import "@styles/global.sass";
import AppLayout from "@/layouts/app-layout";
import type { NextPage } from "next";

export type NextPageWithSettings<P = unknown, IP = P> = NextPage<P, IP> & {
  disableLayout?: boolean;
};

type AppPropsWithSettings = AppProps & {
  Component: NextPageWithSettings;
};

export default function App({ Component, pageProps }: AppPropsWithSettings) {
  if (Component.disableLayout) return <Component />;

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
