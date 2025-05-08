const GROUND_LEVEL = 140;
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; // Gravity acceleration
  accelerationY = 0.5; // Jump acceleration
  energy = 100; // Starting health points
  lastHit = 0; // timestamp of last hit in milliseconds



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
      } else if (!this.isAboveGround()) {
        this.speedY = 0;
        this.y = GROUND_LEVEL; // Reset to ground level
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this instanceof ThrowableObject || this.y < GROUND_LEVEL;
  }
  



  /**
   * //Checks for collision between two objects using their offset hitboxes for more precise detection.
   * Optionally logs debug info if DEBUG_MODE_COLLISION is enabled.
   *
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if the objects' offset hitboxes overlap, false otherwise.
   */

  isColliding(mo) {
    const colliding =
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

    if (DEBUG_MODE && DEBUG_MODE_COLLISION) {
      console.log(
        `[Collision Check] ${this.constructor.name} vs ${mo.constructor.name} → ${colliding ? "✅ Colliding" : "❌ Not Colliding"}`
      );
    }

    return colliding;
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
    this.speedY = 30; // Set the speedY to a positive value to make the object jump
  }

  canBeHit() {
    const now = new Date().getTime();
    return now - this.lastHit > 1000; // 1 second cooldown
  }

  hit() {
    if (!this.canBeHit()) return;

    this.energy -= 5;
    if (this.energy < 0) this.energy = 0;

    this.lastHit = new Date().getTime();
    this.isCurrentlyHurt = true;

    // Clear the hurt flag after 500ms
    setTimeout(() => {
      this.isCurrentlyHurt = false;
    }, 500);
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    const timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000; // Hurt animation plays for 1 second
  }
}
