class ChickenBase extends MovableObject {
  y = 360;
  width = 70;
  height = 70;
  offset = {
    top: 5,
    bottom: 8,
    left: 0,
    right: 0,
  };

  constructor() {
    super();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); // Movement interval

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Walking animation
    }, 100); // Frame rate: 10 fps
  }
}
