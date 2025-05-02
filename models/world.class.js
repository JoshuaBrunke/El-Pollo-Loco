class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0; // The camera_x variable is used to move the camera to the left by the character's x position

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  /**
 * Draws the game world frame by frame.
 * Clears the canvas, translates camera, draws all objects, and loops.
 */
  draw() {
    //Clears the canvas before drawing
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Moves the canvas to the left by camera_x pixels

    //Draws the background objects, clouds, enemies and character on the canvas
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0); //

    //Draw is called in a loop to create an animation effect
    requestAnimationFrame(() => {
      this.draw(); // Call the draw method again for the next frame
    });
    
  }

  /**
 * Adds an array of movable objects to the canvas.
 * @param {MovableObject[]} objects - The objects to draw on the canvas.
 */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
 * Adds a single movable object to the canvas, flipped if needed.
 * @param {MovableObject} mo - The object to add to the map.
 */
  addToMap(mo) {
    this.ctx.save();

    if (mo.otherDirection) {
      this.flipContextAndDraw(mo);
    } else {
      this.drawNormally(mo);
    }
    this.ctx.restore();
  }

  /**
 * Flips and draws a movable object to face left.
 * @param {MovableObject} mo - The object to draw.
 */
  flipContextAndDraw(mo) {
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  drawNormally(mo) {
    this.ctx.translate(mo.x, mo.y);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  /**
 * Checks for collisions between the character and all enemies.
 */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(); // Call the hit method of the character class
      }
    });
  }
}
