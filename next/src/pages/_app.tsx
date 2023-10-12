import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" forcedTheme="dark">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NextSeo
                title="Omari Thompson-Edwards"
                description="Nottingham-based freelance web developer."
            />
            <Component {...pageProps} />
            <Analytics />
        </ThemeProvider>
    );
}
