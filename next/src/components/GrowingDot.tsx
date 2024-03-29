import {
    motion,
    MotionValue,
    useMotionTemplate,
    useTransform,
} from 'framer-motion';
import { WithChildrenProps, WithClassNameProps } from '../types';
import { cn } from 'utils';

export function GrowingDot({
    scroll,
    className,
    children,
    breakpoints: [start, end],
}: {
    scroll: MotionValue<number>;
    breakpoints: [number, number];
} & WithClassNameProps &
    WithChildrenProps) {
    const circleSize = useTransform(
        scroll,
        [0, start, end],
        ['0%', '0%', '100%']
    );
    const clipPath = useMotionTemplate`circle(${circleSize} at 50% 50%)`;
    return (
        <motion.div
            className={cn(
                'heading absolute bottom-0 flex h-full w-full items-center justify-center bg-primary',
                className
            )}
            style={{ clipPath }}>
            {children}
        </motion.div>
    );
}
