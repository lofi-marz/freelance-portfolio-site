import { cn } from '@/utils/index';
import { PropsWithChildren } from 'react';
import { Nav } from '../Nav';
import { title, body } from '@/styles/fonts';
import { Footer } from '../Footer';
export function BlogLayout({ children }: PropsWithChildren) {
    return (
        <main
            className={cn(
                'flex h-full min-h-screen w-full flex-col  items-center justify-start bg-theme  pt-28 transition-all',
                title.variable,
                body.variable
            )}>
            <Nav /> {children} <Footer />
        </main>
    );
}
