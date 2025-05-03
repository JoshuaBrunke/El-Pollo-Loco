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
    this.x = x;
    this.y = y;
    this.speedX = 20; // Set the horizontal speed of the object
    this.speedY = 20; // Set the vertical speed of the object
    this.applyGravity(); // Apply gravity to the object
    setInterval(() => {
        this.x += this.speedX; // Move the object horizontally
        this.y -= this.speedY; // Move the object vertically
  }, 25); // Update the position every 25ms
  }
}