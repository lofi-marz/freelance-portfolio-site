import clsx from 'clsx';
import { WithChildrenProps, WithClassNameProps } from '../../../types';
import Image from 'next/image';
import me from 'assets/me-brighton.jpg';
import {
    motion,
    MotionValue,
    useMotionTemplate,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import theme from '../../../../tailwind.config';
import { cn } from 'utils';
import { useRef } from 'react';
import { Button } from 'react-aria-components';
import { MotionButton } from '@/components/motion';
import { Dot } from '@/components/Dot';
import { GrowingDot } from '../..';

const primary = theme.theme.extend.colors.primary;
function Photo({ scroll }: { scroll: MotionValue }) {
    const spring = useSpring(scroll);
    const rotate = useTransform(scroll, [0, 0.5, 1], [-10, 0, 5]);

    const y = useTransform(spring, [0, 1], [-100, 0]);
    return (
        <motion.div
            className="relative w-full max-w-lg overflow-clip rounded-xl bg-theme-invert p-[5%] pb-[10%] text-theme xl:w-[30rem]"
            style={{ rotate, y }}>
            <motion.div
                className="h-full w-full overflow-clip"
                style={{ y: scroll }}>
                <Image src={me} alt="Photo of me" className="scale-110 " />
            </motion.div>
            <div className="text-end text-xs opacity-10 transition-all hover:text-primary hover:opacity-100">
                me!
            </div>
        </motion.div>
    );
}

export function About() {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start end', 'start start'],
    });

    /*const dark = theme.theme.extend.colors.dark;
    const light = theme.theme.extend.colors.light;
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        [dark, dark, light]
    );*/

    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 1,
        restDelta: 0.001,
    });

    //useMotionValueEvent(parallax, 'change', (v) => console.log('parallax', v));
    return (
        <motion.section
            id="about"
            className={clsx(
                'relative z-50 mx-auto -mt-[5%] flex h-screen flex-col items-center justify-center gap-96 overflow-visible bg-primary p-6 px-24 font-semibold text-theme-invert'
            )}
            ref={target}>
            <div className="heading relative text-5xl lg:px-24 lg:text-7xl">
                I make{' '}
                <span className="text-primary mix-blend-difference">
                    creative
                </span>
                , fun and functional things for the web, with a focus on
                front-end development, powered by React/Next.js
                <Dot />
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

function CTA() {
    return (
        <MotionButton
            className="group relative mx-auto w-full overflow-clip rounded-full border border-theme-invert p-12 lowercase transition-all"
            initial="outline"
            whileHover="solid">
            <motion.div
                className="absolute bottom-0 left-0 w-full rounded-full bg-theme-invert"
                variants={{ outline: { height: 0 }, solid: { height: '100%' } }}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
            />
            <span className="relative z-10 transition-all group-hover:text-theme">
                Get in touch<span className="text-primary">.</span>
            </span>
        </MotionButton>
    );
}

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
