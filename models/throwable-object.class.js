const IMAGE_PLAIN = "./assets/img/6_salsa_bottle/salsa_bottle.png";

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

  constructor(x, y, direction = 1) {
    super();
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImage(this.IMAGES_ROTATION[0]);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.throw();
  }

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

  clearIntervals() {
    clearInterval(this.flyInterval);
    clearInterval(this.spinInterval);
  }
}
