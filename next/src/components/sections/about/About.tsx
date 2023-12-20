import clsx from 'clsx';
import { WithChildrenProps, WithClassNameProps } from '../../../types';
import Image from 'next/image';
import me from 'assets/me-brighton.jpg';
import {
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import theme from '../../../../tailwind.config';
import { cn } from 'utils';
import { useRef } from 'react';
import { Button } from 'react-aria-components';

const primary = theme.theme.extend.colors.primary;
function Photo({ parallax }: { parallax: MotionValue }) {
    return (
        <div className="relative w-full max-w-lg overflow-clip bg-theme-invert p-[5%] pb-[10%] text-theme xl:w-[30rem]">
            <motion.div
                className="h-full w-full overflow-clip"
                style={{ y: parallax }}>
                <Image src={me} alt="Photo of me" className="scale-110 " />
            </motion.div>
            <div className="text-end text-xs opacity-50 transition-all hover:opacity-100">
                brighton, gb
            </div>
        </div>
    );
}
export function About() {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start end', 'end start'],
    });
    const parallax = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
    useMotionValueEvent(parallax, 'change', (v) => console.log('parallax', v));
    return (
        <motion.section
            id="about"
            className={clsx(
                'relative mx-auto -mt-1 flex max-w-screen-xl grid-cols-2 flex-col items-center gap-8 bg-theme p-6 lg:grid lg:px-24'
            )}
            ref={target}>
            <div className="lg:px-12 lg:py-24 xl:px-0">
                <Photo parallax={parallax} />
            </div>
            <div className="flex flex-col gap-14 whitespace-pre-line px-2 text-start text-lg font-medium lg:text-3xl xl:max-w-none xl:text-3xl">
                <HighlightText className="">
                    Hi, I&apos;m Omari. I&apos;m a Web Developer based in
                    England. I focus on creative web development in React.
                </HighlightText>
                <Button className="mx-auto w-full rounded-full border border-theme-invert p-12 lowercase">
                    Get in touch<span className="text-primary">.</span>
                </Button>
            </div>
        </motion.section>
    );
}

const lineVariants: Variants = {
    hide: {
        transition: { duration: 0.1 },
    },
    show: {
        transition: {
            staggerChildren: 0.1,
            ease: 'easeOut',
            bounce: 0,
            duration: 5,
        },
    },
};
const charVariants = {
    hide: { y: '120%', opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            bounce: 1,
            duration: 1,
        },
    },
    hover: {
        color: primary,
        transition: { duration: 0.1 },
    },
    noHover: {
        color: '#00000000',
        transition: { ease: 'easeOut', delay: 1, duration: 3 },
    },
};

function HighlightChar({ char }: { char: string }) {
    return (
        <motion.div>
            <motion.div
                className="absolute"
                variants={charVariants}
                initial="noHover"
                animate="noHover"
                whileHover="hover">
                {char}
            </motion.div>
            <div className="select-none">{char}</div>
        </motion.div>
    );
}

function HighlightWord({ word }: { word: string }) {
    return (
        <motion.div
            className="flex flex-row whitespace-pre py-[0.07lh]"
            variants={lineVariants}
            transition={{ staggerChildren: 1 }}>
            {[...word].map((c, i) => (
                <HighlightChar key={c + i} char={c} />
            ))}
        </motion.div>
    );
}

//TODO: Add some sort of reusability to this
export function HighlightText({
    children,
    className,
}: WithChildrenProps & WithClassNameProps): JSX.Element | null {
    if (typeof children === 'string') {
        const words = children.split(' ');
        return (
            <motion.div
                className={cn(
                    'flex flex-row flex-wrap items-center justify-start whitespace-pre',
                    className
                )}
                variants={{ hide: {}, show: {} }}
                transition={{ staggerChildren: 0.1 }}>
                {words.map((w, i) => (
                    <HighlightWord key={w + i} word={w + ' '} />
                ))}
            </motion.div>
        );
    }

    return null;
}
