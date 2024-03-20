/**
Hot Hands
Kestrel Villapando
*/

"use strict";

let handpose;
let video;
let predictions = [];
const [baseX, baseY] = [640, 480];
let scaleFactor = 1.6;
let inc = 0.1;
let zoff = 0;

const maxRectSize = 8;
const spacing = 0.2;

const keypointRadius = 50;

const color1 = [252, 94, 3];
const color2 = [161, 3, 252];

function setup() {
  noiseDetail(8, 0.65);
  video = createCapture(VIDEO);

  scaleFactor = windowHeight / baseY;
  createCanvas(baseX * scaleFactor, baseY * scaleFactor);

  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  // console.log(width, height);
  translate(width, 0);
  scale(-1, 1);

  background(25);
  drawPerlin();
}

function drawPerlin() {
  let xoff = 0; // Start xoff at 0

  // Loop over horizontal pixels
  for (let x = 0; x < width; x += maxRectSize + spacing) {
    let yoff = 0; // For every x, start yoff at 0
    // Loop over vertical pixels
    for (let y = 0; y < height; y += maxRectSize + spacing) {
      let nearKeypoint = true;
      let distScale = 0;

      for (const prediction of predictions) {
        for (const keypoint of prediction.landmarks) {
          const kpx = keypoint[0] * scaleFactor;
          const kpy = keypoint[1] * scaleFactor;
          const kpz = keypoint[2] * scaleFactor;
          const dist = Math.sqrt((x - kpx) ** 2 + (y - kpy) ** 2);
          if (dist < keypointRadius) {
            console.log(kpz);
            distScale += Math.abs(dist - keypointRadius) / keypointRadius;

            nearKeypoint = false;
          }
        }
        if (nearKeypoint) break;
      }

      yoff += inc; // Increment yoff

      let noiseVal = noise(xoff, yoff, zoff);
      if (!nearKeypoint) {
        noiseVal += 0.4 * (distScale + 0.1);
      }

      push();
      translate(x, y);
      // rotate(TWO_PI * noiseVal);
      noStroke();

      const fillColor = color(
        interpolate(color1[0], color2[0], noiseVal ** 3),
        interpolate(color1[1], color2[1], noiseVal ** 3),
        interpolate(color1[2], color2[2], noiseVal ** 3)
      );

      fill(fillColor);
      rect(
        0,
        0,
        (noiseVal - 0.5) * maxRectSize,
        (noiseVal - 0.5) * maxRectSize
      );
      pop();
    }
    xoff += inc; // Increment xoff
  }
  zoff += 0.01; // Increment zoff
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (const prediction of predictions) {
    for (const section of Object.values(prediction.annotations)) {
      for (let i = 0; i < section.length - 1; i++) {
        const [x, y, z] = section[i];
        const [nextX, nextY, nextZ] = section[i + 1];
        fill(0, 255, 0);
        noStroke();
        ellipse(x * scaleFactor, y * scaleFactor, 10, 10);
        stroke(0, 255, 0);
        line(
          x * scaleFactor,
          y * scaleFactor,
          nextX * scaleFactor,
          nextY * scaleFactor
        );
      }

      const [x, y, z] = section[section.length - 1];
      fill(0, 255, 0);
      noStroke();
      ellipse(x * scaleFactor, y * scaleFactor, 10, 10);
    }
  }
}

function interpolate(val1, val2, t) {
  return val1 * t + val2 * (1 - t);
}
