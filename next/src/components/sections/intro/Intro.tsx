import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { SlideInText } from '@/components/SlideInText';
import clsx from 'clsx';
import {
    AnimatePresence,
    anticipate,
    easeIn,
    easeInOut,
    motion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { MouseEventHandler, useRef, useState } from 'react';
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
import background from 'assets/ando-1.jpg';
import { Dots } from '@/components/Dots';
import { FaArrowDown } from 'react-icons/fa6';
import { DotsRow } from '@/components/DotsRow';
import { Dot } from '@/components/Dot';
import { GrowingDot } from '../../GrowingDot';
import { About } from '../about';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
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
const lines = ["hi, i'm omari", 'I develop creative experiences with code'];

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
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mouseEntered, setMouseEntered] = useState(false);

    const onMouseMove: MouseEventHandler = (e) => {
        x.set(e.clientX); //Offsets to make the image line up with the actual cursor
        y.set(e.clientY);
    };

    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start start', 'end end'],
    });

    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 1,
        restDelta: 0.001,
    });

    const dotsOpacity = useTransform(spring, [0, 0.05, 0.25], [1, 1, 0]);

    const { projects = [] } = useStrapiContentContext() ?? {};
    const mockups = projects.filter((p) => p.attributes.mockup.data);

    //const currentlyPlaying = useCurrentlyPlayingContext();
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v < 0.5 && lineI !== 0) {
            setLineI(0);
        } else if (v >= 0.5 && lineI !== 1) {
            setLineI(1);
        }
    });

    //There has got to be a better way of doing this
    const [lineI, setLineI] = useState(0);

    return (
        <motion.section
            className={clsx(
                'relative  flex h-[800vh] w-full flex-col items-start justify-start overflow-clip bg-theme font-title'
            )}
            ref={target}
            initial="hide"
            animate="show"
            onMouseMove={onMouseMove}
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}>
            <motion.div className="sticky top-0 flex h-screen flex-row items-center justify-center bg-theme">
                <motion.div className="flex h-screen w-screen flex-col items-center justify-center gap-12  p-12 pt-20">
                    <motion.div
                        className="absolute top-0 h-full w-full "
                        style={{ opacity: dotsOpacity }}>
                        {lineI === 0 && (
                            <Dots followMouse={mouseEntered} x={x} y={y} />
                        )}
                    </motion.div>
                    <AnimatePresence>
                        {lineI === 1 && (
                            <motion.div
                                className="absolute top-0 flex h-full w-full items-center justify-center"
                                initial="hide"
                                animate="show"
                                variants={{
                                    hide: { rotate: -180 },
                                    show: { rotate: 0 },
                                }}
                                transition={{
                                    ease: 'easeInOut',
                                    duration: 2,
                                }}>
                                {mockups.map((p, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute h-full pt-6"
                                        initial={{ rotate: 0 }}
                                        animate={{
                                            rotate: 360 * (i / mockups.length),
                                        }}
                                        transition={{
                                            ease: 'easeInOut',
                                            duration: 2,
                                        }}>
                                        <div className="relative aspect-square h-36 bg-primary">
                                            <Image
                                                src={`https://marileon.me/cms/${p.attributes.mockup.data?.attributes.url}`}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <header className="heading relative flex h-full w-fit max-w-screen-lg flex-col items-start justify-center gap-3 text-center text-7xl">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={lineI}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}>
                                {lines[lineI]}
                                {lineI === 1 && <Dot />}
                            </motion.h2>
                        </AnimatePresence>
                    </header>

                    <motion.div
                        className="flex grow items-center justify-center"
                        style={{ opacity: dotsOpacity }}>
                        <FaArrowDown />
                    </motion.div>
                </motion.div>
                <GrowingDot scroll={spring}>
                    <About />
                </GrowingDot>
            </motion.div>
        </motion.section>
    );
}
