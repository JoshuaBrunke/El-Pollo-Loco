class Endboss extends MovableObject {
    y = 55;
    width = 250;
    height = 400;
  
    IMAGES_ALERT = [
      "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
  
    IMAGES_ATTACK = [
      "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
  
    IMAGES_WALKING = [
      "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
  
    damage = 20; // Most powerful enemy
  
    constructor() {
      super().loadImage(this.IMAGES_ALERT[0]);
      this.loadImages(this.IMAGES_ALERT);
      this.offset = {
        top: 63,
        bottom: 13,
        left: 8,
        right: 5,
      };
      this.x = 2500;
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
      }, 150);
    }
  }
  