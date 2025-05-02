class MovableObject {
  x = 120;
  y = 290;
  img;
  width = 50;
  height = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; // Gravity acceleration
  accelerationY = 0.5; // Jump acceleration

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
        this.y = 140; // Reset to ground level
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 140;
  }

  /**
   * Loads an image into the img property.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -this.width) {
        this.x = 720;
      }
    }, 1000 / 60);
  }
}
