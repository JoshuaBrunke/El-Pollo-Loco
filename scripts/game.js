let canvas;
let ctx;
let character = new MovableObject();

function init() {
    addAttributesToExternalLinks();
    loadCanvas();
}

function loadCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = 720;
    canvas.height = 480;
    ctx = canvas.getContext("2d");

console.log("My character is", character);

/*   
character.src = "./assets/img/2_character_pepe/2_walk/W-21.png";
    character.onload = function() {
        ctx.drawImage(character, 20, 300, 50, 150);
    }
*/

}