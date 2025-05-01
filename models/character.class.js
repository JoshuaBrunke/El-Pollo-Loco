class Character extends MovableObject{

    y = 140;
    width = 100;
    height = 300;
    speed = 10;

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
     * It changes the image of the character.
     */
    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < 620) {
                this.x += this.speed;
                this.otherDirection = false;
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < 620 || this.world.keyboard.LEFT && this.x > 0) {
                //Walk animation
                let i = this.currentImage % this.imagesWalking.length; 
                let path = this.imagesWalking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                //Idle animation
                this.img = this.imageCache["./assets/img/2_character_pepe/2_walk/W-21.png"];
            }
        }, 50);
    }
    /**
     * Method to make the character jump
     * @param {number} y - The height to jump to
     */

    jump() {
    }



}