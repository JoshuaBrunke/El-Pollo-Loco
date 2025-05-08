class MutantChicken extends ChickenBase {
    constructor() {
      const images = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ];
      const deadImage = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  
      super(images, deadImage);
      this.setImages(images);
      this.x = 1200 + Math.random() * 800;
      this.speed = 0.25 + Math.random() * 0.3;
      this.energy = 10;
    }
  }
  