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
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (!this.isAboveGround()) {
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

  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof Chicken) {
    }
    {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(0, 0, this.width, this.height);
      ctx.stroke();
    }
  }
  //character.isColliding(chicken); - Example of how to use this function
  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} - True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return this.x + this.width > mo.x && 
    this.x < mo.x + mo.width && 
    this.y + this.height > mo.y && 
    this.y < mo.y + mo.height;
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
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30; // Set the speedY to a positive value to make the object jump
  }
}
