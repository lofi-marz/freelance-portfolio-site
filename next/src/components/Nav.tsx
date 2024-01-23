import clsx from 'clsx';

import { FaBars, FaX } from 'react-icons/fa6';

import { AnimatePresence, Variants, easeOut, motion } from 'framer-motion';
import { useState } from 'react';
import { MotionButton, MotionDialog, MotionModal } from './motion';
import { Dot } from './Dot';
import { title } from '@/styles/fonts';
import { cn } from 'utils';
import Link from 'next/link';
import { socials } from 'utils/socials';
import { WithChildrenProps } from 'types';
import { DarkModeToggle } from './DarkModeToggle';

function Logo() {
    return (
        <motion.div className="z-50 font-semibold" layoutId="logo" layout>
            mari
            <Dot />
        </motion.div>
    );
}
const dialogVariants: Variants = {
    hide: {},
    show: {},
};

const links: { name: string; href: string }[] = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog/posts/1' },
];

type NavLinksProps = { onClick: () => void };
function useHoverIndex() {
    const [current, setCurrent] = useState<number | null>(null);
    const onHoverChange = (i: number) => setCurrent(i);
    return [current, onHoverChange] as const;
}

function NavDot({ layoutId }: { layoutId: string }) {
    return (
        <motion.div className="text-primary" layout layoutId={layoutId}>
            .
        </motion.div>
    );
}

function NavLinks({ onClick }: NavLinksProps) {
    const [current, onHoverChange] = useHoverIndex();
    return (
        <motion.ul
            className="heading relative z-10 flex w-full grow flex-col justify-center text-6xl  lg:text-8xl"
            variants={{ hide: {}, show: {} }}
            transition={{ when: 'afterChildren', staggerChildren: 0.1 }}>
            {links.map(({ name, href }, i) => (
                <motion.li
                    key={name}
                    className="flex flex-row items-center justify-start py-4"
                    variants={{
                        hide: { opacity: 0, x: '-10%' },
                        show: { opacity: 1, x: 0 },
                    }}
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    onHoverStart={() => onHoverChange(i)}>
                    <Link
                        href={href}
                        className="transition-all hover:underline"
                        onClick={onClick}>
                        {name}
                    </Link>
                    {i === current && <NavDot layoutId="nav-dot" />}
                </motion.li>
            ))}
        </motion.ul>
    );
}

function SocialLink({
    href,
    children,
    onHoverStart,
}: { href: string; onHoverStart: () => void } & WithChildrenProps) {
    return (
        <motion.li
            className="relative transition-all"
            variants={{
                hide: { opacity: 0, y: '10%' },
                show: { opacity: 1, y: 0 },
            }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            onHoverStart={onHoverStart}>
            <Link
                href={href}
                target="_blank"
                className="flex w-fit flex-row transition-all">
                {children}
            </Link>
        </motion.li>
    );
}

function SocialsBar() {
    const [current, onHoverChange] = useHoverIndex();
    return (
        <motion.ul
            className="relative z-10 flex w-full flex-row justify-between text-sm font-semibold"
            variants={{ hide: {}, show: {} }}
            transition={{ staggerChildren: 0.1 }}>
            {socials.map(({ name, href }, i) => (
                <SocialLink
                    key={name}
                    href={href}
                    onHoverStart={() => onHoverChange(i)}>
                    {i === current && (
                        <motion.div
                            className="absolute h-full w-full rounded-full bg-primary "
                            layoutId="social-bg"
                        />
                    )}
                    <div className="relative px-2 py-1">{name}</div>
                </SocialLink>
            ))}
        </motion.ul>
    );
}

export function Nav() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const openNav = () => setDialogOpen(true);
    const closeNav = () => setDialogOpen(false);
    return (
        <nav
            className={clsx(
                'heading fixed top-0 z-20 flex h-16 w-full items-center justify-between px-12 font-title text-xl  text-theme-invert'
            )}>
            <Logo />
            <div className="flex gap-4">
                <DarkModeToggle className="h-6" />
                <MotionButton
                    className="flex flex-row items-center justify-center gap-2"
                    onPress={openNav}
                    layout
                    layoutId="nav-menu">
                    <FaBars />
                </MotionButton>
            </div>

            <MotionModal
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                isDismissable
                className={cn('font-title', title.variable)}>
                <AnimatePresence>
                    <MotionDialog
                        key="nav-menu"
                        className={cn(
                            'fixed left-0 top-0 z-40 flex h-screen w-screen flex-col gap-12 px-6 py-12 text-xl lowercase text-theme lg:px-12'
                        )}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        transition={{
                            staggerChildren: 0.5,
                            ease: easeOut,
                            when: 'beforeChildren',
                        }}>
                        <motion.div
                            className="absolute left-0 top-0 h-full w-full origin-left bg-theme-invert"
                            variants={{
                                hide: { scaleX: 0 },
                                show: { scaleX: 1 },
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="relative flex w-full flex-row justify-between"
                            variants={dialogVariants}>
                            <Logo />
                            <MotionButton
                                onPress={closeNav}
                                layout
                                layoutId="nav-menu">
                                <FaX />
                            </MotionButton>
                        </motion.div>
                        <NavLinks onClick={closeNav} />
                        <SocialsBar />
                    </MotionDialog>
                </AnimatePresence>
            </MotionModal>
        </nav>
    );
}

export function NavSpacer() {
    return <div className="h-16"></div>;
}
