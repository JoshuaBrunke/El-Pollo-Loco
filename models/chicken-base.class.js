/**
 * @class ChickenBase
 * Represents a base class for chicken enemies in the game. These are the basic enemies that can be jumped on.
 * Handles shared movement, animation, and death logic.
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
   * Starts the animation and movement loops for the chicken.
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
   * Kills the chicken and swaps its image to the dead sprite.
   */
  die() {
    this.isDead = true;
    this.speed = 0;
    this.img = this.imageCache[this.IMAGE_DEAD];
  }
}
