class Character extends MovableObject{

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        
    }


    jump() {
    }


    /*
    constructor(name, level, health) {
        this.name = name;
        this.level = level;
        this.health = health;
    }
    
    attack(target) {
        console.log(`${this.name} attacks ${target.name}`);
    }
    
    takeDamage(damage) {
        this.health -= damage;
        console.log(`${this.name} takes ${damage} damage`);
    }
        */
}