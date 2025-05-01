class MovableObject {
    x = 120;
    y = 290;
    img;
    width = 50;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

/**
 * 
 * @param {Array} arr - ["img/img1.png", "img/img2.png", "img/img3.png", ...]
 * @description Loads multiple images into the imageCache array.
 */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log("Moving right");
    }


    moveLeft() {
        setInterval(() => {
            this.x -=this.speed;
            if (this.x < -this.width) {
                this.x = 720;
            }
        }, 1000 / 60);}



  }