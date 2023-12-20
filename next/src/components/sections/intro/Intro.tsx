import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { SlideInText } from '@/components/SlideInText';
import clsx from 'clsx';
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { WithChildrenProps } from '../../../types';

import { ParallaxImage } from './ParallaxImage';
import Image from 'next/image';
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
import background from 'assets/ando-1.jpg';
import { Dots } from '@/components/Dots';
import { FaArrowDown } from 'react-icons/fa6';
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
const lines = ["hi, i'm omari.", 'I create creative experiences with code.'];

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
                    className="mr-[70%] scale-[.5]"
                />
                <ParallaxImage
                    src={socialMockup}
                    alt="Mockup for omni"
                    className="mr-[50%] mt-[0%] scale-[.8]"
                />
                <ParallaxImage
                    src={drmworldScreenshot}
                    alt="Mockup for omni"
                    className="mr-[30%] mt-[100%] scale-[.9]"
                    frame
                />

                <ParallaxImage
                    src={petsMockup}
                    alt="Mockup for omni"
                    className="mr-[60%] mt-[80%]"
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

    /*const dark = theme.theme.extend.colors.dark;
    const light = theme.theme.extend.colors.light;
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        [dark, dark, light]
    );*/
    const maxTextScale = desktop ? 1.5 : 1;
    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 1,
        restDelta: 0.001,
    });
    const textScale = useTransform(
        spring,
        [0, 0.25, 0.75, 1],
        [1, 1, maxTextScale, maxTextScale]
    );

    const textParallax = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        ['0vh', '0vh', '-10vh']
    );

    const imageWidth = useTransform(
        spring,
        [0, 0.1, 0.2],
        ['33%', '33%', '0%']
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

    const lg = useMediaQuery('lg');

    return (
        <motion.section
            className={clsx(
                'relative -mb-1 flex h-screen w-full flex-col items-center justify-start overflow-clip bg-theme font-title'
            )}
            ref={target}
            initial="hide"
            animate="show">
            <motion.div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-12 bg-theme p-12 pt-20">
                <header className="flex h-full w-fit flex-col items-start justify-center gap-3 text-center text-7xl font-semibold">
                    <h1>
                        hi, i&apos;m omari
                        <span className="w-fit text-primary">.</span>
                    </h1>
                    <p className="w-full whitespace-pre text-center text-base font-medium md:text-xl">
                        ( web developer + student )
                    </p>
                </header>
                <div className="relative h-full w-full overflow-clip rounded ">
                    <Dots />
                </div>
                <div className="flex grow items-center justify-center">
                    <FaArrowDown />
                </div>
            </motion.div>
        </motion.section>
    );
}
