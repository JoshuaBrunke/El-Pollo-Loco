/**
 * @class ChickenBase
 * Represents a base class for chicken enemies in the game. These are the basic enemies that can be jumped on.
 * It handles the animation, movement, and death of the chicken.
 */
class ChickenBase extends MovableObject {
  IMAGES_WALKING = [];
  IMAGE_DEAD = "";
  damage = 0;
  isDead = false;
  y = 360;
  width = 70;
  height = 70;
  offset = {
    top: 5,
    bottom: 8,
    left: 0,
    right: 0,
  };

  /**
   * Creates a new ChickenBase object.
   */
  constructor() {
    super();
  }

  /**
   * Loads the images for the chicken's walking animation and the dead image.
   * The images are loaded into the image cache for later use.
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /**
   * Handles the chicken's death sequence.
   */
  die() {
    this.isDead = true;
    this.speed = 0;
    this.img = this.imageCache[this.IMAGE_DEAD];
  }
}
