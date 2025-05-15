/**
 * @class Bottle
 * Class for the collectable bottle object in the game.
 * Bottles appear on the ground and can be collected to be thrown later.
 * A random image and matching hitbox offset are applied on creation.
 */
class Bottle extends MovableObject {
  /**
   * Creates a new Bottle object at the given position.
   * Chooses a random ground bottle image and sets its matching hitbox offsets.
   *
   * @param {number} x - The horizontal position of the bottle.
   * @param {number} y - The vertical position of the bottle.
   */
  constructor(x, y) {
    super();
    const image1 = "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
    const image2 = "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png";

    const bottleImage = Math.random() < 0.5 ? image1 : image2;
    this.loadImage(bottleImage);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;

    if (bottleImage === image1) {
      this.offset = { top: 10, bottom: 8, left: 21, right: 11 };
    } else {
      this.offset = { top: 10, bottom: 8, left: 15, right: 15 };
    }
  }
}
