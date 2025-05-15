const GROUND_LEVEL = 140;

/**
 * @class MovableObject
 * Base class for all movable game objects.
 * Inherits from DrawableObject and adds physics, collision detection, and health logic.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  accelerationY = 0.5;
  energy = 100;
  lastHit = 0;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  /**
   * Applies gravity to the object using a recurring interval.
   */
  applyGravity() {
    setInterval(() => this.applyGravityStep(), 1000 / 25);
  }

  /**
   * Executes one step of gravity, modifying y position and speedY.
   */
  applyGravityStep() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    } else if (this.isNearGround()) {
      this.speedY = 0;
      this.y = GROUND_LEVEL;
    }
  }

  /**
   * Checks if the object is close to the ground.
   * @returns {boolean} True if near ground level.
   */
  isNearGround() {
    return this.y > GROUND_LEVEL - 5 && this.y <= GROUND_LEVEL + 5;
  }

  /**
   * Checks if the object is above ground level.
   * @returns {boolean} True if above ground level.
   */
  isAboveGround() {
    return this instanceof ThrowableObject || this.y < GROUND_LEVEL;
  }

  /**
   * Checks collision with another movable object.
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if this object collides with `mo`.
   */
  isColliding(mo) {
    return (
      this.rightEdge() > mo.leftEdge() &&
      this.leftEdge() < mo.rightEdge() &&
      this.bottomEdge() > mo.topEdge() &&
      this.topEdge() < mo.bottomEdge()
    );
  }

  /**
   * Gets the object's right edge for collision.
   * @returns {number} X coordinate of the right edge.
   */
  rightEdge() {
    return this.x + this.width - this.offset.right;
  }

  /**
   * Gets the object's left edge for collision.
   * @returns {number} X coordinate of the left edge.
   */
  leftEdge() {
    return this.x + this.offset.left;
  }

  /**
   * Gets the object's bottom edge for collision.
   * @returns {number} Y coordinate of the bottom edge.
   */
  bottomEdge() {
    return this.y + this.height - this.offset.bottom;
  }

  /**
   * Gets the object's top edge for collision.
   * @returns {number} Y coordinate of the top edge.
   */
  topEdge() {
    return this.y + this.offset.top;
  }

  /**
   * Plays a looping animation using the provided image array.
   * @param {string[]} images - Array of image paths for animation frames.
   */
  playAnimation(images) {
    if (!images.length) return;
    const i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting an upward velocity.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the object is currently able to be hit.
   * @returns {boolean} True if enough time has passed since the last hit.
   */
  canBeHit() {
    const now = Date.now();
    return now - this.lastHit > 1000;
  }

  /**
   * Applies damage to the object and marks the hit time.
   * @param {number} [damage=5] - The amount of damage to apply.
   */
  hit(damage = 5) {
    if (!this.canBeHit()) return;
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
    this.lastHit = Date.now();
  }

  /**
   * Checks if the object has 0 or less energy.
   * @returns {boolean} True if energy is 0 or below.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if hit within the last second.
   */
  isHurt() {
    return Date.now() - this.lastHit < 1000;
  }
}
