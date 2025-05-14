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
   * Draws the current image to the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
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
   * Determines whether this object type should show debug frames.
   */
  shouldShowDebugFrame() {
    return (
      this instanceof Character || this instanceof Endboss || this instanceof ChickenBase || this instanceof Bottle || this instanceof Coin
    );
  }

  drawImageBorders(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke();
  }

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
