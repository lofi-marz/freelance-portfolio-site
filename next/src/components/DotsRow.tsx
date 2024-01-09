import {
    MotionValue,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';
function Dot({ scroll, i }: { scroll: MotionValue<number>; i: number }) {
    const y = useTransform(
        scroll,
        (v) => Math.cos(2.5 * Math.PI * (2 * v + i / 10)) * 100
    );
    //useMotionValueEvent(y, 'change', (v) => console.log(v));
    return (
        <motion.div
            className="aspect-square h-24 rounded-full bg-primary"
            style={{ y }}
        />
    );
}
export function DotsRow({ scroll }: { scroll: MotionValue<number> }) {
    const target = useRef(null);

    const x = useTransform(scroll, [0, 0.5], ['100%', '0%'], {
        clamp: false,
    });
    useMotionValueEvent(scroll, 'change', (v) => console.log(`Scroll: ${v}`));
    return (
        <div
            className=" flex h-screen w-screen items-center justify-center"
            ref={target}>
            <div className="flex h-24 w-full flex-row justify-between gap-4">
                {[...new Array(12)].map((_, i) => (
                    <Dot key={i} scroll={scroll} i={i} />
                ))}
            </div>
        </div>
    );
}
