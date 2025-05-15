/**
 * @class Endboss
 * Endboss class representing the final boss in the game.
 */
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
  hasPlayedAngrySound = false;

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

  /**
   * Initialises the Endboss.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadAllImages();
    this.offset = { top: 63, bottom: 13, left: 10, right: 7 };
    this.x = 2500;
    this.animate();
    this.startAttackLoop();
  }

  /**
   * Loads all images for the Endboss.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Animates the Endboss by cycling through its images based on its state.
   */
  animate() {
    setInterval(() => {
      if (!world) return;
      else if (this.isDead) {
        return this.playDeath();
      } else if (this.isHurt) {
        return this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
        return this.playAnimation(this.IMAGES_ATTACK);
      }
      this.activateChase();
      this.playAnimation(this.isChasing ? this.IMAGES_WALKING : this.IMAGES_ALERT);
    }, 100);
  }

  /**
   * Plays the death animation of the Endboss.
   */
  playDeath() {
    const frames = this.IMAGES_DEAD;
    if (this.currentImage < frames.length) {
      this.playAnimation(frames);
    } else {
      this.img = this.imageCache[frames[frames.length - 1]];
    }
  }

  /**
   * Activates the chase mode of the Endboss at the player character's approach.
   */
  activateChase() {
    if (!this.isChasing && world.character.x > 1900) {
      this.isChasing = true;

      if (!this.hasPlayedAngrySound) {
        playBossAngrySound();
        this.hasPlayedAngrySound = true;
      }
    }
    if (this.isChasing) {
      this.approach();
    }
  }

  /**
   * Moves the Endboss towards the player character.
   */
  approach() {
    if (this.x > world.character.x + 50) {
      this.x -= this.speed;
    }
  }

  /**
   * Handles the Endboss being hit by a bottle.
   */
  hitByBottle() {
    if (this.isDead) return;
    this.energy -= 20;
    this.isHurt = true;
    this.currentImage = 0;
    this.world?.bossBar?.setPercentage(this.energy);
    playBossAngrySound();
    setTimeout(() => (this.isHurt = false), 900);
    if (this.energy <= 0) this.die();
  }

  /**
   * Starts the attack loop for the Endboss.
   */
  startAttackLoop() {
    this.attackInterval = setInterval(() => {
      if (this.canLunge()) this.lungeAttack();
    }, 1000);
  }

  /**
   * Stops the attack loop for the Endboss.
   */
  stopAttackLoop() {
    clearInterval(this.attackInterval);
  }

  /**
   * Checks if the Endboss can perform a lunge attack.
   * 
   * @returns {boolean} - True if the Endboss can lunge, false otherwise.
   */
  canLunge() {
    return !this.world?.gameEnded && this.isChasing && !this.isDead && !this.isHurt && !this.isAttacking;
  }

  /**
   * Performs a lunge attack towards the player character.
   */
  lungeAttack() {
    this.isAttacking = true;
    playBossAttackSound();
    const distance = 80;
    const speed = 10;
    const steps = distance / speed;
    let currentStep = 0;
    const lunge = setInterval(() => {
      this.lungeForward(speed);
      this.tryLungeDamage();
      currentStep++;
      if (this.shouldStopLunge(currentStep, steps)) {
        clearInterval(lunge);
        this.endLunge();
      }
    }, 50);
  }

  /**
   * Propels the Endboss forward towards the player character during a lunge attack.
   * 
   * @param {*} speed 
   */
  lungeForward(speed) {
    this.x -= speed;
  }

  /**
   * Checks if the Endboss is colliding with the player character during a lunge attack.
   * If so, applies damage to the character.
   */
  tryLungeDamage() {
    const character = this.world?.character;
    if (character && this.isColliding(character)) {
      character.hit(this.damage);
      this.world.healthBar.setPercentage(character.energy);
    }
  }

  /**
   * Checks if the lunge attack should stop.
   * 
   * @param {*} currentStep 
   * @param {*} totalSteps 
   * @returns 
   */
  shouldStopLunge(currentStep, totalSteps) {
    return currentStep >= totalSteps || this.isDead;
  }

  /**
   * Ends the lunge attack and resets the state.
   */
  endLunge() {
    this.isAttacking = false;
    this.currentImage = 0;
  }

  /**
   * Handles the Endboss's death.
   */
  die() {
    this.energy = 0;
    this.isDead = true;
    this.currentImage = 0;
    setTimeout(() => this.world?.showVictory(), 1200);
  }
}
