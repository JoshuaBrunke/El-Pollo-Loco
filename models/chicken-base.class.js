class ChickenBase extends MovableObject {
  y = 360;
  width = 70;
  height = 70;

  offset = {
    top: 5,
    bottom: 8,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [];
  IMAGE_DEAD = "";
  damage = 0;

  constructor() {
    super();
  }

  /**
   * Loads the walking animation image paths.
   * @param {Array} images - An array of image paths for the walking animation.
   */
  setImages(images) {
    this.IMAGES_WALKING = images;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGES_WALKING[0]); // Initial image
  }

  /**
   * Sets default attributes like position, speed, energy, and dead image.
   * @param {Object} options - Contains x, speed, energy, imageDead, damage.
   */
  setDefaults({ x, speed, energy = 5, imageDead, damage = 0 }) {
    this.x = x;
    this.speed = speed;
    this.energy = energy;
    this.IMAGE_DEAD = imageDead;
    this.damage = damage;
  }

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 100);
  }
}
