import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { SlideInText } from '@/components/SlideInText';
import clsx from 'clsx';
import {
    AnimatePresence,
    motion,
    MotionValue,
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
import foodMockup from 'assets/mockup-food.jpg';
import socialmateScreenshot from 'assets/screenshot-socialmate.png';
import { ParallaxLayer } from './ParallaxLayer';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { memo } from 'react';
import { cn } from 'utils';
import theme from '../../../../tailwind.config';

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

export const subtitle = 'web developer + student';

export const trackVariants: Variants = {
    hide: { opacity: 0, height: 0, transition: { delay: 5 } },
    show: { opacity: 1, height: 'auto' },
};
/* eslint-disable-next-line */
const lines = ["Hi, I'm Omari.", 'I create creative experiences with code.'];

const ParallaxImages = memo(function ParallaxImages({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue;
}) {
    return (
        <>
            <ParallaxLayer
                scrollProgress={scrollYProgress}
                start="150%"
                end="-100%">
                <ParallaxImage
                    src={foodMockup}
                    alt="Mockup for omni"
                    className="mr-[10%]"
                />
                <ParallaxImage
                    src={socialmateScreenshot}
                    alt="Mockup for omni"
                    className="ml-[50%]"
                    frame
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
                    className="scale-[.8] mr-[50%] mt-[0%]"
                />
                <ParallaxImage
                    src={drmworldScreenshot}
                    alt="Mockup for omni"
                    className="scale-[.9] mr-[30%] mt-[100%]"
                    frame
                />

                <ParallaxImage
                    src={petsMockup}
                    alt="Mockup for omni"
                    className="mt-[80%] mr-[60%]"
                />
            </ParallaxLayer>
        </>
    );
});

export function Intro() {
    const desktop = useMediaQuery('lg');
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (v) =>
        console.log('scroll:', v)
    );

    /*const dark = theme.theme.extend.colors.dark;
    const light = theme.theme.extend.colors.light;
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        [dark, dark, light]
    );*/
    const maxTextScale = desktop ? 1.5 : 1;

    const textScale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [1, 1, maxTextScale, maxTextScale]
    );

    const textParallax = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        ['0%', '0%', '-100%']
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
        <motion.section
            className={clsx(
                'themed-bg relative -mb-1 flex h-[500vh] w-full flex-col items-center justify-start overflow-clip font-title'
            )}
            ref={target}>
            <AnimatePresence mode="wait">
                <motion.header
                    key={lineI}
                    layout
                    className={cn(
                        'top-0 flex sticky h-screen w-full flex-col items-center justify-center gap-6 p-12 text-center text-5xl sm:text-6xl font-bold md:text-7xl'
                    )}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    transition={{ staggerChildren: 0.5, staggerDirection: 1 }}>
                    <ParallaxImages scrollYProgress={scrollYProgress} />

                    <motion.div
                        style={{ scale: textScale, y: textParallax }}
                        className="mix-blend-difference ">
                        <SlideInText className="z-10 md:max-w-screen-lg ">
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
        </motion.section>
    );
}
