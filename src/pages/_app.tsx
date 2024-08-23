import type { AppProps } from "next/app";
import "@styles/global.css";
import AppLayout from "@/layouts/app-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </QueryClientProvider>
  );
}
