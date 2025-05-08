class Chicken extends ChickenBase {
    IMAGES_WALKING = [
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
  
    IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  
    constructor() {
      super();
      this.loadImages(this.IMAGES_WALKING);
      this.x = 200 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.25;
    }
  }
  