"use strict";

var inc = 0.1;
var scl = 20;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 800; i++) {
    particles[i] = new Particle();
  }
  background(51);

  // Initialize video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Initialize handpose with ml5
  handpose = ml5.handpose(video, { flipHorizontal: true }, modelReady);
  handpose.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  background(51);
  // Calculate flow field based on Perlin noise
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
      // Drawing the flow field is optional
    }
    yoff += inc;
    zoff += 0.0003;
  }

  if (predictions.length > 0) {
    const hand = predictions[0].landmarks; // Get all landmarks
    const indexFinger = createVector(hand[8][0], hand[8][1]); // Index finger tip position

    for (let i = 0; i < particles.length; i++) {
      particles[i].followHand(indexFinger); // Follow the index finger tip
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  } else {
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield[index]);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  }
}
