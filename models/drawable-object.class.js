/**
 * @class DrawableObject
 * DrawableObject class that handles image loading and drawing on a canvas.
 * It also manages the drawing of debug frames for certain object types.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 290;
  width = 50;
  height = 150;

  /**
   * Loads a single image into the img property.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - List of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth > 0) {
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    }
  }

  /**
   * Draws debug frames (bounding box and hitbox) if DEBUG_MODE is enabled.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawFrame(ctx) {
    if (!DEBUG_MODE || !this.shouldShowDebugFrame()) return;
    this.drawImageBorders(ctx);
    this.drawOffsetBorders(ctx);
  }

  /**
   * Determines whether a specific object type should show debug frames.
   *  * @returns {boolean} True if debug frames should be shown.
   */
  shouldShowDebugFrame() {
    return (
      this instanceof Character || this instanceof Endboss || this instanceof ChickenBase || this instanceof Bottle || this instanceof Coin
    );
  }

  /**
   * Draws the image borders for debugging.
   *
   * @param {CanvasRenderingContext2Ding} ctx
   */
  drawImageBorders(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Draws the offset borders for debugging.
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawOffsetBorders(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.rect(
      this.offset.left,
      this.offset.top,
      this.width - this.offset.left - this.offset.right,
      this.height - this.offset.top - this.offset.bottom
    );
    ctx.stroke();
  }
}
