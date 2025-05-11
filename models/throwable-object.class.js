const IMAGE_PLAIN = "./assets/img/6_salsa_bottle/salsa_bottle.png";

class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, direction = 1) {
    super();
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImage(this.IMAGES_ROTATION[0]);

    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.direction = direction;

    this.throw();
  }

  throw() {
    this.speedX = 14 * this.direction;
    this.speedY = 20;
    this.applyGravity();

    this.moveInterval = setInterval(() => {
      this.x += this.speedX;
    }, 40);

    this.rotateInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 100);
  }
}
