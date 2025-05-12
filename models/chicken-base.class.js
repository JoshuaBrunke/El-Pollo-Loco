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

  constructor() {
    super();
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
