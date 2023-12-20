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
    const [projectI, setProjectI] = useState(0);
    const onChange = (p: number) => () => setProjectI(p);
    const project = projects[projectI];
    const md = useMediaQuery('md');
    return (
        <motion.section
            className="themed-text relative z-10 mt-[-1px] flex min-h-screen w-full flex-col items-center justify-center bg-theme py-24 font-title "
            id="projects">
            <RepeatText n={2}>Projects</RepeatText>
            <div className="flex w-full flex-col items-start justify-center">
                {projects.map((p, i) => (
                    <Project key={p.id} {...p.attributes} first={i == 0} />
                ))}
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
