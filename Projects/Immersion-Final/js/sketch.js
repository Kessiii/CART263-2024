"use strict";

let video;
let handposeModel;
let predictions = [];

// Your existing particle system setup
var inc = 0.1;
var scl = 20;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
  background(51);

  // Initialize the webcam video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Load the TensorFlow.js handpose model
  handpose.load().then((model) => {
    handposeModel = model;
    console.log("Handpose model loaded");
  });
}

function draw() {
  background(51);

  // Calculate the Perlin noise flow field
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }

  if (video.loadedmetadata && handposeModel) {
    // Get hand predictions
    handposeModel.estimateHands(video.elt).then((estimatedHands) => {
      predictions = estimatedHands;
      // Use the predictions to influence the particle system
      if (predictions.length > 0) {
        const hand = predictions[0].landmarks;
        const indexFinger = createVector(hand[8][0], hand[8][1]); // Using the index finger tip position

        particles.forEach((p) => {
          p.followHand(indexFinger);
          p.update();
          p.edges();
          p.show();
        });
      } else {
        particles.forEach((p) => {
          p.follow(flowfield);
          p.update();
          p.edges();
          p.show();
        });
      }
    });
  }
}
