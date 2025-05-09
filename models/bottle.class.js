class Bottle extends MovableObject {
    constructor(x, y) {
      super();
      const bottleImage = Math.random() < 0.5
        ? "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
        : "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
  
      this.loadImage(bottleImage);
      this.x = x;
      this.y = y;
      this.width = 60;
      this.height = 60;
  
      this.offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
      };
    }
  }
  