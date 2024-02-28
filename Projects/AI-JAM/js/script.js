/**
Enveloppe Yourself 
Kestrel Villapando
*/

"use strict";

/**
Description of preload
*/
let handpose;
let video;
let predictions = [];
const [baseX, baseY] = [640, 480];
let scaleFactor = 1.6;
let inc = 0.1;
let zoff = 0;

const maxRectSize = 8;
const spacing = 0.2;

const keypointRadius = 25;

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

  background(255);
  // We can call both functions to draw all keypoints and the skeletons
  drawPerlin();
  // drawKeypoints();
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
            distScale = Math.abs(dist - keypointRadius) / keypointRadius;

            nearKeypoint = false;
            break;
          }
        }
        if (nearKeypoint) break;
      }

      yoff += inc; // Increment yoff

      let noiseVal = noise(xoff, yoff, zoff);
      push();
      translate(x, y);
      // rotate(TWO_PI * noiseVal);
      noStroke();
      fill(0);
      if (!nearKeypoint) {
        noiseVal += 0.4 * (distScale + 0.1);
      }
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
