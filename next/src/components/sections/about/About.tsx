import clsx from 'clsx';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { WithChildrenProps, WithClassNameProps } from '../../../types';
import Image from 'next/image';
import me from 'assets/me.webp';
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
                'themed-bg-invert font-title -mt-1 themed-text-invert relative gap-10 lg:gap-20 flex flex-col-reverse md:flex-row lg:h-screen w-full p-8 py-24 md:p-24 items-center justify-center'
            )}
            ref={target}>
            <div className="whitespace-pre-line text-start flex flex-col gap-5 lg:gap-10 font-medium">
                <h2 className="text-primary font-bold text-2xl lg:text-5xl ">
                    Hi, I&apos;m Omari! <br /> I&apos;m a Web Developer based in
                    England, currently studying in Nottingham.
                </h2>
                <HighlightText className="text-base lg:text-3xl">
                    I like making fun, creative things with code. Creating new
                    experiences, implementing eye pleasing designs, and bringing
                    them to life with eye-catching animations is what I do best.
                </HighlightText>
                <CallToAction />
            </div>
            <div className="flex flex-col items-center gap-24 justify-center ">
                <div className="rounded-full overflow-clip w-full lg:w-96 max-w-lg bg-primary/100 relative">
                    <motion.div
                        className="w-full h-full "
                        style={{ y: parallax }}>
                        <Image
                            src={me}
                            alt="Photo of me"
                            className="saturate-50 scale-110"
                        />
                    </motion.div>
                    <div className="absolute top-0 w-full h-full bg-primary mix-blend-hue" />
                </div>
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
