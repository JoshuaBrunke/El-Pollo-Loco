class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  bossBar = new BossBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  bottlesCollected = 0;
  coinsCollected = 0;
  throwableObjects = [];
  intervals = [];
  animationFrame;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  run() {
    const interval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleHits();
    }, 1000 / 60);
    this.intervals.push(interval);
  }

  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.handleBottleHit(bottle, enemy);
      });
    });

    this.cleanupHitBottles();
  }

  handleBottleHit(bottle, enemy) {
    if (bottle.hasHit || enemy.isDead || !bottle.isColliding(enemy)) return;
    if (enemy instanceof Chicken || enemy instanceof MutantChicken) {
      playBottleHitSound();
      enemy.die();
    } else if (enemy instanceof Endboss) {
      enemy.hitByBottle();
      playBottleHitSound();
    }
    bottle.hasHit = true;
  }

  cleanupHitBottles() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.hasHit && typeof bottle.clearIntervals === "function") {
        bottle.clearIntervals();
      }
    });

    this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.hasHit);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE && this.bottlesCollected > 0) {
      const offsetX = this.character.otherDirection ? -100 : 100;
      const direction = this.character.otherDirection ? -1 : 1;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, direction);
      this.throwableObjects.push(bottle);
      this.bottlesCollected--;
      this.bottleBar.setPercentage((this.bottlesCollected / 10) * 100);
      this.keyboard.SPACE = false;
    }
  }

  checkCollisions() {
    this.handleEnemyCollisions();
    this.collectItems();
    this.checkGameOver();
  }

  handleEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isColliding(enemy) || enemy.isDead) return;

      const landedOnTop = this.didLandOnEnemy(enemy);
      if (landedOnTop && (enemy instanceof Chicken || enemy instanceof MutantChicken)) {
        this.jumpOnChicken(enemy);
      } else {
        this.takeDamage(enemy);
      }
    });
  }

  jumpOnChicken(enemy) {
    playJumpAttackSound();
    enemy.die();
    this.character.speedY = 10;
  }

  takeDamage(enemy) {
    if (!this.character.canBeHit()) return;

    const damage = enemy.damage || 5;
    this.character.hit(damage);
    playTakeDamageSound();
    this.healthBar.setPercentage(this.character.energy);
  }

  didLandOnEnemy(enemy) {
    const isFalling = this.character.speedY < 0;
    const aboveEnemy = this.character.y + this.character.height - this.character.offset.bottom < enemy.y + enemy.height * 0.7;
    return isFalling && aboveEnemy;
  }

  collectItems() {
    this.level.backgroundObjects = this.level.backgroundObjects.filter((obj) => {
      if (this.getBottle(obj)) return false;
      if (this.getCoin(obj)) return false;
      return true;
    });
  }

  getBottle(obj) {
    if (!(obj instanceof Bottle)) return false;
    if (!this.character.isColliding(obj)) return false;
    this.bottlesCollected++;
    playGetBottleSound();
    this.bottleBar.setPercentage(this.bottlesCollected * 10);
    return true;
  }

  getCoin(obj) {
    if (!(obj instanceof Coin)) return false;
    if (!this.character.isColliding(obj)) return false;
    this.coinsCollected++;
    playGetCoinSound();
    this.coinBar.setPercentage(this.coinsCollected * 10);
    return true;
  }

  checkGameOver() {
    if (this.character.isDead()) {
      this.showGameOver();
    }
  }

  showGameOver() {
    this.stop(); // 🔥 Stop all intervals + draw loop FIRST

    setTimeout(() => {
      document.getElementById("overlay-gameover").classList.remove("dnone");
      document.getElementById("canvas").classList.add("dnone");
      document.getElementById("mobile-controls").classList.add("dnone");

      stopBGM();
      stopSleepSound();
      playDefeatSound();
    }, 100); // ⏳ Slight delay for smoother sound start
  }

  showVictory() {
    const scoreSpan = document.getElementById("victory-score");
    if (scoreSpan) {
      scoreSpan.textContent = this.coinsCollected;
    }
    document.getElementById("overlay-victory").classList.remove("dnone");
    document.getElementById("canvas").classList.add("dnone");
    document.getElementById("mobile-controls").classList.add("dnone");
    stopBGM();
    playVictorySound();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.bossBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    this.ctx.save();
    if (mo.otherDirection) {
      this.flipContextAndDraw(mo);
    } else {
      this.drawNormally(mo);
    }
    this.ctx.restore();
  }

  drawObject(mo) {
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  drawNormally(mo) {
    this.ctx.translate(mo.x, mo.y);
    this.drawObject(mo);
  }

  flipContextAndDraw(mo) {
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
    this.drawObject(mo);
  }

  stop() {
    this.intervals.forEach(clearInterval);
    cancelAnimationFrame(this.animationFrame);
  }
}
