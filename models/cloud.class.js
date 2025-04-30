class Cloud extends MovableObject{

    y = 40;
    width = 500;
    height = 300;

    constructor() {
        super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
        this.x = 10 + Math.random() * 500;

        this.animate();

    }


    animate() {
        setInterval(() => {
            this.x -=0.15;
            if (this.x < -this.width) {
                this.x = 720;
            }
        }, 1000 / 60);
    }


}