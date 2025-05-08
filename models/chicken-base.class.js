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

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60); // Movement loop
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 100); // Frame animation loop
  }

  setImages(IMAGES_WALKING) {
    this.IMAGES_WALKING = IMAGES_WALKING;
    this.loadImage(IMAGES_WALKING[0]); // Set initial image
    this.loadImages(IMAGES_WALKING); // Preload all images
  }

  setDefaults({ x, speed, energy = 5, imageDead }) {
    this.x = x;
    this.speed = speed;
    this.energy = energy;
    this.IMAGE_DEAD = imageDead;
  }
}
