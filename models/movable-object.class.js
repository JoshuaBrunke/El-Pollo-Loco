const GROUND_LEVEL = 140;

class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  accelerationY = 0.5;
  energy = 100;
  lastHit = 0;

  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  applyGravity() {
    setInterval(() => this.applyGravityStep(), 1000 / 25);
  }

  applyGravityStep() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    } else if (this.isNearGround()) {
      this.speedY = 0;
      this.y = GROUND_LEVEL;
    }
  }

  isNearGround() {
    return this.y > GROUND_LEVEL - 5 && this.y <= GROUND_LEVEL + 5;
  }

  isAboveGround() {
    return this instanceof ThrowableObject || this.y < GROUND_LEVEL;
  }

  isColliding(mo) {
    return (
      this.rightEdge() > mo.leftEdge() &&
      this.leftEdge() < mo.rightEdge() &&
      this.bottomEdge() > mo.topEdge() &&
      this.topEdge() < mo.bottomEdge()
    );
  }

  rightEdge() {
    return this.x + this.width - this.offset.right;
  }

  leftEdge() {
    return this.x + this.offset.left;
  }

  bottomEdge() {
    return this.y + this.height - this.offset.bottom;
  }

  topEdge() {
    return this.y + this.offset.top;
  }

  playAnimation(images) {
    if (!images.length) return;
    let i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  canBeHit() {
    const now = Date.now();
    return now - this.lastHit > 1000;
  }

  hit(damage = 5) {
    if (!this.canBeHit()) return;
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
    this.lastHit = Date.now();
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    return Date.now() - this.lastHit < 1000;
  }
}
