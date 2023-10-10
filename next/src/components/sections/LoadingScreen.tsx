import {
    motion,
    useAnimationControls,
    useReducedMotion,
    Variants,
} from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { WithClassNameProps } from 'types';
import { cn } from 'utils';

const loadingScreenVariants: Variants = {
    visible: { display: 'flex' },
    hidden: { display: 'none' },
};

const topRectVariants: Variants = {
    visible: { height: '100vh' },
    hidden: { height: '0vh', transition: { duration: 0.5, ease: 'easeOut' } },
};

const bottomRectVariants: Variants = {
    visible: { height: '10vh' },
    hidden: {
        height: '0vh',
        transition: { duration: 1, delay: 1, ease: 'easeInOut' },
    },
};

const barVariants: Variants = {
    visible: { width: '100%' },
    hidden: {
        width: '0%',
        transition: {
            ease: 'easeInOut',
            duration: 1,
        },
    },
};

type LoadingScreenProps = { onEnd: () => void };

function Bar({ className }: WithClassNameProps) {
    const reducedMotion = useReducedMotion();
    return (
        <motion.div
            className={cn('w-full h-full', className)}
            variants={barVariants}
            custom={reducedMotion}
        />
    );
}
export function LoadingScreen({ onEnd }: LoadingScreenProps) {
    const controls = useAnimationControls();
    const [visible, setVisible] = useState(true);
    const backgroundColourClasses = [
        'bg-red-400',
        'bg-amber-400',
        'bg-green-400',
        'bg-blue-400',
        'bg-violet-400',
    ];
    useLayoutEffect(() => {
        controls.start('hidden').then(() => {
            onEnd();
            setTimeout(() => setVisible(false), 2500);
        });
    }, [controls, onEnd]);
    if (!visible) return null;
    return (
        <motion.div
            className="themed-text fixed top-0 z-50 w-screen h-screen flex-col items-center justify-start overflow-hidden font-title text-8xl font-bold"
            initial="visible"
            animate={controls}
            layoutId="intro-section"
            variants={{ visible: {}, hidden: {} }}
            transition={{ delay: 1, delayChildren: 1 }}
            style={{ originY: 0 }}>
            <motion.div
                className="w-full h-screen absolute top-0 flex flex-col"
                variants={{ visible: {}, hidden: {} }}
                transition={{
                    staggerChildren: 0.1,
                    staggerDirection: -1,
                }}>
                {[...new Array(5)].map((_, i) => (
                    <Bar
                        key={`bar-${i}`}
                        className={backgroundColourClasses[i]}
                    />
                ))}
            </motion.div>
            <motion.div className="flex w-full items-center justify-center h-full">
                <motion.div
                    animate={{
                        rotate: [-10, 10, -10, 10, 10, 0],
                        scale: [0.9, 1.1, 1.1, 1.1, 1, 0],
                    }}
                    transition={{ duration: 1 }}>
                    👋
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
