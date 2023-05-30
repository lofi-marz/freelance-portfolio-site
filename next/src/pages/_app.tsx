import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DarkModeContextProvider } from '@/components/DarkModeContextProvider';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DarkModeContextProvider>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NextSeo
                title="Omari Leon - Nottingham-Based Web Design"
                description="Nottingham-based freelance web developer."
            />
            <Component {...pageProps} />
            <Analytics />
        </DarkModeContextProvider>
    );
}
