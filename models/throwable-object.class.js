class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.throw();

  }

  throw() {
    this.speedX = 20;       // Horizontal speed
    this.speedY = 20;       // Initial upward impulse
    this.applyGravity();    // Let gravity handle the falling
  
    setInterval(() => {
      this.x += this.speedX;  // Move horizontally only
    }, 25);
  }
  
}