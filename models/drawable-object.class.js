class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 290;
  width = 50;
  height = 150;

  /**
   * Loads an image into the img property.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
  }

  drawFrame(ctx) {
    if (!DEBUG_MODE || !DEBUG_MODE_HITBOXES || !(this instanceof Character || this instanceof Endboss || this instanceof ChickenBase)) {
      return;
    }

    // 🔵 Draws the full image boundary box
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke();

    // 🔴 Draws the offset collision box
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

  /**
   *
   * @param {Array} arr - ["img/img1.png", "img/img2.png", "img/img3.png", ...]
   * @description Loads multiple images into the imageCache array.
   */

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
