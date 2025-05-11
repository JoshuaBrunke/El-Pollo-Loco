class Endboss extends MovableObject {
  y = 55;
  width = 250;
  height = 400;
  energy = 100;
  isDead = false;
  isHurt = false;
  currentAnimationInterval;

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

  IMAGES_HURT = [
    "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

 damage = 20;

  speed = 1.5; // 🐔 Boss walks steadily, but not too fast
  isChasing = false; // 🆕 Track whether boss should start walking

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.offset = { top: 63, bottom: 13, left: 8, right: 5 };
    this.x = 2500;

    this.animate();

    this.attackInterval = setInterval(() => this.maybeAttackPepe(), 2000);

  }

  animate() {
    this.currentAnimationInterval = setInterval(() => {
      if (this.isDead) {
        this.playOneTimeAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt) {
        this.playOneTimeAnimation(this.IMAGES_HURT, () => {
          this.isHurt = false;
        });
      } else {
        // 👀 Check if Pepe is close enough to trigger boss walk
        if (!this.isChasing && world.character.x > 2200) {
          this.isChasing = true;
        }

        if (this.isChasing) {
          this.walkTowardPepe();
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.playAnimation(this.IMAGES_ALERT);
        }
      }
    }, 150);
  }

  walkTowardPepe() {
    if (this.x > world.character.x + 50) {
      this.x -= this.speed;
    }
  }

  playOneTimeAnimation(images, onFinish = () => {}) {
    clearInterval(this.currentAnimationInterval);
    let i = 0;
    this.currentAnimationInterval = setInterval(() => {
      if (i < images.length) {
        this.img = this.imageCache[images[i]];
        i++;
      } else {
        clearInterval(this.currentAnimationInterval);
        onFinish();
        if (!this.isDead) this.animate();
      }
    }, 100);
  }

hitByBottle() {
  if (this.isDead) return;

  this.energy -= 10;
  this.isHurt = true;

  // ✅ Update boss health bar
  if (world?.bossBar) {
    world.bossBar.setPercentage(this.energy);
  }

  if (this.energy <= 0) {
    this.energy = 0;
    this.isDead = true;
  }
}

maybeAttackPepe() {
  if (!this.isChasing || this.isDead || this.isHurt) return;

  // 30% chance to attack
  const shouldAttack = Math.random() < 0.3;
  if (shouldAttack) {
    this.playOneTimeAnimation(this.IMAGES_ATTACK);
  }
}

}