class Character extends MovableObject {
  y = 80;
  width = 100;
  height = 300;
  speed = 10;
  lastAction = Date.now();
  isSleeping = false;
  isWalkingSoundPlaying = false;

  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "./assets/img/2_character_pepe/4_hurt/H-41.png",
    "./assets/img/2_character_pepe/4_hurt/H-42.png",
    "./assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/2_character_pepe/5_dead/D-51.png",
    "./assets/img/2_character_pepe/5_dead/D-52.png",
    "./assets/img/2_character_pepe/5_dead/D-53.png",
    "./assets/img/2_character_pepe/5_dead/D-54.png",
    "./assets/img/2_character_pepe/5_dead/D-55.png",
    "./assets/img/2_character_pepe/5_dead/D-56.png",
    "./assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadAllImages();
    this.setHitboxOffsets();
    this.applyGravity();
    this.animate();
  }

  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
  }

  setHitboxOffsets() {
    this.offset = { top: 150, bottom: 15, left: 20, right: 30 };
  }

  animate() {
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimation(), 100);
  }

  handleMovement() {
    if (!this.world || this.isDead()) return;
    const k = this.world.keyboard;
    const input = k.UP || k.LEFT || k.RIGHT || k.DOWN || k.SPACE;
    if (input) this.resetIdleTimer();
    if (!this.isSleeping && k.UP && !this.isAboveGround()) this.jump(30);
    if (!this.isSleeping && k.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    } else if (!this.isSleeping && k.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }

    this.world.camera_x = -this.x + 100;
  }

  handleAnimation() {
    if (!this.world) return;

    if (this.longIdle()) this.sleep();

    if (this.isDead()) this.animateDeath();
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isSleeping) this.playAnimation(this.IMAGES_SLEEP);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.isMoving()) this.playAnimation(this.IMAGES_WALKING);
    else this.playAnimation(this.IMAGES_IDLE);
    this.handleWalkingSound();
  }

  handleWalkingSound() {
    const shouldPlay =
      !this.isDead() && !this.isSleeping && !this.isHurt() && !this.isAboveGround() && this.isMoving() && !this.world?.gameEnded;

    if (shouldPlay && !this.isWalkingSoundPlaying) {
      playWalkingSound();
      this.isWalkingSoundPlaying = true;
    } else if (!shouldPlay && this.isWalkingSoundPlaying) {
      stopWalkingSound();
      this.isWalkingSoundPlaying = false;
    }
  }

  animateDeath() {
    if (this.currentImage < this.IMAGES_DEAD.length) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD.at(-1)];
    }
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  longIdle() {
    return !this.world?.gameEnded && Date.now() - this.lastAction > 15000 && !this.isSleeping && !this.isDead();
  }

  sleep() {
    if (this.isDead() || this.world?.gameEnded) return;
    this.isSleeping = true;
    this.currentImage = 0;
    playSleepSound();
  }

  resetIdleTimer() {
    this.lastAction = Date.now();
    this.isSleeping = false;
    stopSleepSound();
  }
}
