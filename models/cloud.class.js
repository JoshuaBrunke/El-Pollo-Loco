class Cloud extends MovableObject {
  y = 40;
  width = 500;
  height = 300;

  constructor() {
    super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
    this.x = this.randomStartX();
    this.animate();
  }

  randomStartX() {
    return 10 + Math.random() * 500;
  }

  animate() {
    setInterval(() => this.moveLeft(), 100);
  }
}
