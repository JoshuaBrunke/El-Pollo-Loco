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
    "./assets/img/2_character_pepe/2_walk/W-26.png",
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
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  world;
  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.offset = {
      top: 150,
      bottom: 15,
      left: 20,
      right: 30,
    };

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
      if (!this.world) return; // ✔ make sure world is available

      // Jumping input
      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump(30); // Jump height
      }

      // Movement
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      // Camera movement
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Animation switching (jump, walk, idle)
    setInterval(() => {
      if (!this.world) return; // 💡 also a safe guard for animation

      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.img = this.imageCache["./assets/img/2_character_pepe/2_walk/W-21.png"];
      }
    }, 50);
  }
}
