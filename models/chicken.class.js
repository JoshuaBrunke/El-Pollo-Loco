/**
 * @class Chicken 
 * Represents a chicken enemy in the game.
 * This is the slowest and weakest enemy type.
 */
class Chicken extends ChickenBase {
  /**
   * Initialises a new Chicken object.
   * The chicken starts at a random x position and has a random speed.
   */
  constructor() {
    super();
    this.x = 700 + Math.random() * 1200;
    this.speed = 0.15 + Math.random() * 0.25;
    this.damage = 5;

    this.IMAGES_WALKING = [
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    this.IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGES_WALKING[0]);
    const img = new Image();
    img.src = this.IMAGE_DEAD;
    this.imageCache[this.IMAGE_DEAD] = img;
    this.animate();
  }
}
