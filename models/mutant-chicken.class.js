class MutantChicken extends ChickenBase {
    y = 340;
    width = 90;
    height = 90;
  
    offset = {
      top: 13,
      bottom: 10,
      left: 9,
      right: 9,
    };
  
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
        imageDead: IMAGE_DEAD,
        damage: 10, 
      });
      this.animate();
    }
  }
  