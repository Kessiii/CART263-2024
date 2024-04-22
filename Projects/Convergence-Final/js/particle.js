class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.size = 0.5;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  repulse(predictions, closeRadius, farRadius) {
    for (const prediction of predictions) {
      for (const keypoint of prediction.landmarks) {
        const kpx = keypoint[0];
        const kpy = keypoint[1];
        const dist = Math.sqrt(
          (this.pos.x - kpx) ** 2 + (this.pos.y - kpy) ** 2
        );
        if (dist < closeRadius) {
          const vec = createVector(this.pos.x - kpx, this.pos.y - kpy);
          this.applyForce(vec.mult(5));
        } else if (dist > closeRadius && dist < farRadius) {
          const vec = createVector(kpx - this.pos.x, kpy - this.pos.y);
          this.applyForce(vec.div(100));
        }
      }
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(240, 30);
    strokeWeight(10);

    point(this.pos.x, this.pos.y);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
