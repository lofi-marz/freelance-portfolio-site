import {
    motion,
    MotionValue,
    useReducedMotion,
    useTransform,
    useWillChange,
} from 'framer-motion';
import { WithChildrenProps } from '../../../types';
import { cn } from 'utils';

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
                'w-full h-screen absolute top-0 grid grid-cols-2 place-content-center justify-items-center items-center justify-center',
                Array.isArray(children) &&
                    children.length === 4 &&
                    'grid-rows-2'
            )}
            style={{ y: parallaxY, willChange }}>
            {children}
        </motion.div>
    );
}
