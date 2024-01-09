import { useState } from 'react';
import { AnimatedIconLink, IconLink } from '@/components/IconLink';
import {
    FaArrowDown,
    FaArrowUp,
    FaAt,
    FaBook,
    FaGithub,
    FaLinkedin,
} from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
function Arrow() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    return (
        <motion.a
            className="absolute bottom-12 text-xl"
            href="#about"
            animate={{ y: [0, 10, 0] }}
            style={{ opacity }}
            transition={{ repeat: Infinity }}>
            <FaArrowDown />
        </motion.a>
    );
}

export function SocialsDesktop() {
    const [selectedSocial, setSelectedSocial] = useState<number | null>(null);
    const onEnter = (index: number | null) => {
        setSelectedSocial(index);
    };

    return (
        <div
            className="flex h-full flex-col items-center justify-center gap-2 px-5 text-xl text-light"
            onMouseLeave={() => setSelectedSocial(null)}>
            <div className="z-10 flex w-fit flex-col items-center justify-center gap-1 rounded-r">
                <AnimatedIconLink
                    href="Omari Thompson-Edwards CV.pdf"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={0}>
                    <FaBook />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={1}>
                    <FaLinkedin />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="https://github.com/lofi-marz"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={2}>
                    <FaGithub />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="mailto:othompsonedwards@gmail.com?subject=I%20need%20a%20website!"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={3}>
                    <FaAt />
                </AnimatedIconLink>
            </div>

            <Arrow />
        </div>
    );
}

function SocialsMobile() {
    return (
        <div className="card flex w-full items-center justify-center gap-2 md:flex-col md:bg-red-400 md:text-light">
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaBook />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195">
                <FaLinkedin />
            </IconLink>
            <IconLink href="https://github.com/lofi-marz">
                <FaGithub />
            </IconLink>
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaAt />
            </IconLink>
        </div>
    );
}
