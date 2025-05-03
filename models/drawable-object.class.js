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
