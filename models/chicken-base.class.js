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
  isDead = false; 

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
setDefaults({ x, speed, imageDead, damage = 0 }) {
  this.x = x;
  this.speed = speed;
  this.IMAGE_DEAD = imageDead;
  this.damage = damage;

  // 🧼 Ensure the death image is also preloaded
  const img = new Image();
  img.src = imageDead;
  this.imageCache[imageDead] = img;
}


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


  die() {
    this.isDead = true;
    this.speed = 0;
    this.img = this.imageCache[this.IMAGE_DEAD];
  }
}
