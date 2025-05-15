/**
 * Class for the game world.
 * It manages the game state, including the character, level, and various UI elements.
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
   * 
   * @param {*} canvas 
   * @param {*} keyboard 
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
   * Sets the world for the character and enemies.
   * This method assigns the current world instance to the character and all enemies.
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
   * Runs the game loop at a specified interval.
   * It checks for collisions, throwable objects, and bottle hits.
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
   * Checks for bottle hits on enemies.
   * If a bottle hits an enemy, it marks the bottle as hit, handles the enemy's response, 
   * and cleans up the bottles that have hit an enemy.
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
   * Handles the logic for when a bottle hits an enemy.
   * It doesn't do anything if the bottle has already hit, if the enemy is already dead, and if the bottle is not colliding with the enemy.
   * If the enemy is a Chicken or MutantChicken, it plays a sound and marks the enemy as dead.
   * If the enemy is an Endboss, it plays a sound and calls the enemy's hitByBottle method.
   * The bottle is then marked as having hit an enemy.
   * @param {*} bottle 
   * @param {*} enemy 
   * @returns 
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
   * Cleans up the bottles that have hit an enemy.
   * It clears any intervals associated with the bottles and removes them from the throwableObjects array.
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
   * Checks if the space key is pressed and if the character holds any collected bottles.
   * If so, it creates a new ThrowableObject and adds it to the throwableObjects array.
   * It also updates the bottlesCollected count and the bottleBar percentage.
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
   * Checks for collisions between the character and enemies and items respectively, and checks the game over state.
   */
  checkCollisions() {
    this.handleEnemyCollisions();
    this.collectItems();
    this.checkGameOver();
  }

  /**
   * Handles collisions between the character and enemies.
   * If the character is colliding with an enemy that is not yet dead, 
   * it checks if the enemy is a Chicken or MutantChicken and if the character has landed on top of it.
   * If so, it plays a sound and marks the enemy as dead.
   * If not, it checks if the character can take damage and applies damage to the character according to the enemy's damage value.
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
   * Handles the logic for jumping on a Chicken or MutantChicken enemy.
   * It plays a sound, marks the enemy as dead, and sets the character's vertical speed.
   * @param {string} enemy 
   */
  jumpOnChicken(enemy) {
    playJumpAttackSound();
    enemy.die();
    this.character.speedY = 10;
  }

  /**
   * Handles the player character taking damage from an enemy. 
   * If the game has not ended yet and if the character can be hit, 
   * it applies damage to the character, plays a sound and sets the health bar percentage.
   * 
   * @param {string} enemy 
   * @returns 
   */
  takeDamage(enemy) {
    if (this.gameEnded || !this.character.canBeHit()) return;
    const damage = enemy.damage || 5;
    this.character.hit(damage);
    playTakeDamageSound();
    this.healthBar.setPercentage(this.character.energy);
  }

  /**
   * Checks if the character has landed on an enemy.
   * 
   * @param {*} enemy 
   * @returns 
   */
  didLandOnEnemy(enemy) {
    const isFalling = this.character.speedY < 0;
    const aboveEnemy = this.character.y + this.character.height - this.character.offset.bottom < enemy.y + enemy.height * 0.7;
    return isFalling && aboveEnemy;
  }

  /**
   * Checks for items (bottles and coins) in the level.
   * If the character collides with a bottle, it collects it and updates the bottlesCollected count.
   * If the character collides with a coin, it collects it and updates the coinsCollected count.
   * It also updates the respective UI elements (bottleBar and coinBar).
   */
  collectItems() {
    this.level.backgroundObjects = this.level.backgroundObjects.filter((obj) => {
      if (this.getBottle(obj)) return false;
      if (this.getCoin(obj)) return false;
      return true;
    });
  }

  /**
   * Collects a bottle if the character is colliding with it.
   * If the bottle is collected, it plays a sound and updates the bottlesCollected count.
   * 
   * @param {*} obj 
   * @returns 
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
   * Collects a coin if the character is colliding with it.
   * If the coin is collected, it plays a sound and updates the coinsCollected count.
   * 
   * @param {*} obj 
   * @returns 
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
   * Checks if the game is over.
   * If the character is dead, it shows the game over screen.
   */
  checkGameOver() {
    if (this.character.isDead()) {
      this.showGameOver();
    }
  }

  /**
   * Displays the game over screen.
   * It stops the game, removes the canvas and mobile controls, and plays the defeat sound.
   */
  showGameOver() {
    this.gameEnded = true;
    this.stop();
    this.level.enemies.forEach(e => e instanceof Endboss && e.stopAttackLoop());

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
   * Displays the victory screen.
   * It stops the game, removes the canvas and mobile controls, and plays the victory sound.
   */
  showVictory() {
    this.gameEnded = true;
    this.level.enemies.forEach(e => e instanceof Endboss && e.stopAttackLoop());
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
   * Draws the game world on the canvas.
   * It clears the canvas, translates the context for the camera position, and draws all objects in the world.
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
   * Adds all objects to the map.
   * 
   * @param {*} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map.
   * 
   * @param {*} mo 
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
   * Draws the object on the canvas.
   * 
   * @param {*} mo 
   */
  drawObject(mo) {
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
  }

  /**
   * Draws the object on the canvas in its default direction.
   * 
   * @param {*} mo 
   */
  drawNormally(mo) {
    this.ctx.translate(mo.x, mo.y);
    this.drawObject(mo);
  }

  /**
   * Flips the context and draws the object on the canvas to show it as facing in the opposite direction.
   * 
   * @param {*} mo 
   */
  flipContextAndDraw(mo) {
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
    this.drawObject(mo);
  }

  /**
   * Stops the game and clears all intervals and animation frames.
   */
  stop() {
    this.intervals.forEach(clearInterval);
    cancelAnimationFrame(this.animationFrame);
  }
}
