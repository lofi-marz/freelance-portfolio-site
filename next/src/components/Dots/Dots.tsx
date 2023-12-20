import React, {
    MouseEventHandler,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import { type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import theme from '../../../tailwind.config';
import {
    MotionValue,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useSpring,
    useTime,
    useTransform,
} from 'framer-motion';

const CANVAS_WIDTH = 1920 / 1.5;
const CANVAS_HEIGHT = 1080 / 1.5;
const MAX_RADIUS = 50;
const MIN_RADIUS = 10;
const SPACING = 10;
const primaryColor = theme.theme.extend.colors.primary;
const dark = theme.theme.extend.colors.theme;
const sketch: Sketch = (p5) => {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    let easedX = 0;
    let easedY = 0;
    const easing = 0.05;
    p5.draw = () => {
        p5.noStroke();
        p5.background(dark);

        let targetX = p5.mouseX;
        let dx = targetX - easedX;
        easedX += dx * easing;

        let targetY = p5.mouseY;
        let dy = targetY - easedY;
        easedY += dy * easing;

        for (let y = 0; y < CANVAS_HEIGHT; y += MAX_RADIUS * 1 + SPACING) {
            for (let x = 0; x < CANVAS_WIDTH; x += MAX_RADIUS * 1 + SPACING) {
                const distance = p5.dist(
                    x + MAX_RADIUS,
                    y + MAX_RADIUS,
                    easedX,
                    easedY
                );
                const radius = p5.map(
                    distance,
                    50,
                    500,
                    MAX_RADIUS,
                    MIN_RADIUS,
                    true
                );
                p5.fill(primaryColor);

                p5.circle(x + MAX_RADIUS, y + MAX_RADIUS, radius);
                /*p5.fill('white');
                p5.text(
                    `${(2 / distance).toFixed(1)} ${distance.toFixed(0)}`,
                    x + MAX_RADIUS,
                    y + MAX_RADIUS
                );*/
            }
        }
    };
};

function Dot({
    x,
    y,
    followMouse,
}: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    followMouse: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const time = useTime();
    const distance = useTransform(() => {
        if (typeof window === 'undefined') return 0;
        const pos = ref.current?.getBoundingClientRect();
        const dotX = pos?.x ?? 0;
        const dotY = pos?.y ?? 0;
        if (!followMouse) {
            const sin = Math.sin(time.get() / 750 + dotX / 250);
            return ((sin + 1) / 2) * 0.2;
        }
        const xPos = (x.get() - dotX) / window.screen.width;
        const yPos = (y.get() - dotY) / window.screen.height;
        return Math.sqrt(xPos ** 2 + yPos ** 2);
    });

    const spring = useSpring(distance, {
        stiffness: 100,
        damping: 50,
        mass: 1,
        restDelta: 0.001,
    });
    const scale = useTransform(spring, (v) =>
        Math.min(0.9, (1 - v) ** 8 + 0.2)
    );

    return (
        <div className="aspect-square h-1/5 p-0 sm:h-1/3">
            <motion.div
                className="aspect-square h-full rounded-full bg-primary"
                style={{ scale }}
                ref={ref}
            />
        </div>
    );
}

export function Dots() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mouseEntered, setMouseEntered] = useState(false);
    const onMouseMove: MouseEventHandler = (e) => {
        x.set(e.clientX); //Offsets to make the image line up with the actual cursor
        y.set(e.clientY);
    };
    return (
        <motion.div
            className="flex h-full w-full flex-row flex-wrap items-center justify-between"
            onMouseMove={onMouseMove}
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}>
            {[...new Array(48)].map((_, i) => (
                <Dot key={i} x={x} y={y} followMouse={mouseEntered} />
            ))}
        </motion.div>
    );
}
