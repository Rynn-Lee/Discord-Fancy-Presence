import type { AppProps } from "next/app";
import "@styles/global.sass";
import "@styles/global.css";
import AppLayout from "@/layouts/app-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
