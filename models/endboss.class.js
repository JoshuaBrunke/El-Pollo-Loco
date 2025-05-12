class Endboss extends MovableObject {
  y = 55;
  width = 250;
  height = 400;
  energy = 100;
  isDead = false;
  isHurt = false;
  isCurrentlyHurt = false;
  isAttacking = false;
  isChasing = false;
  speed = 5.5;
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

    this.offset = { top: 63, bottom: 13, left: 8, right: 5 };
    this.x = 2500;

    this.startAnimationLoop();
    this.startAttackLoop();
  }

  startAnimationLoop() {
    this.animationInterval = setInterval(() => {
      if (this.isCurrentlyDead) {
        if (this.currentImage < this.IMAGES_DEAD.length) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
        return;
      }

      if (this.isDead || this.isAttacking) return;

      if (this.isHurt) {
        if (!this.isCurrentlyHurt) {
          this.isCurrentlyHurt = true;
          this.currentImage = 0;
        }
        if (this.currentImage < this.IMAGES_HURT.length) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.img = this.imageCache[this.IMAGES_HURT[this.IMAGES_HURT.length - 1]];
          this.isHurt = false;
          this.isCurrentlyHurt = false;
        }
        return; // Exit after hurt logic
      } else if (!this.isChasing && world.character.x > 2200) {
        this.isChasing = true;
      }

      if (this.isChasing) {
        this.walkTowardPepe();
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 150);
  }

  startAttackLoop() {
    setInterval(() => {
      if (this.isChasing && !this.isDead && !this.isHurt && !this.isAttacking) {
        this.lungeAttack();
      }
    }, 1000); // Every second
  }

  walkTowardPepe() {
    if (this.x > world.character.x + 50) {
      this.x -= this.speed;
    }
  }

  lungeAttack() {
    this.isAttacking = true;
    const lungeDistance = 80;
    const lungeSpeed = 10;
    const steps = lungeDistance / lungeSpeed;
    let currentStep = 0;

    this.playOneTimeAnimation(this.IMAGES_ATTACK, () => {
      this.isAttacking = false;
    });

    const lungeInterval = setInterval(() => {
      this.x -= lungeSpeed;
      currentStep++;

      if (this.world?.character && this.isColliding(this.world.character)) {
        this.world.character.hit(this.damage);
        this.world.healthBar.setPercentage(this.world.character.energy);
      }

      if (currentStep >= steps || this.isDead) {
        clearInterval(lungeInterval);
      }
    }, 50);
  }

  playOneTimeAnimation(images, onFinish = () => {}) {
    let i = 0;
    const frameInterval = setInterval(() => {
      if (i < images.length) {
        this.img = this.imageCache[images[i]];
        i++;
      } else {
        clearInterval(frameInterval);
        onFinish();

        // Stay on last frame if dead
        if (this.isDead) {
          this.img = this.imageCache[images[images.length - 1]];
        }
      }
    }, 100);
  }

  hitByBottle() {
    if (this.isDead) return;

    this.energy -= 10;
    this.isHurt = true;

    if (world?.bossBar) {
      world.bossBar.setPercentage(this.energy);
    }

    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      this.playDeath(); // 👉 play death animation
    }
  }

  playDeath() {
    this.isCurrentlyDead = true;
    this.currentImage = 0; // Start at the first death frame
  }
}
