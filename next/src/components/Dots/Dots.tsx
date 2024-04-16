import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { type Sketch } from '@p5-wrapper/react';
import theme from '../../../tailwind.config';
import {
    MotionValue,
    motion,
    useMotionValue,
    useReducedMotion,
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
const MOUSE_OFFSET_X = 25;
const MOUSE_OFFSET_y = MOUSE_OFFSET_X;

function Dot({
    x,
    y,
    followMouse,
}: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    followMouse: boolean;
}) {
    const reducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const time = useTime();
    const pos = ref.current?.getBoundingClientRect();
    const distance = useTransform(() => {
        if (typeof window === 'undefined') return 0;

        const dotX = pos?.x ?? 0;
        const dotY = pos?.y ?? 0;

        if (reducedMotion) {
            const sin = Math.sin((dotY + dotX) / 250);
            return ((sin + 1) / 2) * 0.2;
        }
        if (!followMouse) {
            const sin = Math.sin(
                time.get() / 750 +
                    dotX / 250 +
                    Math.cos(time.get() / 500 + dotY / 250)
            );
            return ((sin + 1) / 2) * 0.5;
        }
        const xPos: number =
            (x.get() - MOUSE_OFFSET_X - dotX) / window.screen.width;
        const yPos: number =
            (y.get() - MOUSE_OFFSET_y - dotY) / window.screen.height;

        return Math.hypot(xPos, yPos);
    });

    const spring = useSpring(distance, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const scale = useTransform(spring, (v) =>
        Math.min(1, Math.max(0.1, (1 - v) ** 5))
    );

    return (
        <motion.div className="aspect-square w-[10%] lg:w-[5%]">
            <motion.div
                className="aspect-square h-full rounded-full bg-primary"
                style={{ scale }}
                ref={ref}
            />
        </motion.div>
    );
}

export function Dots({
    followMouse,
    x,
    y,
}: {
    followMouse: boolean;
    x: MotionValue<number>;
    y: MotionValue<number>;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <motion.div
            className="mx-auto flex h-screen w-screen max-w-screen-2xl flex-wrap place-content-center place-items-center overflow-clip p-6"
            initial="hide"
            whileInView="show"
            onViewportEnter={() => setVisible(true)}
            onViewportLeave={() => setVisible(true)}
            transition={{ delayChildren: 2 }}
            layout>
            {visible &&
                [...new Array(100)].map((_, i) => (
                    <Dot key={i} x={x} y={y} followMouse={followMouse} />
                ))}
        </motion.div>
    );
}
