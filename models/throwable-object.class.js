class ThrowableObject extends MovableObject {

IMAGE_PLAIN = "./assets/img/6_salsa_bottle/salsa_bottle.png";

IMAGES_GROUND = [
  "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
];

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

  constructor(x, y) {
    super().loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_GROUND);
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImage(this.IMAGE_PLAIN);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.throw();

  }

  throw() {
    this.speedX = 20;       // Horizontal speed
    this.speedY = 20;       // Initial upward impulse
    this.applyGravity();    // Let gravity handle the falling
  
    setInterval(() => {
      this.x += this.speedX;  // Move horizontally only
    }, 25);
  }
  
}