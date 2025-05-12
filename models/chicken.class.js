class Chicken extends ChickenBase {
  constructor() {
    super();
    const IMAGES_WALKING = [
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    const IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    this.setImages(IMAGES_WALKING);
    this.setDefaults({
      x: 700 + Math.random() * 1200, // 🆕 Start farther right to give Pepe some breathing room
      speed: 0.15 + Math.random() * 0.25,
      imageDead: IMAGE_DEAD,
      damage: 10,
    });
    this.animate();
  }
}
