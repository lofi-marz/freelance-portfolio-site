import {
    motion,
    MotionValue,
    useReducedMotion,
    useTransform,
    useWillChange,
} from 'framer-motion';
import { WithChildrenProps } from '../../../types';
import { cn } from 'utils';
import { useMediaQuery } from 'hooks/useMediaQuery';

export function ParallaxLayer({
    children,
    scrollProgress,
    start,
    end,
}: {
    scrollProgress: MotionValue;
    start: string;
    end: string;
} & WithChildrenProps) {
    const willChange = useWillChange();
    const reducedMotion = useReducedMotion();

    const parallaxY = useTransform(
        scrollProgress,
        [0, 0.25, 1],
        [start, start, end]
    );
    if (reducedMotion) return null;
    return (
        <motion.div
            className={cn(
                'pointer-events-none absolute top-0 grid h-screen w-full grid-cols-2 place-content-center items-center justify-center justify-items-center',
                Array.isArray(children) &&
                    children.length === 4 &&
                    'grid-rows-2'
            )}
            style={{ y: parallaxY, willChange }}>
            {children}
        </motion.div>
    );
}
