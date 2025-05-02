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
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
    this.ctx.save();
  
    if (movableObject.otherDirection) {
      this.ctx.translate(movableObject.x + movableObject.width, movableObject.y);
      this.ctx.scale(-1, 1);
      movableObject.draw(this.ctx);
      movableObject.drawFrame(this.ctx);
    } else {
      this.ctx.translate(movableObject.x, movableObject.y);
      movableObject.draw(this.ctx);
      movableObject.drawFrame(this.ctx);
    }
  
    this.ctx.restore();
  }
  

  flipImage(movableObject) {
    this.ctx.save(); // Save the current state of the canvas
    this.ctx.translate(movableObject.width, 0); // Move the canvas to the right by the width of the object
    this.ctx.scale(-1, 1); // Flip the canvas horizontally
    movableObject.draw(movableObject.ctx); // Draw the object on the flipped canvas
    movableObject.x = movableObject.x * -1; // Flip the x position to the left
  }

flipImageBack(movableObject) {
  movableObject.x = movableObject.x * -1; // Flip the x position back to normal
  this.ctx.restore(); // Restore the original state of the canvas
}


  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(); // Call the hit method of the character class
      }
    });
  }


}
