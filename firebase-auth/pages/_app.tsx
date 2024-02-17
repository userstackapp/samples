import type { AppProps } from "next/app";
import { UserstackProvider } from "@userstack/react";

export default function App({ Component, pageProps }: AppProps) {
  const APP_ID = process.env.NEXT_PUBLIC_USERSTACK_APP_ID || "";

  return (
    <UserstackProvider appId={APP_ID}>
      <Component {...pageProps} />
    </UserstackProvider>
  );
}
