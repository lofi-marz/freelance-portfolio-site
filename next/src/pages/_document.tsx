import clsx from 'clsx';
import { title, body } from '@/styles/fonts';
import { Html, Head, Main, NextScript } from 'next/document';
import { cn } from '../utils';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={cn(title.variable, body.variable)}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
