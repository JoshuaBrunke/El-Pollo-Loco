class Character extends MovableObject {
  y = 80;
  width = 100;
  height = 300;
  speed = 10;

  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png"
  ];

   IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png"
   ]

  world;
  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity(); // Apply gravity to the character
    this.animate();

  }

  /**
   * Method to animate the character
   * @description This method is called in a loop to create an animation effect.
   * It changes the image of the character.
   */
  animate() {
    setInterval(() => {
        if (!this.world) return; // Check if world is defined
      // Moves the character left or right based on keyboard input
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100; // Moves the camera to the left by the character's x position
    }, 1000 / 60);

    setInterval(() => {

    //Jump animation
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        //Idle animation
        this.img = this.imageCache["./assets/img/2_character_pepe/2_walk/W-21.png"];
      }
    }, 50);
  }
  /**
   * Method to make the character jump
   * @param {number} y - The height to jump to
   */

  jump() {}
}
