import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const chainId = ChainId.Mainnet

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    }
  }, []);
  return (
    <ThirdwebProvider activeChain={chainId}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}
