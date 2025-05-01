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
    world;

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalking);

        this.animate();
    }


    /**
     * Method to animate the character
     * @description This method is called in a loop to create an animation effect.
     * It changes the image of the character every 100ms (1000ms / 10 = 100ms per frame).
     */
    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < 200) {
                let i = this.currentImage % this.imagesWalking.length; 
                let path = this.imagesWalking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

        }, 1000 / 10);
    }
    /**
     * Method to make the character jump
     * @param {number} y - The height to jump to
     */

    jump() {
    }



}