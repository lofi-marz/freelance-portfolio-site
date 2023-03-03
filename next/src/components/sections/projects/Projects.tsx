import test from '../../../../content/projects/restaurant-landing-page/desktop.png';
import Image from 'next/image';
import path from 'path';
import clsx from 'clsx';
import { text, title } from '../../../fonts';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import { ProjectContent } from 'utils/strapi';
import { motion, Variants } from 'framer-motion';
import { WithChildrenProps } from 'types';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { NavSpacer } from '../..';

type ProjectProps = ProjectContent['attributes'] & { odd?: boolean };

export function Projects() {
    const { projects } = useStrapiContentContext()!;
    const desktop = useMediaQuery('lg');
    return (
        <section
            className={clsx(
                'themed-bg themed-text absolute flex min-h-screen w-full flex-col items-center justify-center gap-4',
                title.className
            )}
            id="projects">
            <NavSpacer/>
            <h2 className="text-4xl lg:text-7xl font-bold">
                stuff I&apos;ve made<div className="-mt-4 h-4 w-2/3 bg-primary"></div>
            </h2>
            <ul className="flex w-full flex-col gap-32 p-6 lg:p-16">
                {projects.map((p, i) => {
                    return !desktop ? <MobileProject key={p.id} {...p.attributes} odd={i % 2 == 1}/> : <Project key={p.id} {...p.attributes} odd={i % 2 == 1}/>
                })}
            </ul>
        </section>
    );
}

const underlineVariants: Variants = {
    hidden: {width: '0%'},
    show: {width: '100%'}
}


const verticalUnderlineVariants: Variants = {
    hidden: {height: '0%'},
    show: {height: '100%', transition: {ease: 'easeOut'}}
}

function ProjectHeader({children, odd}: {odd: boolean} & WithChildrenProps) {
    return (<div className={clsx('text-5xl font-bold w-18 lowercase flex items-start content-end justify-center flex-col', !odd && 'rotate-180')}    style={{ writingMode: 'vertical-rl' }}>
    <h3 className="z-10">{children}</h3>
    <div className="-mr-3 w-4 h-2/3 bg-primary -z-5">
        <motion.div className="w-full h-full bg-primary" variants={verticalUnderlineVariants} initial="hidden" whileInView="show" exit="hidden"/>
    </div>
</div>)
}

function ProjectBrief({children}: WithChildrenProps) {
    
}

function MobileProject({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    odd = false,
}: ProjectProps) {
    return (
        <li
            className={clsx(
                'flex items-center justify-center gap-4 flex-col relative',
            )}>
            <h3 className="text-3xl font-bold w-full">
                {title}<div className="-mt-3 h-4 w-full bg-primary"></div>
            </h3>
            <div className="aspect-[16/9] relative flex items-center justify-center rounded overflow-visible w-full">
                <Image src={'https://marimari.tech/cms' + desktopPreview.data.attributes.url} alt="" fill className="object-contain" />
            </div>
            <div className={clsx('flex w-full  flex-col gap-8 h-full')}>
                <p className={clsx('text-xl invertwhitespace-pre-line', text.className)}>
                    {brief}
                </p>
                <div className="flex flex-row text-xl font-bold">
                    <a
                        className="themed-bg-invert themed-text-invert p-2 px-4"
                        href={repoLink}>
                        github
                    </a>
                    {liveLink && (
                        <a
                            className="themed-text bg-primary p-2 px-4"
                            href={liveLink}>
                            link
                        </a>
                    )}
                </div>
            </div>
        </li>
    );
}

function Project({
    title,
    description,
    repoLink,
    liveLink,
    brief,
    desktopPreview,
    mobilePreview,
    odd = false,
}: ProjectProps) {
    console.log(description);
    return (
        <li
            className={clsx(
                'flex items-start justify-between gap-16 h-96 ',
                odd ? 'flex-row' : 'flex-row-reverse'
            )}>
            <div className="h-full relative flex items-center justify-center rounded overflow-visible w-[48rem]">
                <Image src={'https://marimari.tech/cms' + desktopPreview.data.attributes.url} alt="" fill className="object-contain" />
            </div>
            <div className={clsx('mt-16 flex w-[36rem] flex-col gap-8 h-full', odd ? 'items-end -ml-48' : 'items-start -mr-48')}>
                <p className={clsx('p-4 font-bold text-xl mix-blend-difference saturate-0 themed-text invert dark:invert-0 whitespace-pre-line', text.className)}>
                    {brief}
                </p>
                <div className="z-10 flex flex-row text-xl font-bold">
                    <a
                        className="themed-bg-invert themed-text-invert p-2 px-4"
                        href={repoLink}>
                        github
                    </a>
                    {liveLink && (
                        <a
                            className=" themed-text bg-primary p-2 px-4"
                            href={liveLink}>
                            link
                        </a>
                    )}
                </div>
            </div>
            <ProjectHeader odd={odd}>{title}</ProjectHeader>
        </li>
    );
}
