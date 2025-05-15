/**
 * Class for the cloud object in the game.
 * Clouds are background elements that move horizontally across the screen.
 */
class Cloud extends MovableObject {
  y = 40;
  width = 500;
  height = 300;

  /**
   * Creates a new Cloud object.
   * Loads a cloud image and sets a random starting position.
   */
  constructor() {
    super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
    this.x = this.randomStartX();
    this.animate();
  }

  /**
   * Generates a random horizontal starting position for the cloud.
   * @returns {number} A random X coordinate between 10 and 510.
   */
  randomStartX() {
    return 10 + Math.random() * 500;
  }

  /**
   * Starts the animation loop to move the cloud leftward.
   */
  animate() {
    setInterval(() => this.moveLeft(), 100);
  }
}
