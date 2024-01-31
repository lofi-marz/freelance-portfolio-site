import '../styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo, NextSeo } from 'next-seo';
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
                <script
                    async
                    src="https://eu.umami.is/script.js"
                    data-website-id="ee5487bf-e10b-426b-94f9-5ad3e77262e2"></script>
            </Head>
            <DefaultSeo
                title="Omari"
                titleTemplate="marz. | %s"
                description="Nottingham-based freelance web developer."
            />
            {getLayout(<Component {...pageProps} />)}
            <Analytics />
        </ThemeProvider>
    );
}
