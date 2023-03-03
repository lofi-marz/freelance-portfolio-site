import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DarkModeContextProvider } from '@/components/DarkModeContextProvider';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DarkModeContextProvider>
                      <Head>
                        <title>Omari</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
            <Component {...pageProps} />
        </DarkModeContextProvider>
    );
}