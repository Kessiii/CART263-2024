class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.maxforce = 0.1; // Turning force to avoid hand
    this.prevPos = this.pos.copy();
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
    if (index < vectors.length) {
      var force = vectors[index];
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(0, 5); // Change the alpha to a low value for a trail effect
    strokeWeight(1);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.set(this.pos);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    this.updatePrev();
  }

  avoidHand(handPos, avoidanceRadius) {
    let desiredSeparation = avoidanceRadius || 50;
    let d = p5.Vector.dist(this.pos, handPos);
    if (d < desiredSeparation) {
      let diff = p5.Vector.sub(this.pos, handPos);
      diff.normalize();
      diff.mult(this.maxspeed);
      diff.sub(this.vel);
      diff.limit(this.maxforce);
      this.applyForce(diff);
    }
  }
}
