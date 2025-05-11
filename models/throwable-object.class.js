const IMAGE_PLAIN = "./assets/img/6_salsa_bottle/salsa_bottle.png";

class ThrowableObject extends MovableObject {
  IMAGES_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, direction = 1) {
    super();
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImage(this.IMAGES_ROTATION[0]);

    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.direction = direction;
    this.isSplashing = false;

    this.throw();
  }

  throw() {
    this.speedX = 20 * this.direction;
    this.speedY = 20;
    this.applyGravity();

    this.moveInterval = setInterval(() => {
      this.x += this.speedX;

    }, 25);

    this.rotateInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }

  splash() {
    this.isSplashing = true;
    clearInterval(this.moveInterval);
    clearInterval(this.rotateInterval);

    let splashIndex = 0;
    const splashInterval = setInterval(() => {
      if (splashIndex < this.IMAGES_SPLASH.length) {
        this.img = this.imageCache[this.IMAGES_SPLASH[splashIndex]];
        splashIndex++;
      } else {
        clearInterval(splashInterval);
        world.throwableObjects = world.throwableObjects.filter(obj => obj !== this);
      }
    }, 50);
  }
}
