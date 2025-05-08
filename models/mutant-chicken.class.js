class MutantChicken extends ChickenBase {
    IMAGES_WALKING = [
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  
    constructor() {
      super();
      this.loadImages(this.IMAGES_WALKING);
      this.x = 1200 + Math.random() * 800; // Spawns farther right
      this.speed = 0.25 + Math.random() * 0.3;
      this.width = 70;
      this.height = 70;
      this.energy = 10; // Higher energy (or later: harder to kill or hits harder)
    }
  }
  