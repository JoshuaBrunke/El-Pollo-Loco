/**
 * @class StatusBar
 * The base class for all status bars.
 * Represents percentages in visual form via images of bars that change based on the percentage.
 */
class StatusBar extends DrawableObject {
  IMAGES = [];
  percentage = 100;

  /**
   * Creates a new status bar.
   * 
   * @param {number} [x=15] - X position on the canvas.
   * @param {number} [y=15] - Y position on the canvas.
   * @param {number} [width=200] - Width of the bar.
   * @param {number} [height=50] - Height of the bar.
   * @param {number} [initialPercentage=100] - Starting percentage (0–100).
   */
  constructor(x = 15, y = 15, width = 200, height = 50, initialPercentage = 100) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.percentage = initialPercentage;
  }

  /**
   * Sets the percentage and updates the image accordingly.
   * 
   * @param {number} percentage - New percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Resolves which image to show based on the current percentage.
   * 
   * @returns {number} - The index in the `IMAGES` array to use.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }

  /**
   * Loads status bar images and sets the initial image.
   * 
   * @param {string[]} images - Array of image paths representing percentage states (0–100).
   */
  loadImages(images) {
    this.IMAGES = images;
    super.loadImages(images);
    this.setPercentage(this.percentage); 
  }
}
