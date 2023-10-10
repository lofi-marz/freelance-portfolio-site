import React from 'react';
import { type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import theme from '../../../tailwind.config';

const CANVAS_WIDTH = 1920 / 1.5;
const CANVAS_HEIGHT = 1080 / 1.5;
const MAX_RADIUS = 50;
const MIN_RADIUS = 10;
const SPACING = 10;
const primaryColor = theme.theme.extend.colors.primary;
const dark = theme.theme.extend.colors.dark['950'];
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

export function Dots() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <NextReactP5Wrapper sketch={sketch} />
        </div>
    );
}
