let canvas;
let world;

function init() {
    addAttributesToExternalLinks();
    loadCanvas();
}

function loadCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = 720;
    canvas.height = 480;
    ctx = canvas.getContext("2d");
    world = new World(canvas);

console.log("My character is", world.character);

/*   
character.src = "./assets/img/2_character_pepe/2_walk/W-21.png";
    character.onload = function() {
        ctx.drawImage(character, 20, 300, 50, 150);
    }
*/

}