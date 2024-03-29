/**
Voice Jam - Talk to your Art
Kestrel Villapando

I wanted to create a generative animation art that moves with the sound of the user's voice. 
*/

"use strict";

const rec = new p5.SpeechRec();
rec.continuous = true;
rec.interimResults = true;
rec.onResult = playWave; 
rec.start();
let start = 0;
let frameCounter = 0

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    angleMode(DEGREES)

}


/**
Description of draw()
*/
function draw() {
    background(100, 0, 0)

    let r = map(sin(frameCounter / 2), -1, 1, 100, 200)
    let g = map(-sin(frameCounter), -1, 1, 100, 200)
    let b = map(cos(frameCounter), -1, 1, 200, 100)

    lightFalloff(0.97, 0, 0);
    pointLight(r, g, b, 0, 40, sin(frameCounter * 4) * 50 - 120);

    noFill()
    stroke(255)
    rotateX(15)

    push()
    translate(0,0, -200)
    noStroke()
    ambientMaterial(250);
    plane(4000, 4000)
    pop()


    if (Date.now() - 500 < start){
        frameCounter++;
    }

    for (let i = 1; i <= 30; i++) {
        let rad = i * 8

        let r = map(sin(frameCounter / 2), -1, 1, 100, 200)
        let g = map(i, 0, 50, 100, 200)
        let b = map(cos(frameCounter), -1, 1, 200, 100)

        stroke(r, g, b)

        let z = sin(frameCounter * 4 + i * 5) * 150

        beginShape()
        rotateZ(frameCounter/rad)
        for (let j = 0; j < 360; j += 60) {
            let x = rad * cos(j)
            let y = rad * sin(j)

            vertex(x,y,z)
        }
        endShape(CLOSE)
    }

}
function playWave() {
    start = Date.now();
}