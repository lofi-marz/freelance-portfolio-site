import clsx from 'clsx';
import { title } from '../../../fonts';
import { SlideInText } from '@/components/SlideInText';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import { useRef } from 'react';

export function Contact() {
    const links = {
        LinkedIn:
            'https://www.linkedin.com/in/omari-thompson-edwards-b7307b195',
        Email: 'mailto:othompsonedwards@gmail.com',
        GitHub: 'https://github.com/lofi-marz',
        UpWork: 'https://www.upwork.com/freelancers/~019c194b11d5dfabbc',
        CV: 'Omari Thompson-Edwards CV.pdf',
    };

    const firstHalf = Object.entries(links).slice(0, 3);
    const secondHalf = Object.entries(links).slice(3);
    return (
        <motion.section
            initial="hide"
            whileInView="show"
            transition={{ staggerChildren: 1 }}
            className={clsx(
                'themed-bg-invert themed-text-invert relative z-30 flex h-screen w-full flex-col items-center justify-center overflow-clip p-12 text-6xl md:text-8xl lg:text-9xl',
                title.className
            )}>
            <LinksRow links={firstHalf} />
            <div className="mb-[2.5%] flex h-full items-center justify-center text-center font-medium md:w-2/3">
                <SlideInText invert>
                    Let&apos;s talk about your project
                </SlideInText>
            </div>
            <LinksRow links={secondHalf} />
        </motion.section>
    );
}
const linksRowVariants: Variants = {
    hide: {},
    show: {},
};
const linkVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
};

function LinksRow({ links }: { links: [string, string][] }) {
    return (
        <motion.div
            variants={linksRowVariants}
            className="flex w-full flex-row justify-between text-sm font-bold uppercase">
            {links.map(([text, url]) => (
                <motion.a
                    variants={linkVariants}
                    key={text}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-all hover:scale-110 hover:text-primary">
                    {text}
                </motion.a>
            ))}
        </motion.div>
    );
}
