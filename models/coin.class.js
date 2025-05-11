class Coin extends MovableObject {
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
  