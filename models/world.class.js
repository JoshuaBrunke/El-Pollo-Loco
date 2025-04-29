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
        new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 0),
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
   
        
        //Draws the background objects, clouds, enemies and character on the canvas
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

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