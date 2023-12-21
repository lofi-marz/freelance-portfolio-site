import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import {
    motion,
    MotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Project } from './Project';
import { useRef, useState } from 'react';
import { ProjectPreview } from '@/components/sections/projects/ProjectPreview';
import Image from 'next/image';
import { FaLink } from 'react-icons/fa6';
type RepeatTextProps = {
    n: number;
} & WithChildrenProps;
const toPercent = (n: number) => n * 100 + '%';
function RepeatText({ n, children }: RepeatTextProps) {
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ['start end', 'end start'],
    });
    const spring = useSpring(scrollYProgress, {
        stiffness: 10,
        damping: 30,
        restDelta: 0.001,
    });
    const x = useTransform(spring, [0, 1], ['0%', '100%']);

    /*useMotionValueEvent(x, 'change', (v) => {
        console.log(scrollYProgress.get(), spring.get(), v);
    });*/

    return (
        <motion.header className="relative flex w-full flex-col items-center justify-center overflow-clip py-36 text-8xl font-bold md:text-[18rem]">
            <motion.div
                className="relative flex flex-row items-center justify-center gap-2"
                ref={headerRef}
                style={{ x }}>
                {[...Array(n)].map((_, i) => (
                    <span
                        className="absolute px-4"
                        key={i}
                        style={{ left: toPercent(i + 1) }}>
                        {children}
                    </span>
                ))}
                <span className="px-4">Projects</span>
                {[...Array(n)].map((_, i) => (
                    <span
                        className="absolute px-4"
                        key={i}
                        style={{ right: toPercent(i + 1) }}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </motion.header>
    );
}

export function Projects() {
    const { projects } = useStrapiContentContext()!;

    const [p1, p2, p3, p4, p5, ...rest] = projects.filter((p) =>
        Boolean(p.attributes.mockup?.data)
    );

    console.log(p1, p2, p3, p4, p5, rest);

    const md = useMediaQuery('md');
    return (
        <motion.section
            className="relative z-10 mt-[-1px] flex min-h-screen w-full flex-col items-center justify-center bg-theme py-24 font-title "
            id="projects">
            <RepeatText n={2}>Projects</RepeatText>
            <div className="flex w-full flex-col items-start justify-center gap-32 px-12">
                <div className="flex w-full flex-row items-end gap-32">
                    <Project {...p1.attributes} />
                    <Project {...p2.attributes} className="w-1/3" />
                </div>
                <Project {...p3.attributes} className="mx-auto" />
            </div>
        </motion.section>
    );
}

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    show: { width: '100%' },
};

function ProjectBrief({ children }: WithChildrenProps) {}

type ProjectLinksProps = {
    repoLink?: string;
    liveLink?: string;
};
function ProjectLinks({ repoLink, liveLink }: ProjectLinksProps) {
    return (
        <div className="f lex  z-10 flex-row text-xl font-bold">
            {repoLink && (
                <a
                    className="themed-text-invert bg-theme-invert p-2 px-4"
                    href={repoLink}>
                    github
                </a>
            )}
            {liveLink && (
                <a className="themed-text bg-primary p-2 px-4" href={liveLink}>
                    link
                </a>
            )}
        </div>
    );
}
