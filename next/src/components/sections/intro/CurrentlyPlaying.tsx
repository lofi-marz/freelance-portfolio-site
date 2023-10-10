import { useCurrentlyPlayingContext } from '@/components/CurrentlyPlayingContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCompactDisc } from 'react-icons/fa';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { trackVariants } from './Intro';

function CurrentlyPlaying() {
    const currentlyPlaying = useCurrentlyPlayingContext()!;
    const [trackShown, setTrackShown] = useState(false);
    const showTrack = () => setTrackShown(true);
    const hideTrack = () => setTrackShown(false);
    const isDesktop = useMediaQuery('md');
    return (
        <motion.div
            className="flex h-full w-full rotate-180 flex-row items-center justify-center gap-2"
            style={{ writingMode: 'vertical-rl' }}
            onHoverEnd={() => hideTrack()}
            onTapStart={() => showTrack()}
            onTap={(e) => hideTrack()}
            layout>
            <motion.div
                animate={{
                    rotate: [0, 60, 120, 180, 240, 300, 360],
                    opacity: [0.9, 1, 0.9, 1, 0.9, 0.9],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 5,
                }}
                onHoverStart={() => showTrack()}
                layout>
                <FaCompactDisc />
            </motion.div>
            <AnimatePresence>
                {trackShown && (
                    <motion.div
                        className="flex w-full flex-row items-center justify-center gap-2"
                        key="currently-playing"
                        variants={trackVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        layout>
                        Currently Listening
                        {isDesktop ? (
                            <a
                                href={
                                    currentlyPlaying.item.external_urls.spotify
                                }
                                target="_blank"
                                className="transition-all hover:text-primary hover:underline"
                                rel="noreferrer">
                                {currentlyPlaying.item.name}
                            </a>
                        ) : (
                            currentlyPlaying.item.name
                        )}
                        ({currentlyPlaying.item.artists[0].name})
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
