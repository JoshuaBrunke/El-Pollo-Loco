let canvas;
let ctx;
let character = new Image();

function init() {
    addAttributesToExternalLinks();
    loadCanvas();
}

function loadCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    character.src = "./assets/img/2_character_pepe/2_walk/W-21.png";
    character.onload = function() {
        ctx.drawImage(character, 20, 10, 50, 150);
    }


}