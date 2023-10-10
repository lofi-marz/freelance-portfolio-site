import {
    AnimatePresence,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { WithChildrenProps } from '../../../types';
import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowUp,
    FaChevronDown,
    FaCompactDisc,
} from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { SlideInText } from '@/components/SlideInText';
import { useRef, useState } from 'react';
import React from 'react';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { TARGET_AUDIENCE } from '../../../env';
import { setState } from 'jest-circus';

const ContainerVariants: Variants = {
    hide: { opacity: 0, height: '100vh' },
    show: {
        opacity: 1,
        height: '100vh',
        transition: {
            ease: 'easeOut',
            delayChildren: 0.5,
            staggerChildren: 1,
        },
    },
    exit: { opacity: 0 },
};

const SubtitleVariants: Variants = {
    hide: {
        opacity: 0,
        y: -10,
    },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
};

const IntroTextVariants: Variants = {
    hide: { opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, transition: { duration: 1 } },
};

function SideSpacer({ children }: Partial<WithChildrenProps>) {
    return (
        <div className="flex h-full w-16 items-center justify-center overflow-clip truncate text-xs font-bold uppercase">
            {children}
        </div>
    );
}

const subtitle =
    TARGET_AUDIENCE === 'freelance'
        ? 'freelance developer'
        : 'web developer + student';

function IntroText() {
    const sm = useMediaQuery('sm');

    return (
        <motion.div className="themed-bg-invert themed-text-invert relative flex h-full w-full flex-grow items-center justify-start overflow-clip py-12">
            <motion.div className="flex w-full flex-col items-start justify-center p-4 text-3xl font-bold sm:p-10 sm:text-4xl">
                <motion.div
                    style={{ writingMode: sm ? 'inherit' : 'vertical-rl' }}
                    variants={IntroTextVariants}>
                    hi, I&apos;m omari
                </motion.div>
                <motion.div
                    className="hide max-w-sm text-primary md:block"
                    variants={IntroTextVariants}>
                    {subtitle}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

const trackVariants: Variants = {
    hide: { opacity: 0, height: 0, transition: { delay: 5 } },
    show: { opacity: 1, height: 'auto' },
};
function CurrentlyPlaying() {
    const currentlyPlaying = useCurrentlyPlayingContext()!;
    const [trackShown, setTrackShown] = useState(false);
    const showTrack = () => setTrackShown(true);
    const hideTrack = () => setTrackShown(false);
    const isDesktop = useMediaQuery('md');
    return (
        <motion.div
            className="flex h-full w-full rotate-180 flex-row items-center justify-center gap-2"
            style={{ writingMode: 'vertical-rl' }}
            onHoverEnd={() => hideTrack()}
            onTapStart={() => showTrack()}
            onTap={(e) => hideTrack()}
            layout>
            <motion.div
                animate={{
                    rotate: [0, 60, 120, 180, 240, 300, 360],
                    opacity: [0.9, 1, 0.9, 1, 0.9, 0.9],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 5,
                }}
                onHoverStart={() => showTrack()}
                layout>
                <FaCompactDisc />
            </motion.div>
            <AnimatePresence>
                {trackShown && (
                    <motion.div
                        className="flex w-full flex-row items-center justify-center gap-2"
                        key="currently-playing"
                        variants={trackVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        layout>
                        Currently Listening
                        {isDesktop ? (
                            <a
                                href={
                                    currentlyPlaying.item.external_urls.spotify
                                }
                                target="_blank"
                                className="transition-all hover:text-primary hover:underline"
                                rel="noreferrer">
                                {currentlyPlaying.item.name}
                            </a>
                        ) : (
                            currentlyPlaying.item.name
                        )}
                        ({currentlyPlaying.item.artists[0].name})
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
/* eslint-disable-next-line */
const lines = ["Hi, I'm Omari.", 'I create creative experiences with code.'];

export function Intro() {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start start', 'end end'],
    });
    const currentlyPlaying = useCurrentlyPlayingContext();
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v < 0.25 && lineI !== 0) {
            setLineI(0);
        } else if (v >= 0.25 && lineI !== 1) {
            setLineI(1);
        }
    });

    //There has got to be a better way of doing this
    const [lineI, setLineI] = useState(0);

    return (
        <section
            className={clsx(
                'themed-bg relative flex h-[300vh] w-full flex-col items-center justify-start overflow-clip',
                title.className
            )}
            ref={target}>
            <AnimatePresence mode="wait">
                <motion.header
                    key={lineI}
                    layout
                    className={clsx(
                        'top-0 flex h-screen w-full flex-col items-center justify-center gap-6 p-12 text-center text-6xl font-bold md:text-7xl',
                        lineI === 0 ? 'sticky' : 'fixed'
                    )}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    transition={{ staggerChildren: 0.5, staggerDirection: 1 }}>
                    <SlideInText className="z-10 md:max-w-screen-lg">
                        {lines[lineI]}
                    </SlideInText>
                    {lineI === 0 && (
                        <motion.div
                            className="text-xl uppercase text-primary"
                            variants={SubtitleVariants}>
                            {subtitle}
                        </motion.div>
                    )}
                    <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center justify-end gap-4 py-12 text-base font-normal">
                        <a
                            className="flex rotate-180 flex-row items-center justify-center gap-4 transition-all hover:text-primary"
                            href="#about"
                            style={{ writingMode: 'vertical-lr' }}>
                            <FaArrowUp />
                            Scroll
                        </a>
                    </div>
                </motion.header>
            </AnimatePresence>
        </section>
    );
}
