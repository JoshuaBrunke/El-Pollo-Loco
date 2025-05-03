class ThrowableObject extends MovableObject {
  constructor() {
    super.loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.y = 100;

  }

  throw() {
    console.log(`${this.name} thrown!`);
  }
}