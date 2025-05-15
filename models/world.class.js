/**
 * @class World
 * Class representing the main game world.
 * Manages all game state, rendering, collisions, sound, and UI interactions.
 */
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
  gameEnded = false;

  /**
   * Creates a new game world.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard input manager.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world reference for the character and the endboss.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Starts the main game logic loop for collision detection and throwing.
   */
  run() {
    const interval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleHits();
    }, 1000 / 60);
    this.intervals.push(interval);
  }

  /**
   * Checks for collisions between bottles and enemies.
   * Removes bottles that have hit.
   */
  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.handleBottleHit(bottle, enemy);
      });
    });
    this.cleanupHitBottles();
  }

  /**
   * Handles the logic when a bottle hits an enemy.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {MovableObject} enemy - The enemy being checked.
   */
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

  /**
   * Removes all bottles that have hit enemies from the game world.
   */
  cleanupHitBottles() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.hasHit && typeof bottle.clearIntervals === "function") {
        bottle.clearIntervals();
      }
    });
    this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.hasHit);
  }

  /**
   * Checks for SPACE input and throws a bottle if available.
   */
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

  /**
   * Checks for enemy collisions, item pickups, and death.
   */
  checkCollisions() {
    this.handleEnemyCollisions();
    this.collectItems();
    this.checkGameOver();
  }

  /**
   * Handles collisions between character and enemies.
   */
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

  /**
   * Character defeats enemy by jumping on it.
   * @param {Chicken|MutantChicken} enemy - The enemy being jumped on.
   */
  jumpOnChicken(enemy) {
    playJumpAttackSound();
    enemy.die();
    this.character.speedY = 10;
  }

  /**
   * Applies damage to the character.
   * @param {MovableObject} enemy - The enemy causing the damage.
   */
  takeDamage(enemy) {
    if (this.gameEnded || !this.character.canBeHit()) return;
    const damage = enemy.damage || 5;
    this.character.hit(damage);
    playTakeDamageSound();
    this.healthBar.setPercentage(this.character.energy);
  }

  /**
   * Checks whether the character has landed on top of an enemy.
   * @param {MovableObject} enemy - The enemy to compare against.
   * @returns {boolean} True if the character has landed on top.
   */
  didLandOnEnemy(enemy) {
    const isFalling = this.character.speedY < 0;
    const aboveEnemy = this.character.y + this.character.height - this.character.offset.bottom < enemy.y + enemy.height * 0.7;
    return isFalling && aboveEnemy;
  }

  /**
   * Collects all bottle and coin items.
   */
  collectItems() {
    this.level.backgroundObjects = this.level.backgroundObjects.filter((obj) => {
      if (this.getBottle(obj)) return false;
      if (this.getCoin(obj)) return false;
      return true;
    });
  }

  /**
   * Collects a bottle if colliding with the character.
   * @param {MovableObject} obj - Object to check.
   * @returns {boolean} True if collected.
   */
  getBottle(obj) {
    if (!(obj instanceof Bottle)) return false;
    if (!this.character.isColliding(obj)) return false;
    this.bottlesCollected++;
    playGetBottleSound();
    this.bottleBar.setPercentage(this.bottlesCollected * 10);
    return true;
  }

  /**
   * Collects a coin if colliding with the character.
   * @param {MovableObject} obj - Object to check.
   * @returns {boolean} True if collected.
   */
  getCoin(obj) {
    if (!(obj instanceof Coin)) return false;
    if (!this.character.isColliding(obj)) return false;
    this.coinsCollected++;
    playGetCoinSound();
    this.coinBar.setPercentage(this.coinsCollected * 10);
    return true;
  }

  /**
   * Checks if the player has lost the game.
   */
  checkGameOver() {
    if (this.character.isDead()) {
      this.showGameOver();
    }
  }

  /**
   * Displays the game over screen and stops all activity.
   */
  showGameOver() {
    this.gameEnded = true;
    this.stop();
    this.level.enemies.forEach((e) => e instanceof Endboss && e.stopAttackLoop());

    setTimeout(() => {
      document.getElementById("overlay-gameover").classList.remove("dnone");
      document.getElementById("canvas").classList.add("dnone");
      document.getElementById("mobile-controls").classList.add("dnone");

      stopBGM();
      stopSleepSound();
      playDefeatSound();
    }, 100);
  }

  /**
   * Displays the victory screen and shows the player's coin score.
   */
  showVictory() {
    this.gameEnded = true;
    this.level.enemies.forEach((e) => e instanceof Endboss && e.stopAttackLoop());
    const scoreSpan = document.getElementById("victory-score");
    if (scoreSpan) {
      scoreSpan.textContent = this.coinsCollected;
    }
    document.getElementById("overlay-victory").classList.remove("dnone");
    document.getElementById("canvas").classList.add("dnone");
    document.getElementById("mobile-controls").classList.add("dnone");
    stopBGM();
    stopSleepSound();
    playVictorySound();
  }

  /**
   * Draws all visible objects and UI to the canvas.
   */
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

  /**
   * Adds multiple objects to the map.
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Draws an individual object on the canvas.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    this.ctx.save();
    if (mo.otherDirection) {
      this.flipContextAndDraw(mo);
    } else {
      this.drawNormally(mo);
    }
    this.ctx.restore();
  }

  /**
   * Draws the object in default facing direction.
   * @param {DrawableObject} mo
   */
  drawNormally(mo) {
    this.ctx.translate(mo.x, mo.y);
    this.drawObject(mo);
  }

  /**
   * Flips the canvas horizontally before drawing the object.
   * @param {DrawableObject} mo
   */
  flipContextAndDraw(mo) {
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
    this.drawObject(mo);
  }

  /**
   * Calls the object's draw methods.
   * @param {DrawableObject} mo
   */
  drawObject(mo) {
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  /**
   * Stops the game loop and animation.
   */
  stop() {
    this.intervals.forEach(clearInterval);
    cancelAnimationFrame(this.animationFrame);
  }
}
