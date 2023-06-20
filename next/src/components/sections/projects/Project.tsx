import { ProjectContent } from '../../../utils/strapi';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import clsx from 'clsx';
import Image from 'next/image';
import { WithChildrenProps } from '../../../types';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import { FaGithub, FaLink } from 'react-icons/fa';
import {
    projectTitleVariants,
    underlineVariants,
    verticalUnderlineVariants,
} from '@/components/sections/projects/variants';
import { useEffect, useRef, useState } from 'react';
import { NavSpacer } from '@/components/Nav';

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

export type ProjectProps = ProjectContent['attributes'] & { first?: boolean };
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
            className="themed-bg-invert themed-text-invert card flex flex-row items-center justify-center gap-2 p-2 px-4 transition-all hover:bg-primary hover:text-light"
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
                    className="themed-bg z-10 rounded-t-xl object-cover object-top"
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
                className="card themed-bg z-10 object-cover object-top"
            />
        </div>
    );
}
export function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    fullDesktop,
    first = false,
}: ProjectProps) {
    const target = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ['start end', 'center center'],
    });
    const imageHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const imagePosition = useTransform(scrollYProgress, (v) => {
        if (v === 1) return 'fixed';
        if (first) return 'absolute';
        if (v > 0) return 'fixed';
        return 'relative';
    });
    return (
        <div
            className="relative flex h-screen w-full flex-row justify-start"
            ref={target}>
            <motion.div
                className={clsx(
                    'relative z-10 flex flex-col items-center justify-start pl-24 md:h-screen md:justify-center lg:w-[50vw]'
                )}>
                <NavSpacer />

                <div className="justify-baseline flex w-full flex-col items-start md:gap-6">
                    <h3 className="w-full text-4xl font-bold md:text-7xl lg:text-8xl">
                        {title}
                    </h3>
                    <p className="hidden w-full font-body md:block md:w-80">
                        {brief}
                    </p>
                    <div className="card mt-6 flex flex-row items-center justify-center gap-3 text-xl">
                        {liveLink && (
                            <ProjectLink href={liveLink}>
                                <FaLink /> Link
                            </ProjectLink>
                        )}
                        {repoLink && (
                            <ProjectLink href={repoLink}>
                                <FaGithub /> Code
                            </ProjectLink>
                        )}
                    </div>
                </div>
            </motion.div>
            <motion.div
                className={clsx(
                    'absolute right-0 top-0 h-full w-full overflow-clip brightness-50 lg:block lg:w-[50vw] lg:brightness-100'
                )}
                style={{
                    height: first ? '100%' : imageHeight,
                    position: imagePosition,
                }}>
                <div className="relative h-screen w-full">
                    <Image
                        src={
                            'https://marimari.tech/cms' +
                            (fullDesktop
                                ? fullDesktop?.data.attributes.url
                                : desktopPreview.data.attributes.url)
                        }
                        className="h-full w-full object-cover"
                        fill
                        alt="Desktop preview"
                    />
                </div>
            </motion.div>
        </div>
    );
}
