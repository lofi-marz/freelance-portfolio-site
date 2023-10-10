import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { SlideInText } from '@/components/SlideInText';
import clsx from 'clsx';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { TARGET_AUDIENCE } from '../../../env';
import { title } from '../../../fonts';
import { WithChildrenProps } from '../../../types';

import { ParallaxImage } from './ParallaxImage';

import omniMockup from 'assets/mockup-omni.jpg';
import socialMockup from 'assets/mockup-socialmate.jpg';
import petsMockup from 'assets/mockup-pets.jpg';
import drmworldScreenshot from 'assets/screenshot-drmworld.png';
import { ParallaxLayer } from './ParallaxLayer';

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

export const IntroTextVariants: Variants = {
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

export const subtitle =
    TARGET_AUDIENCE === 'freelance'
        ? 'freelance developer'
        : 'web developer + student';

export const trackVariants: Variants = {
    hide: { opacity: 0, height: 0, transition: { delay: 5 } },
    show: { opacity: 1, height: 'auto' },
};
/* eslint-disable-next-line */
const lines = ["Hi, I'm Omari.", 'I create creative experiences with code.'];

export function Intro() {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start start', 'end end'],
    });

    const scale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [1, 1, 1.5, 1.5]
    );

    const parallax = useTransform(
        scrollYProgress,
        [0, 0.25, 1],
        ['0%', '100%', '-100%']
    );

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
                'themed-bg relative flex h-[500vh] w-full flex-col items-center justify-start overflow-clip',
                title.className
            )}
            ref={target}>
            <AnimatePresence mode="wait">
                <motion.header
                    key={lineI}
                    layout
                    className={clsx(
                        'top-0 flex h-screen w-full flex-col items-center justify-center gap-6 p-12 text-center text-6xl font-bold md:text-7xl',
                        lineI === 0 ? 'sticky' : 'sticky'
                    )}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    transition={{ staggerChildren: 0.5, staggerDirection: 1 }}>
                    <ParallaxLayer
                        scrollProgress={scrollYProgress}
                        start="100%"
                        end="-100%">
                        <ParallaxImage
                            src={omniMockup}
                            alt="Mockup for omni"
                            className="mr-[10%]"
                        />
                        <ParallaxImage
                            src={socialMockup}
                            alt="Mockup for omni"
                            className="ml-[10%]"
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        scrollProgress={scrollYProgress}
                        start="200%"
                        end="-200%">
                        <ParallaxImage
                            src={omniMockup}
                            alt="Mockup for omni"
                            className="scale-[.5] mr-[70%]"
                        />
                        <ParallaxImage
                            src={socialMockup}
                            alt="Mockup for omni"
                            className="scale-[.8] mr-[20%] mt-[0%]"
                        />
                        <ParallaxImage
                            src={petsMockup}
                            alt="Mockup for omni"
                            className="scale-[.9] mr-[30%] mt-[100%]"
                        />

                        <ParallaxImage
                            src={drmworldScreenshot}
                            alt="Mockup for omni"
                            className="mt-[80%]"
                            frame
                        />
                    </ParallaxLayer>

                    <motion.div
                        style={{ scale, y: parallax }}
                        className="mix-blend-difference">
                        <SlideInText className="z-10 md:max-w-screen-lg mix-blend-multiply">
                            {lines[lineI]}
                        </SlideInText>
                    </motion.div>
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
