import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LoadingScreen } from '@/components/sections/LoadingScreen';

import { SlideInText } from '@/components/SlideInText';
import { body, title } from '../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';
import { About } from '@/components/sections/about/About';
import { CallToAction } from '@/components/sections/intro/CallToAction';
import { Intro } from '@/components/sections/intro';
import { Nav } from '@/components/index';
import { GetStaticProps } from 'next';
import { GetCurrentlyPlayingResponse } from '../utils/spotify';
import {
    AboutContent,
    getStrapiContent,
    GlobalContent,
    ProjectContent,
} from '../utils/strapi';
import { StrapiContentContextProvider } from '@/components/StrapiContextProvider';
import { Projects } from '@/components/sections/projects';
import qs from 'qs';
import { Contact } from '@/components/sections/contact';
import theme from '../../tailwind.config';
//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

function Title() {
    return (
        <motion.div
            transition={{ staggerChildren: 0.2 }}
            variants={contentVariants}>
            <h1
                className={clsx(
                    'flex flex-col gap-2 text-8xl font-bold lowercase',
                    title.className
                )}>
                <SlideInText>
                    Hi, <br />
                    I&apos;m
                    <br />
                    Omari
                </SlideInText>
            </h1>
            <div className="h-3 w-3/5">
                <motion.div
                    className="h-full w-full bg-primary"
                    variants={underlineVariants}></motion.div>
            </div>
        </motion.div>
    );
}

function VideoBackground() {
    return (
        <div className="relative flex h-56 w-full items-center justify-center overflow-clip md:h-full">
            <video
                className="h-full w-full object-cover brightness-[.6] saturate-[.6]"
                autoPlay
                loop
                muted>
                <source src="/video.mp4" type="video/mp4" />
            </video>
            <SocialsDesktop />
        </div>
    );
}

const contentVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.3 } },
};

const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
};

function Content() {
    return (
        <motion.main
            className={clsx(
                'themed-text flex h-full w-full flex-col items-center justify-center gap-10 bg-light bg-theme px-10 md:w-1/2 md:max-w-2xl md:p-10',
                title.className
            )}
            layoutId="intro-section"
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}>
            <div className="relative flex h-full w-full flex-col items-start justify-evenly">
                <Title />
                <motion.p
                    className="w-full text-center text-2xl text-dark md:text-start dark:text-light"
                    variants={fadeVariants}>
                    Nottingham-based freelance web design and development.
                </motion.p>
                <CallToAction />
            </div>
        </motion.main>
    );
}

type HomeProps = {
    spotify: { currentlyPlaying: GetCurrentlyPlayingResponse };
    content: GlobalContent;
};

export default function Home({ content }: HomeProps) {
    const ref = useRef(null);

    const [loading, setLoading] = useState(true);
    useEffect(() => console.log('Loading:', loading), [loading]);

    if (content === undefined) return <div>Hi! Somethings gone wrong</div>;

    //TODO: Better error handling here
    return (
        <StrapiContentContextProvider strapiContent={content}>
            <motion.div
                className={clsx(
                    'relative flex min-h-screen w-full flex-col items-center justify-center font-title',
                    title.variable,
                    body.variable
                )}
                id="home">
                <LoadingScreen onEnd={() => setLoading(false)} />

                <motion.div className="themed-text w-full snap-y snap-mandatory bg-theme">
                    <Nav />

                    <Intro />

                    <About />
                    <Projects />
                    <Contact />
                </motion.div>
            </motion.div>
        </StrapiContentContextProvider>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const query = qs.stringify(
        {
            populate: '*',
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    //TODO: How do I scale this up for more data

    const [about = {}, projects = []] = await Promise.all([
        //getSpotifyProps(),
        getStrapiContent<AboutContent>('about'),
        getStrapiContent<ProjectContent[]>('projects?' + query),
    ]);

    return { props: { content: { about, projects } } };
};
