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


    constructor() {
        super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalking);

        this.animate();
    }


    /**
     * Method to animate the character
     * @description This method is called in a loop to create an animation effect.
     * It changes the image of the character every 100ms.
     */
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length; 
            // let i = 0 % 6; => 0, Rest 0,
            // let i = 1 % 6; => 1, Rest 1,
            //let i = 7 % 6; => 1, Rest 1,
            //i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
            let path = this.imagesWalking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
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