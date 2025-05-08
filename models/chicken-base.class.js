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

  constructor(imagesWalking, imageDead) {
    super().loadImage(imagesWalking[0]);
    this.loadImages(imagesWalking);
    this.IMAGE_DEAD = imageDead;
    this.animate();
  }

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 100);
  }

  setImages(images) {
    this.IMAGES_WALKING = images;
  }
}
