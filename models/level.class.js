/**
* @class Level 
* Level class for a game level including enemies, clouds, background objects, and the level's endpoint.
 */
class Level {
  /**
   * @type {MovableObject[]} 
   */
  enemies;

  /**
   * @type {Cloud[]} 
   */
  clouds;

  /**
   * @type {BackgroundObject[]} 
   */
  backgroundObjects;

  /**
   * @type {number} 
   */
  level_end_x = 2600;

  /**
   * Creates a new level instance.
   * @param {MovableObject[]} enemies - Array of enemy objects.
   * @param {Cloud[]} clouds - Array of cloud objects.
   * @param {BackgroundObject[]} backgroundObjects - Array of background visual elements.
   */
  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
