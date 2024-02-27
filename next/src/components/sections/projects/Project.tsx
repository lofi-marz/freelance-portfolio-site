import { ProjectContent } from '../../../utils/strapi';
import { MdArrowOutward } from 'react-icons/md';
import { HiArrowUpRight, HiMiniArrowUpRight } from 'react-icons/hi2';
import Image from 'next/image';
import { WithChildrenProps, WithClassNameProps } from '../../../types';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { underlineVariants } from '@/components/sections/projects/variants';
import { useRef } from 'react';
import { cn } from '@/utils/index';
import Link from 'next/link';

const NoHoverTitleVariants: Variants = {
    initial: { bottom: 0, top: 'auto' },
    hover: { top: '100%' },
};

const HoverTitleVariants: Variants = {
    initial: { top: '100%', bottom: 'auto', transition: { delayChildren: 1 } },
    hover: { bottom: 0, top: 'auto' },
};

const ScrollingTextVariants: Variants = {
    initial: { x: '0%', transition: { ease: 'easeOut', duration: 10 } },
    hover: {
        x: '100%',
        transition: {
            repeat: Infinity,
            ease: 'linear',
            duration: 5,
        },
    },
};

const ProjectPreviewVariants = {
    initial: {
        x: '-100%',
        transition: {
            ease: 'easeOut',
            duration: 2,
            bounce: 0,
        },
    },
    hover: {
        x: 0,
        transition: { ease: 'easeOut', duration: 1.5, bounce: 0 },
    },
};

export type ProjectProps = ProjectContent['attributes'] & {
    first?: boolean;
} & WithClassNameProps;
function ProjectsHeading() {
    //TODO: why does the z index mess up
    return (
        <motion.div
            className="text-4xl font-bold lg:text-7xl"
            initial="hide"
            whileInView="show">
            <h2>stuff I&apos;ve made</h2>
            <div className="-mt-4 h-4 w-2/3 ">
                <motion.div
                    variants={underlineVariants}
                    className="h-full w-full bg-primary"
                    style={{ originX: 0 }}
                />
            </div>
        </motion.div>
    );
}

function ProjectLink({ href, children }: { href: string } & WithChildrenProps) {
    return (
        <a
            className="relative flex aspect-square h-full items-center justify-center rounded-full bg-theme-invert text-theme transition-all hover:bg-primary hover:text-light"
            href={href}>
            {children}
        </a>
    );
}

export function MobileProjectImage({ src }: { src: string }) {
    return (
        <div className="card flex aspect-[4/5] w-full flex-col items-center justify-start overflow-clip bg-primary pt-12 shadow-inner">
            <div className="relative aspect-[9/16] w-2/3 drop-shadow-md">
                <Image
                    src={src}
                    alt=""
                    fill
                    className="z-10 rounded-t-xl bg-theme object-cover object-top"
                />
            </div>
        </div>
    );
}
export function ProjectImage({ src }: { src: string }) {
    return (
        <div className="relative aspect-[16/9] w-full">
            <Image
                src={src}
                alt=""
                fill
                className="card z-10 bg-theme object-cover object-top"
            />
        </div>
    );
}
const MotionImage = motion(Image);
export function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    fullDesktop,
    mockup,
    first = false,
    className,
}: ProjectProps) {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start end', 'center center'],
    });
    const spring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 50,
        mass: 1,
        restDelta: 0.001,
    });
    //const scroll = useTransform(spring, [0,1], [])
    const parallax = useTransform(spring, [0, 1], ['-10%', '10%']);
    const reverseParallax = useTransform(spring, [0, 1], ['10%', '-10%']);
    return (
        <motion.div
            className={cn(
                'relative flex aspect-square h-full w-full max-w-[90vh] flex-row items-end justify-start gap-3 overflow-clip rounded-[3rem] p-6 text-xl font-semibold xl:text-3xl',
                className
            )}
            ref={target}
            style={{ y: reverseParallax }}>
            <MotionImage
                src={`https://marileon.me/cms/${mockup.data?.attributes.url}`}
                alt=""
                className="h-full w-full object-cover"
                fill
                style={{ y: parallax, scale: 1.2 }}
            />
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent from-80% to-dark/50" />
            <div className="flex w-full flex-row flex-wrap-reverse gap-3  ">
                <Link
                    className=" relative z-10 flex h-12 items-center justify-center whitespace-nowrap px-10 font-semibold lowercase text-theme transition-all card-solid-theme-invert hover:bg-primary hover:text-light md:h-14 lg:h-20 lg:px-20"
                    href={liveLink}>
                    {title}
                </Link>
                <div className="flex h-12 flex-row gap-3 md:h-14 lg:h-20">
                    <ProjectLink href={liveLink}>
                        <HiMiniArrowUpRight />
                    </ProjectLink>
                    {repoLink && (
                        <ProjectLink href={repoLink}>
                            <FaGithub />
                        </ProjectLink>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
