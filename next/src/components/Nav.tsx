import clsx from 'clsx';

import { FaBars, FaX } from 'react-icons/fa6';

import { AnimatePresence, Variants, easeOut, motion } from 'framer-motion';
import { useState } from 'react';
import { MotionButton, MotionDialog, MotionModal } from './motion';
import { Dot } from './Dot';
import { title } from 'fonts';
import { cn } from 'utils';
import Link from 'next/link';
import { socials } from 'utils/socials';

function Logo() {
    return (
        <motion.div className="z-50 font-semibold" layoutId="logo" layout>
            mari<span className="text-primary">.</span>
        </motion.div>
    );
}
const dialogVariants: Variants = {
    hide: { opacity: 1 },
    show: { opacity: 1 },
};

const links: { name: string; href: string }[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
];

type NavLinksProps = { onClick: () => void };

function NavLinks({ onClick }: NavLinksProps) {
    return (
        <motion.ul
            className="relative z-10 flex w-full grow flex-col justify-center text-6xl font-semibold lg:text-8xl "
            variants={{ hide: {}, show: {} }}>
            {links.map(({ name, href }) => (
                <motion.li key={name} className="py-4">
                    <Link
                        href={href}
                        className="hover:card-solid-primary transition-all hover:px-6 hover:py-2 lg:hover:px-20"
                        onClick={onClick}>
                        {name}
                    </Link>
                </motion.li>
            ))}
        </motion.ul>
    );
}

function SocialsBar() {
    return (
        <motion.ul
            className="z-10 flex w-full flex-row justify-between text-sm"
            variants={{ hide: {}, show: {} }}
            transition={{ staggerChildren: 0.5 }}>
            {socials.map(({ name, href }) => (
                <motion.li
                    key={name}
                    className="transition-all"
                    variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
                    transition={{ ease: 'easeOut' }}>
                    <Link
                        href={href}
                        target="_blank"
                        className="transition-all">
                        {name}
                    </Link>
                </motion.li>
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
                'fixed top-0 z-20 flex h-16 w-full items-center justify-between px-12 font-title text-xl text-theme-invert'
            )}>
            <Logo />

            <MotionButton
                className="flex flex-row items-center justify-center gap-2"
                onPress={openNav}
                layout
                layoutId="nav-menu">
                <FaBars />
            </MotionButton>

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
