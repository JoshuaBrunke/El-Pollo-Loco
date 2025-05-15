/**
 * Level class for a game level including enemies, clouds, background objects, and the level's endpoint.
 */
class Level {
  /**
   * @type {MovableObject[]} All enemy objects in the level.
   */
  enemies;

  /**
   * @type {Cloud[]} All cloud objects in the level.
   */
  clouds;

  /**
   * @type {BackgroundObject[]} All background elements for the level.
   */
  backgroundObjects;

  /**
   * @type {number} X-coordinate where the level ends.
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
