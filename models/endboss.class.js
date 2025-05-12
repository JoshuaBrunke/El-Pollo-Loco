class Endboss extends MovableObject {
  y = 55;
  width = 250;
  height = 400;
  energy = 100;
  isDead = false;
  isHurt = false;
  isAttacking = false;
  isChasing = false;
  speed = 7.5;
  damage = 20;

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

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.offset = { top: 63, bottom: 13, left: 10, right: 7 };
    this.x = 2500;

    this.animate();
    this.startAttackLoop();
  }

  animate() {
    setInterval(() => {
      if (!world) return;

      if (this.isDead) {
        if (this.currentImage < this.IMAGES_DEAD.length) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
        return;
      }

      if (this.isHurt) {
        this.playAnimation(this.IMAGES_HURT);
        return;
      }

      if (this.isAttacking) return;

      if (!this.isChasing && world.character.x > 1900) {
        this.isChasing = true;
      }

      if (this.isChasing) {
        this.approach();
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 100);
  }

  approach() {
    if (this.x > world.character.x + 50) {
      this.x -= this.speed;
    }
  }

  hitByBottle() {
    if (this.isDead) return;

    this.energy -= 20;
    this.isHurt = true;
    this.currentImage = 0; // restart hurt animation

    if (world?.bossBar) {
      world.bossBar.setPercentage(this.energy);
    }

    setTimeout(() => this.isHurt = false, 500); // short hurt delay

    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      this.currentImage = 0; // reset for death animation
    }
  }

  startAttackLoop() {
    setInterval(() => {
      if (this.isChasing && !this.isDead && !this.isHurt && !this.isAttacking) {
        this.lungeAttack();
      }
    }, 1000);
  }

  lungeAttack() {
    this.isAttacking = true;
    const distance = 80;
    const speed = 10;
    const steps = distance / speed;
    let currentStep = 0;

    this.playAnimation(this.IMAGES_ATTACK);

    const lunge = setInterval(() => {
      this.x -= speed;
      currentStep++;

      if (this.world?.character && this.isColliding(this.world.character)) {
        this.world.character.hit(this.damage);
        this.world.healthBar.setPercentage(this.world.character.energy);
      }

      if (currentStep >= steps || this.isDead) {
        clearInterval(lunge);
        this.isAttacking = false;
        this.currentImage = 0;
      }
    }, 50);
  }
}