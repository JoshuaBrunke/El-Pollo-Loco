class Character extends MovableObject{

    y = 140;
    width = 100;
    height = 300;

    imagesWalking = [
        "./assets/img/2_character_pepe/2_walk/W-21.png",
        "./assets/img/2_character_pepe/2_walk/W-22.png",
        "./assets/img/2_character_pepe/2_walk/W-23.png",
        "./assets/img/2_character_pepe/2_walk/W-24.png",
        "./assets/img/2_character_pepe/2_walk/W-25.png",
        "./assets/img/2_character_pepe/2_walk/W-26.png"
    ];
    currentImage = 0;

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalking);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let path = this.imagesWalking[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage >= this.imagesWalking.length) {
                this.currentImage = 0;
            }
            this.x += 1;
        }, 1000 / 10); // 1000ms / 10 = 100ms per frame
    }
    /**
     * Method to make the character jump
     * @param {number} y - The height to jump to
     */

    jump() {
    }



}