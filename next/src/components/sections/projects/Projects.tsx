import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Project } from './Project';
import { useRef } from 'react';
import { ProjectContent } from '@/utils/strapi';
import { Dot } from '../..';
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
        stiffness: 50,
        damping: 30,
        restDelta: 0.001,
    });
    const x = useTransform(spring, [0, 1], ['0%', '150%']);

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
const MAX_FEATURED = 5;

function ExtraProjectLink({
    project: { attributes },
}: {
    project: ProjectContent;
}) {
    const reducedMotion = useReducedMotion();
    return (
        <motion.a
            href={attributes.liveLink}
            className="flex transition-all  hover:text-primary"
            whileHover={reducedMotion ? 'show' : 'hover'}
            variants={{
                hide: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            layout>
            <div className="w-fit whitespace-nowrap">{attributes.title}</div>
            <motion.span
                animate="show"
                variants={{
                    show: { width: '100%' },
                    hover: { width: '1ch' },
                }}
                className="flex justify-end">
                <Dot />
            </motion.span>
        </motion.a>
    );
}
export function Projects() {
    const { projects } = useStrapiContentContext()!;

    const [featured, rest] = projects.reduce(
        ([featured, rest], curr) => {
            const featuredHasSpace = featured.length < MAX_FEATURED;
            return featuredHasSpace && curr.attributes.mockup.data
                ? [[...featured, curr], rest]
                : [featured, [...rest, curr]];
        },
        [[], []] as [ProjectContent[], ProjectContent[]]
    );

    console.log(projects, featured, rest);

    console.assert(
        projects.length === featured.length + rest.length,
        'asserted'
    );

    const [p1, p2, p3, p4, p5] = featured;

    const md = useMediaQuery('md');
    return (
        <motion.section
            className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-primary to-theme-invert font-title "
            id="projects">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-dark py-24 pb-48 text-theme lg:rounded-[9rem]">
                <RepeatText n={2}>Projects</RepeatText>
                <div className="flex w-full flex-col items-start justify-center gap-8 p-6 lg:gap-32 lg:px-12">
                    <div className="flex w-full flex-col items-end gap-8 lg:flex-row lg:gap-32">
                        <Project {...p1.attributes} />
                        <Project {...p2.attributes} className="lg:w-1/3" />
                    </div>
                    <Project {...p3.attributes} className="mx-auto" />
                    <div className="items-between flex w-full flex-col justify-between gap-8 lg:flex-row lg:gap-32">
                        <Project {...p4.attributes} className="lg:w-1/3" />
                        <Project {...p5.attributes} />
                    </div>
                </div>
                <motion.div
                    className="flex w-full flex-col gap-2 px-12 text-xl lowercase md:text-3xl"
                    initial="hide"
                    whileInView="show"
                    exit="hide"
                    transition={{
                        staggerChildren: 0.1,
                        transition: { duration: 0.1 },
                    }}>
                    <motion.h2
                        className="heading"
                        variants={{
                            hide: { opacity: 0 },
                            show: { opacity: 1 },
                        }}>
                        ( Or check out the rest )
                    </motion.h2>
                    {...rest.map(({ id, attributes }) => (
                        <ExtraProjectLink
                            key={id}
                            project={{ id, attributes }}
                        />
                    ))}
                </motion.div>
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
        <div className="z-10  flex flex-row text-xl font-bold">
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
