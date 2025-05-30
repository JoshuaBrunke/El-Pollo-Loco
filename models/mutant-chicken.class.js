/**
 * @class MutantChicken
 * Represents a mutant chicken enemy in the game.
 * This is a stronger and faster but still basic enemy type.
 */
class MutantChicken extends ChickenBase {
  /**
   * Initialises a new MutantChicken object.
   * The mutant chicken starts at a random x position and has a random speed.
   */
  constructor() {
    super();
    this.y = 340;
    this.width = 90;
    this.height = 90;
    this.offset = {
      top: 13,
      bottom: 10,
      left: 9,
      right: 9,
    };
    this.x = 1200 + Math.random() * 800;
    this.speed = 0.75 + Math.random() * 0.3;
    this.damage = 10;

    this.IMAGES_WALKING = [
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    this.IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGES_WALKING[0]);
    const img = new Image();
    img.src = this.IMAGE_DEAD;
    this.imageCache[this.IMAGE_DEAD] = img;
    this.animate();
  }
}
