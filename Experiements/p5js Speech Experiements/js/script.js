/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynthesizer = new p5.Speech();

let showSubtitle = false;
let toSay = 'Hello world!';

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    createCanvas(600,600)
    console.log(speechSynthesizer.listVoices());

    //synthesis
    speechSynthesizer.setPitch(0.2);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice('Google UK English Male');

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded; 
    
}    


/**
Description of draw()
*/
function draw() {
    background(244, 125, 199)

    if (showSubtitle) {
        textSize(36);
        text(toSay, 100, 100);
    }
}

function mousePressed() {
    speechSynthesizer.speak(toSay);
}


function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false
}