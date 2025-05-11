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
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE && this.bottlesCollected > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottlesCollected--;
      this.bottleBar.setPercentage((this.bottlesCollected / 20) * 100);
      this.keyboard.SPACE = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.canBeHit()) {
        const damage = enemy.damage || 5;
        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
      }
    });

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
    requestAnimationFrame(() => this.draw());
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
}
