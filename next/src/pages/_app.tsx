import '../styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
    getLayout: (page: ReactElement) => ReactNode;
};
export default function MyApp({
    Component,
    pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextSeo
                title="Omari Thompson-Edwards"
                description="Nottingham-based freelance web developer."
            />
            {getLayout(<Component {...pageProps} />)}
            <Analytics />
        </ThemeProvider>
    );
}
