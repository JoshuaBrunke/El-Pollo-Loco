/**
 * @class BackgroundObject
 * Class for background scenery in the level (e.g. layers of sky, terrain).
 * These objects scroll with the camera and provide visual depth.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a background object with a specific horiontal position.
   * Vertically aligns the image to the bottom of the canvas.
   * 
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - The x-position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
