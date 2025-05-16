const IMAGE_PLAIN = "./assets/img/6_salsa_bottle/salsa_bottle.png";

/**
 * @class ThrowableObject
 * Class representing a throwable object in the game.
 * This object can be thrown by the player character, spins in the air, and moves in the set direction.
 */
class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  width = 60;
  height = 60;
  hasHit = false;

  /**
   * Creates a new throwable bottle object at a specific position and direction.
   * Loads rotation images and begins the throw animation once the first image is ready.
   *
   * @param {number} x - The horizontal position where the bottle is created.
   * @param {number} y - The vertical position where the bottle is created.
   * @param {number} [direction=1] - Direction the bottle moves in: 1 (right) or -1 (left).
   */
  constructor(x, y, direction = 1) {
    super();
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.loadImages(this.IMAGES_ROTATION);
    this.preloadAndStart();
  }

  /**
   * Ensures the first image is loaded before starting the animation.
   */
  preloadAndStart() {
    const firstImage = new Image();
    firstImage.src = this.IMAGES_ROTATION[0];
    firstImage.onload = () => {
      this.img = firstImage;
      this.imageCache[this.IMAGES_ROTATION[0]] = firstImage;
      this.throw();
    };
    firstImage.onerror = () => {};
  }

  /**
   * Launches the bottle by giving it horizontal and vertical velocity.
   * Starts animation for movement and rotation.
   */
  throw() {
    this.speedX = 14 * this.direction;
    this.speedY = 20;
    this.applyGravity();

    this.flyInterval = setInterval(() => {
      this.x += this.speedX;
    }, 40);

    this.spinInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 100);
  }

  /**
   * Stops all motion and animation of the thrown bottle.
   * Used when a bottle hits something or leaves the screen.
   */
  clearIntervals() {
    clearInterval(this.flyInterval);
    clearInterval(this.spinInterval);
  }
}
