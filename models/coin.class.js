/**
 * @class Coin
 * Class for the collectable coin object in the game.
 * Coins appear in the air and can be collected by jumping.
 * The collected coins are counted for the coin score shown if the player wins the game.
 */
class Coin extends MovableObject {
  /**
   * Creates a new Coin object at the given position.
   * 
   * @param {number} x - The horizontal position of the coin.
   * @param {number} y - The vertical position of the coin.
   */  
  constructor(x, y) {
      super();
      this.loadImage("./assets/img/8_coin/coin_2.png");
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.offset = {
        top: 12,
        bottom: 12,
        left: 12,
        right: 12
      };
    }
  }
  