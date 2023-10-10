import { motion, useReducedMotion, Variants } from 'framer-motion';
import { WithChildrenProps } from '../types';
import clsx from 'clsx';
import { title } from '../fonts';

const lineVariants: Variants = {
    hide: {
        transition: {
            duration: 0.1,
            staggerChildren: 0.05,
            ease: 'easeOut',
            bounce: 0,
        },
    },
    show: {
        transition: {
            staggerChildren: 0.1,
            ease: 'easeOut',
            bounce: 0,
            duration: 4,
        },
    },
};
const charVariants = {
    hide: (reducedMotion: boolean) => ({
        y: reducedMotion ? 0 : '120%',
        opacity: 0,
    }),
    show: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            bounce: 1,
            duration: 1,
        },
    },
};

function SlideInChar({ char }: { char: string }) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div variants={charVariants} custom={shouldReduceMotion}>
            {char}
        </motion.div>
    );
}

function SlideInWord({ word, invert }: { word: string; invert: boolean }) {
    return (
        <motion.div
            className={clsx('flex flex-row whitespace-pre')}
            variants={lineVariants}
            transition={{ staggerChildren: 1 }}>
            {[...word].map((c, i) => (
                <SlideInChar key={c + i} char={c} />
            ))}
        </motion.div>
    );
}

type SlideInTextProps = {
    invert?: boolean;
    className?: string;
} & WithChildrenProps;

//TODO: Add some sort of reusability to this
export function SlideInText({
    invert = false,
    className,
    children,
}: SlideInTextProps): JSX.Element | null {
    if (typeof children === 'string') {
        const words = children.split(' ');
        return (
            <motion.div
                className={clsx(
                    'flex flex-row flex-wrap items-center justify-center whitespace-pre',
                    className
                )}
                layout
                variants={{ hide: {}, show: {} }}
                transition={{ staggerChildren: 0.1 }}>
                {words.map((w, i) => (
                    <SlideInWord key={w + i} word={w + ' '} invert={invert} />
                ))}
            </motion.div>
        );
    }

    return null;
}
