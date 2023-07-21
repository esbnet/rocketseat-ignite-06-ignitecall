import "../lib/dayjs";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { queryClient } from "../lib/react-query";

import { globalStyles } from "../styles/global";

import { DefaultSeo } from "next-seo";
import 'react-toastify/dist/ReactToastify.css';

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
      <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt-BR',
            url: 'https://schedule.esbnet.tec.br/',
            siteName: 'Portfolio',
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
