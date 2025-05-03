class Chicken extends MovableObject {
  y = 360;
  width = 70;
  height = 70;

  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]); // Load the first image
    this.loadImages(this.IMAGES_WALKING);
    this.offset = {
      top: 5,
      bottom: 8,
      left: 0,
      right: 0,
    };
    this.x = 200 + Math.random() * 500; // Random x position between 200 and 700
    this.speed = 0.15 + Math.random() * 0.25; // Random speed between 0.15 and 0.4
    this.animate();
  }

  /**
   * Method to animate the chicken
   * @description This method is called in a loop to create an animation effect.
   * It changes the image of the chicken.
   */

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); // Move left at 60 FPS
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Play the walking animation
    }, 1000 / 10); // 1000ms / 10 = 100ms per frame
  }
}
