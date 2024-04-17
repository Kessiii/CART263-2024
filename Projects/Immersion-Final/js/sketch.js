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
var inc = 0.1;
var scl = 20;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(
    video,
    {
      flipHorizontal: true, // since the video will act as a mirror
    },
    () => console.log("Model loaded")
  );

  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide();
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 800; i++) {
    particles[i] = new Particle();
  }
  background(51);
}

function draw() {
  if (predictions.length > 0) {
    const hand = predictions[0].landmarks; // Get all landmarks
    const indexFinger = hand[5]; // Example: Index finger tip position
    particles.forEach((particle) => {
      particle.followHand({ x: indexFinger[0], y: indexFinger[1] });
      particle.update();
      particle.edges();
      particle.show();
    });
  } else {
    // Update normally without hand influence
    particles.forEach((particle) => {
      particle.follow(flowfield);
      particle.update();
      particle.edges();
      particle.show();
    });
  }

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0002;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
}
