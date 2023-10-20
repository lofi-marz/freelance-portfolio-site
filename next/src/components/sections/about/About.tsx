import clsx from 'clsx';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { WithChildrenProps, WithClassNameProps } from '../../../types';
import Image from 'next/image';
import me from 'assets/me-brighton.jpg';
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import theme from '../../../../tailwind.config';
import { cn } from 'utils';
import { useRef } from 'react';

const primary = theme.theme.extend.colors.primary;

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
                'themed-bg font-title -mt-1 themed-text relative gap-10 xl:gap-20 flex flex-col xl:flex-row xl:h-screen w-full p-10 py-24 md:p-24 items-center justify-between'
            )}
            ref={target}>
            <div className="flex flex-col items-center gap-24 justify-center">
                <div className="overflow-clip w-full xl:w-[32rem] pb-[20%] max-w-lg bg-light relative p-[10%]">
                    <motion.div
                        className="w-full h-full overflow-clip"
                        style={{ y: parallax }}>
                        <Image
                            src={me}
                            alt="Photo of me"
                            className="scale-110 "
                        />
                    </motion.div>
                </div>
            </div>
            <div className="whitespace-pre-line text-start flex flex-col gap-5 font-normal px-2 max-w-lg xl:max-w-none">
                <HighlightText className="text-lg lg:text-3xl xl:text-5xl">
                    Hi, I&apos;m Omari. I&apos;m a Web Developer based in
                    England, currently studying in Nottingham. Creating new
                    experiences, implementing eye pleasing designs, and bringing
                    them to life with slick animations is what I do best.
                </HighlightText>
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
