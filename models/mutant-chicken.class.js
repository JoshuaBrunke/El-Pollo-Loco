class MutantChicken extends ChickenBase {
    constructor() {
      super();
      const IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ];
      const IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  
      this.setImages(IMAGES_WALKING);
      this.setDefaults({
        x: 1200 + Math.random() * 800,
        speed: 0.25 + Math.random() * 0.3,
        energy: 10,
        imageDead: IMAGE_DEAD,
      });
      this.animate();
    }
  }
  