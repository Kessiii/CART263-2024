/**
Voice Jam - Talk to your Art
Kestrel Villapando

I wanted to create a generative animation/art that moves in 
*/

"use strict";


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

    rotateX(15)

    noFill()
    stroke(255)

    for (var i = 0; i < 90; i++) {

        var r = map(sin(frameCount / 2), -1, 1, 100, 200)
        var g = map(i, 0, 50, 100, 200)
        var b = map(cos(frameCount), -1, 1, 200, 100)

        stroke(r, g, b)

        rotate(0)


        beginShape()
        for (var j = 0; j < 360; j += 60) {
            var rad = i * 8
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 4 + i * 5) * 150

            vertex(x,y,z)
        }
        endShape(CLOSE)
    }
}