class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];

  clouds = [new Cloud()];

  backgroundObjects = [

    new BackgroundObject("./assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 719*2),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719*2),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719*2),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719*2),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 719*3),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719*3),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719*3),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719*3),
  ];

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
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
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
    if (movableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(movableObject.width, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(movableObject.img, -movableObject.x, movableObject.y, movableObject.width, movableObject.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
  }
}
