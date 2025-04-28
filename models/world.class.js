class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud(),
    ];

    backgroundObjects = [
        new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 0, 220),
        new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
    ];

    canvas;
    ctx;

    constructor(canvas) {

        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        //Clears the canvas before drawing
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
        
        //Draws the character, background objects, clouds and enemies on the canvas
        this.addToMap(this.character);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        //Draw is called in a loop to create an animation effect
        self = this;
        requestAnimationFrame(function() {
            self.draw();
            
        });
    }
    
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y,  movableObject.width, movableObject.height);
    }
}