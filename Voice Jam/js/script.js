/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
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
    background(mouseX, 0, 0)

    rotateX(6)

    noFill()
    stroke(255)

    for (var i = 0; i < 50; i++) {

        var r = map(sin(frameCount / 2), -1, 1, 100, 200)
        var g = map(i, 0, 50, 100, 200)
        var b = map(cos(frameCount), -1, 1, 200, 100)

        stroke(r, g, b)

        rotate(0)


        beginShape()
        for (var j = 0; j < 360; j += 60) {
            var rad = i * 6
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 4 + i * 5) * 150

            vertex(x,y,z)
        }
        endShape(CLOSE)
    }
}