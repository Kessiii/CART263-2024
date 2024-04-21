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
// Importing required libraries for hand tracking
let handpose;
let predictions = [];
let video;

let inc = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;

let particles = [];

let flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 10000; i++) {
    // Adjust number of particles as needed
    particles[i] = new Particle();
  }
  background(0, 10);

  // Setup the video capture and handpose model
  video = createCapture(VIDEO);
  video.size(width, height);

  // Load the handpose model, more info: https://learn.ml5js.org/#/reference/handpose
  handpose = ml5.handpose(video, () => console.log("Model ready!"));
  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide(); // Hide the HTML element of the video
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);

  translate(width, 0);
  scale(-1, 1);

  // Update flow field based on noise and possibly hand positions
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;

      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.0002;
  }

  // drawKeypoints();

  if (predictions.length > 0) {
    const hand = predictions[0];
    const indexFingerTip = hand.annotations.indexFinger[3]; // Using the index finger tip
    const fingerX = indexFingerTip[0];
    const fingerY = indexFingerTip[1];

    // Optionally modify flow field based on the finger position
    // This could involve changing vector directions near the finger, influencing particle behavior, etc.
  }

  // Move and display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].repulse(predictions, 80, 160);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function drawKeypoints() {
  for (const prediction of predictions) {
    for (const section of Object.values(prediction.annotations)) {
      for (let i = 0; i < section.length - 1; i++) {
        const [x, y, z] = section[i];
        const [nextX, nextY, nextZ] = section[i + 1];
        fill(0, 255, 0);
        noStroke();
        ellipse(x, y, 10, 10);
        stroke(0, 255, 0);
        line(x, y, nextX, nextY);
      }

      const [x, y, z] = section[section.length - 1];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}
