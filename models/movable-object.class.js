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
  energy = 100; // Starting health points
  lastHit = 0; // timestamp of last hit in milliseconds

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

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
    if (!DEBUG_MODE || !DEBUG_MODE_HITBOXES || !(this instanceof Character || this instanceof Endboss || this instanceof Chicken)) {
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
   * //Checks for collision between two objects using their offset hitboxes for more precise detection.
   * Optionally logs debug info if DEBUG_MODE_COLLISION is enabled.
   *
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if the objects' offset hitboxes overlap, false otherwise.
   */

  isColliding(mo) {
    const colliding =
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

    if (DEBUG_MODE && DEBUG_MODE_COLLISION) {
      console.log(
        `[Collision Check] ${this.constructor.name} vs ${mo.constructor.name} → ${colliding ? "✅ Colliding" : "❌ Not Colliding"}`
      );
    }

    return colliding;
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

  canBeHit() {
    const now = new Date().getTime();
    return now - this.lastHit > 1000; // 1 second cooldown
  }

  hit() {
    if (this.canBeHit()) {
      this.energy -= 2;
      if (this.energy < 0) {
        this.energy = 0; // Prevents negative energy
      }
      this.lastHit = new Date().getTime();
    }
  }
}
