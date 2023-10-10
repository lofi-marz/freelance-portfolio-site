import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const CANVAS_WIDTH = 1920/2;
const CANVAS_HEIGHT = 1080/2;
const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    p5.draw = () => {
        p5.background(250);
        p5.normalMaterial();
        p5.push();
        p5.rotateZ(p5.frameCount * 0.01);
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotateY(p5.frameCount * 0.01);
        p5.plane(100);
        p5.pop();
    };
};

export function Dots() {
    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}