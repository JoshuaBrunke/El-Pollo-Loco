class Chicken extends ChickenBase {
    constructor() {
      const images = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      ];
      const deadImage = "./assets/img/3_enemies_chicken/chicken_normal/5_dead/1_d.png";
  
      super(images, deadImage);
      this.setImages(images);
      this.x = 200 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.25;
    }
  }
  