import { cn } from '@/utils/index';
import { PropsWithChildren } from 'react';
import { Nav } from '../Nav';
import { title, body } from '@/styles/fonts';
import { Footer } from '../Footer';
export function BlogLayout({ children }: PropsWithChildren) {
    return (
        <main
            className={cn(
                'pT-28 flex h-full min-h-screen w-full flex-col items-center justify-start bg-theme transition-all',
                title.variable,
                body.variable
            )}>
            <Nav /> {children} <Footer />
        </main>
    );
}
