class Bottle extends MovableObject {
    constructor(x, y) {
      super();
      const image1 = "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
      const image2 = "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
  
      const bottleImage = Math.random() < 0.5 ? image1 : image2;
      this.loadImage(bottleImage);
      this.x = x;
      this.y = y;
      this.width = 60;
      this.height = 60;
  
      if (bottleImage === image1) {
        this.offset = { top: 10, bottom: 8, left: 21, right: 11 };
      } else {
        this.offset = { top: 10, bottom: 8, left: 15, right: 15 };
      }
    }
  }
  