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
    this.level.enemies.forEach(enemy => {
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
        if (!enemy.isDead && !bottle.hasHit && bottle.isColliding(enemy)) {
          if (enemy instanceof Chicken || enemy instanceof MutantChicken) {
            enemy.die();
          } else if (enemy instanceof Endboss) {
            enemy.hitByBottle?.();
          }
          bottle.hasHit = true;
        }
      });
    });
    // Remove bottles that have hit something
    this.throwableObjects = this.throwableObjects.filter((b) => !b.hasHit);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE && this.bottlesCollected > 0) {
      const offsetX = this.character.otherDirection ? -100 : 100;
      const direction = this.character.otherDirection ? -1 : 1;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, direction);
      this.throwableObjects.push(bottle);
      this.bottlesCollected--;
      this.bottleBar.setPercentage((this.bottlesCollected / 20) * 100);
      this.keyboard.SPACE = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      const collides = this.character.isColliding(enemy);
      const enemyAlive = !enemy.isDead;
      if (!collides || !enemyAlive) return;

      const isFalling = this.character.speedY < 0;
      const aboveEnemy = this.character.y + this.character.height - this.character.offset.bottom < enemy.y + enemy.height * 0.5;

      const landedOnTop = isFalling && aboveEnemy;

      if (landedOnTop && (enemy instanceof Chicken || enemy instanceof MutantChicken)) {
        enemy.die();
        this.character.speedY = 10;
      } else if (this.character.canBeHit()) {
        const damage = enemy.damage || 5;
        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
      }
    });

    // Collect bottles and coins
    this.level.backgroundObjects = this.level.backgroundObjects.filter((obj) => {
      if (obj instanceof Bottle && this.character.isColliding(obj)) {
        this.bottlesCollected++;
        this.bottleBar.setPercentage(this.bottlesCollected * 5);
        return false;
      }
      if (obj instanceof Coin && this.character.isColliding(obj)) {
        this.coinsCollected++;
        this.coinBar.setPercentage(this.coinsCollected * 10);
        return false;
      }
      return true;
    });
    if (this.character.isDead()) {
      this.showGameOver();
    }
  }

  showGameOver() {
    document.getElementById("overlay-gameover").classList.remove("dnone");
    document.getElementById("canvas").classList.add("dnone");
    document.getElementById("mobile-controls").classList.add("dnone");
  }

  showVictory() {
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

  flipContextAndDraw(mo) {
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  drawNormally(mo) {
    this.ctx.translate(mo.x, mo.y);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  stop() {
    this.intervals.forEach(clearInterval);
    cancelAnimationFrame(this.animationFrame);
  }
}
