class MovableObject {
    x = 120;
    y = 400;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("Moving right");
    }


    moveLeft() {
        console.log("Moving left");
    }

/*    
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  } */

  }