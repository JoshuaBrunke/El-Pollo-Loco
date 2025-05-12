const GROUND_LEVEL = 140;

class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  accelerationY = 0.5;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this.y > GROUND_LEVEL - 5 && this.y <= GROUND_LEVEL + 5) {
        this.speedY = 0;
        this.y = GROUND_LEVEL;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this instanceof ThrowableObject || this.y < GROUND_LEVEL;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
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
    const now = new Date().getTime();
    return now - this.lastHit > 1000;
  }

  hit(damage = 5) {
    if (!this.canBeHit()) return;
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
    this.lastHit = new Date().getTime();
    this.isCurrentlyHurt = true;
    setTimeout(() => {
      this.isCurrentlyHurt = false;
    }, 500);
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    const timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }
}
